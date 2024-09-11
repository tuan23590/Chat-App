import { UserModel } from "../models/index.js";
export const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const user = await UserModel.findOne({ uid: args.uid });
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
      await newUser.save();
      return newUser;
    },
  },
  Subscription: {},
};
