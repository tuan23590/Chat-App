import { GraphQLrequest } from './request';
import { gql, useSubscription } from '@apollo/client';

export const APINewMessage = () => {
  const { data, loading, error } = useSubscription(gql`
    subscription NewMessage {
  newMessage {
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
    createdAt
  }
}
  `);
  return { data, loading, error };
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
  }
}`;
  const {createMessage} = await GraphQLrequest({query, variables: formData});
  return createMessage;
};