import { MessageModel, RoomModel, UserModel } from "../models/index.js";
import { PubSub } from 'graphql-subscriptions';

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
      const user = await UserModel.findOne({ uid: parent.seen });
      return user;
    },
  },
  Mutation: {
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
      const dataMessage = JSON.parse(args.messages);
      console.log(dataMessage);
      let listIdMessage = [];
      for (let i = 0; i < dataMessage.length; i++) {
        const newMessage = new MessageModel();
        newMessage.sender = dataMessage[i].sender.uid;
        newMessage.content = dataMessage[i].content;
        await newMessage.save();
        listIdMessage.push(newMessage._id);
      }
        const room = await RoomModel.findOne({ listUser: args.uid });
      if (room) {
        room.listMessage.push(...listIdMessage);
        await room.save();
        return room;
      }
      const newRoom = new RoomModel(args);
      newRoom.listUser = args.uid;
      newRoom.listMessage = listIdMessage;
      await newRoom.save();
      return newRoom;
      } catch (error) {
        console.log(error);
      }
    },
    createMessage: async (parent, args) => {
      const room = await RoomModel.findOne({ _id: args.roomId });
      const newMessage = new MessageModel(args);
      newMessage.receiver = room.listUser.filter((user) => user !== args.sender);
      room.listMessage.push(newMessage._id);
      await room.save();
      await newMessage.save();
      pubsub.publish('NEW_MESSAGE', { newMessage });
      return newMessage;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(['NEW_MESSAGE'])
  },
}
};
