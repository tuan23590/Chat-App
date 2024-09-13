import { GraphQLrequest } from "./request";
export const APICreateRoom = async (formData) => {
    const query = `mutation CreateRoom($uid: [String], $messages: String) {
  createRoom(uid: $uid, messages: $messages) {
    id
  }
}`;
    const {createRoom} = await GraphQLrequest({query, variables: {
        uid: formData.uid,
        messages: JSON.stringify(formData.message),
    }});
    return createRoom;
};

export const APIGetListRoom = async (uid) => {
  const query = `query GetListRoom($uid: String) {
  getListRoom(uid: $uid) {
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
  const {getListRoom} = await GraphQLrequest({query, variables: {uid}});
  return getListRoom;
};

export const APIGetRoom = async ({params: {roomId}}) => {
  const query = `query GetRoom($roomId: String) {
  getRoom(roomId: $roomId) {
    id
    photoURL
    name
    listUser {
      uid
      name
      photoURL
      status
    }
    listMessage {
      id
      content
      type
      sender {
        id
        uid
        name
        email
        role
        photoURL
      }
      receiver {
        id
        uid
        name
        email
        role
        photoURL
      }
      seen {
        id
        uid
        name
        email
        role
        photoURL
      }
      createdAt
    }
  }
}`;
  const {getRoom} = await GraphQLrequest({query, variables: {roomId}});
  return getRoom;
};