import { GraphQLrequest } from './request';
import { gql, useSubscription } from '@apollo/client';

export const APINewMessage = (subscriber) => {
  const { data, loading, error } = useSubscription(gql`
    subscription NewMessage($subscriber: String) {
  newMessage(subscriber: $subscriber) {
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
      status
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
    sender {
      id
      uid
      name
      email
      role
      photoURL
      status
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
    return getMessages;
};

export const APICreateMessage = async (formData) => {
  const query = `mutation CreateMessage($content: String, $type: String, $sender: String, $roomId: String) {
  createMessage(content: $content, type: $type, sender: $sender, roomId: $roomId) {
    id
    type
    sender {
      id
      uid
      name
      email
      role
      photoURL
      status
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

export const APISeenMessage = async (formData) => {
  const query = `mutation SeenMessage($messageId: [String], $userId: String) {
  seenMessage(messageId: $messageId, userId: $userId) {
    id
  }
}`;
  const {seenMessage} = await GraphQLrequest({query, variables: formData});
  return seenMessage;
};