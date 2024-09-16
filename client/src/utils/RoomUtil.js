import { GraphQLrequest } from "./request";
import { gql, useSubscription } from '@apollo/client';

export const APINewRoom = (subscriber) => {
  const { data, loading, error } = useSubscription(gql`
    subscription NewRoom($subscriber: String) {
  newRoom(subscriber: $subscriber) {
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
      isDeleted
      createdAt
      type
      sender {
        uid
      }
      seen {
        uid
        photoURL
      }
    }
  }
}
  `, {variables: {subscriber}});
  const newRoom = data?.newRoom;
  return { data, loading, error,newRoom };
};

export const APICreateRoom = async (formData) => {
    const query = `mutation CreateRoom($uid: [String], $messages: String, $sender: String) {
  createRoom(uid: $uid, messages: $messages, sender: $sender) {
    id
  }
}`;
    const {createRoom} = await GraphQLrequest({query, variables: {
        ...formData,
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
      isDeleted
      type
      sender {
        uid
      }
      seen {
        uid
        photoURL
      }
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
      isDeleted
      isEdited
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