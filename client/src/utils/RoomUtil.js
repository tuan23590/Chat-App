import { GraphQLrequest } from "./request";
export const APICreateRoom = async (formData) => {
    const query = `mutation CreateRoom($uid: [String], $messages: String) {
  createRoom(uid: $uid, messages: $messages) {
    id
  }
}`;
    const {createRoom} = await GraphQLrequest({query, variables: formData});
    return createRoom;
};

export const APIGetRoom = async (uid) => {
  const query = `query GetRoom($uid: String) {
  getRoom(uid: $uid) {
    id
    photoURL
    name
    listUser {
      uid
      name
      photoURL
    }
    LastMessage {
      content
      createdAt
      type
    }
  }
}`;
  const {getRoom} = await GraphQLrequest({query, variables: {uid}});
  return getRoom;
};