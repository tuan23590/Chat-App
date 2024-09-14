import { MessageModel, RoomModel, UserModel } from "../models/index.js";
import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const user = await UserModel.findOne({ uid: args.uid });
      return user;
    },
    getRoom: async (parent, args) => {
      const room = await RoomModel.findOne({ _id: args.roomId });
      return room;
    },
    getListRoom: async (parent, args) => {
      const rooms = await RoomModel.find({ listUser: args.uid });
      return rooms;
    },
    searchUser: async (parent, args) => {
      const users = await UserModel.find({ name: { $regex: args.name, $options: "i" } });
      return users;
    },
    getMessages: async (parent, args) => {
      const messages = await MessageModel.find({ $or: [{ sender: args.uid }, { receiver: args.uid }] });
      return messages;
    },
  },
  Room: {
    listUser: async (parent) => {
      const users = await UserModel.find({ uid: { $in: parent.listUser } });
      return users;
    },
    listMessage: async (parent) => {
      const messages = await MessageModel.find({ _id: { $in: parent.listMessage } });
      return messages;
    },
    LastMessage: async (parent) => {
      const messages = await MessageModel.find({ _id: { $in: parent.listMessage } });
      return messages[messages.length - 1];
    },
  },
  Message: {
    sender: async (parent) => {
      const user = await UserModel.findOne({ uid: parent.sender });
      return user;
    },
    receiver: async (parent) => {
      const user = await UserModel.findOne({ uid: parent.receiver });
      return user;
    },
    seen: async (parent) => {
      const user = await UserModel.find({ uid: { $in: parent.seen } });
      return user;
    },
    room: async (parent) => {
      const room = await RoomModel.findOne({ _id: parent.room });
      return room;
    }
  },
  Mutation: {
    seenMessage: async (parent, args) => {
      const messages = await MessageModel.find({ _id: { $in: args.messageId } });
      messages.forEach(async (message) => {
        message.seen.push(args.userId);
        await message.save();
      });
      const message = messages[messages.length - 1];
      pubsub.publish('SEEN_MESSAGE', { seenMessage: message });
      return messages;
    },
    createUser: async (parent, args) => {
      const user = await UserModel.findOne({ uid: args.uid });
      if (user) {
        return user;
      }
      const newUser = new UserModel(args);
      newUser.name = args.name || 'user@' + args.uid;
      await newUser.save();
      return newUser;
    },
    createRoom: async (parent, args) => {
      try {
      const newMessage = new MessageModel(JSON.parse(args.messages));
      newMessage.receiver = args.uid;
      newMessage.seen.push(newMessage.sender);
      await newMessage.save();
      const room = await RoomModel.findOne({ listUser: args.uid });
      if (room) {
        room.listMessage.push(newMessage.id);
        await room.save();
        newMessage.room = room._id;
        await newMessage.save();
        pubsub.publish('NEW_MESSAGE', { newMessage });
        return room;
      }
      const newRoom = new RoomModel(args);
      newRoom.listUser = args.uid;
      newRoom.listMessage.push(newMessage._id);
      newRoom.name = args.uid.length > 2 ? 'Group Chat @' + args.uid.join(', ') : '';
      newMessage.room = newRoom._id;
      await newMessage.save();
      await newRoom.save();
      pubsub.publish('NEW_ROOM', { newRoom });
      return newRoom;
      } catch (error) {
        console.log(error);
      }
    },
    createMessage: async (parent, args) => {
      const room = await RoomModel.findOne({ _id: args.roomId });
      const newMessage = new MessageModel(args);
      newMessage.receiver = room.listUser.filter((user) => user !== args.sender);
      newMessage.room = args.roomId;
      newMessage.seen.push(args.sender);
      room.listMessage.push(newMessage._id);
      await room.save();
      await newMessage.save();
      pubsub.publish('NEW_MESSAGE', { newMessage });
      return newMessage;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('NEW_MESSAGE'),
        (payload, variables) => {
          return payload.newMessage.receiver.includes(variables.subscriber) || payload.newMessage.sender === variables.subscriber;
        },
      ),
  },
  newRoom: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('NEW_ROOM'),
      (payload, variables) => {
        return payload.newRoom.listUser.includes(variables.subscriber);
      },
    ),
  },
  seenMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('SEEN_MESSAGE'),
      (payload, variables) => {
        return payload.seenMessage.receiver.includes(variables.subscriber);
      },
    ),
  },
}
};
