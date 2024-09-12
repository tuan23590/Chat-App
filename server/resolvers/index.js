import { MessageModel, RoomModel, UserModel } from "../models/index.js";
export const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const user = await UserModel.findOne({ uid: args.uid });
      return user;
    },
    getRoom: async (parent, args) => {
      const rooms = await RoomModel.find({ listUser: args.uid });
      return rooms;
    },
    searchUser: async (parent, args) => {
      const users = await UserModel.find({ name: { $regex: args.name, $options: "i" } });
      return users;
    }
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
  Mutation: {
    createUser: async (parent, args) => {
      const user = await UserModel.findOne({ uid: args.uid });
      if (user) {
        return user;
      }
      const newUser = new UserModel(args);
      await newUser.save();
      return newUser;
    },
    createRoom: async (parent, args) => {
      const room = await RoomModel.findOne({ listUser: args.uid });
      if (room) {
        return room;
      }
      const dataMessage = JSON.parse(args.messages);
      let listIdMessage = [];
      for (let i = 0; i < dataMessage.length; i++) {
        const newMessage = new MessageModel(dataMessage[i]);
        await newMessage.save();
        listIdMessage.push(newMessage._id);
      }
      const newRoom = new RoomModel(args);
      newRoom.listUser = args.uid;
      newRoom.listMessage = listIdMessage;
      await newRoom.save();
      return newRoom;
    },
  },
  Subscription: {},
};
