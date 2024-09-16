import { GraphQLrequest } from './request';
import { gql, useSubscription } from '@apollo/client';

export const APINewMessage = (subscriber) => {
  const { data, loading, error } = useSubscription(gql`
    subscription NewMessage($subscriber: String) {
  newMessage(subscriber: $subscriber) {
    id
    content
    type
    isDeleted
    sender {
      id
      uid
      name
      email
      role
      photoURL
      online
    }
      room {
      id
      }
      seen {
      uid
      photoURL
    }
    createdAt
  }
}
  `, {variables: {subscriber}});
  const newMessage = data?.newMessage;
  return { data, loading, error,newMessage };
};

export const APISeenMessageSubscription = (subscriber) => {
  const { data, loading, error } = useSubscription(gql`
    subscription SeenMessage($subscriber: String) {
  seenMessage(subscriber: $subscriber) {
    id
    content
    type
    isDeleted
    sender {
      id
      uid
      name
      email
      role
      photoURL
      online
    }
      room {
      id
      }
      seen {
      uid
      photoURL
    }
    createdAt
  }
}
  `, {variables: {subscriber}});
  const seenMessage = data?.seenMessage;
  return { data, loading, error,seenMessage };
};

export const APIGetMessages = async (uid) => {
    const query = `query GetMessages($uid: String) {
  getMessages(uid: $uid) {
    id
    content
    type
    isDeleted
    sender {
      id
      uid
      name
      email
      photoURL
    }
    receiver {
      id
      uid
      name
      email
      photoURL
    }
    seen {
      id
      uid
      name
      email
      photoURL
    }
    createdAt
  }
}`;
    const {getMessages} = await GraphQLrequest({query, variables: {uid}});
    console.log(getMessages);
    return getMessages;
};

export const APICreateMessage = async (formData) => {
  const query = `mutation CreateMessage($content: String, $type: String, $sender: String, $roomId: String) {
  createMessage(content: $content, type: $type, sender: $sender, roomId: $roomId) {
    id
    type
    isDeleted
    sender {
      id
      uid
      name
      email
      role
      photoURL
    }
    seen {
      uid
      photoURL
    }
    receiver {
      uid
    }
    createdAt
    content
  }
}`;
  const {createMessage} = await GraphQLrequest({query, variables: formData});
  return createMessage;
};

export const APISeenMessage = async (roomId,userId) => {
  const query = `mutation SeenMessage($roomId: String, $userId: String) {
  seenMessage(roomId: $roomId, userId: $userId) {
    id
  }
}`;
  const {seenMessage} = await GraphQLrequest({query, variables: {roomId,userId}});
  return seenMessage;
};

export const APIDeleteMessage = async (messageId) => {
  const query = `mutation DeleteMessage($messageId: String) {
  deleteMessage(messageId: $messageId) {
    id
  }
}`;
  const {deleteMessage} = await GraphQLrequest({query, variables: {messageId}});
  return deleteMessage;
};