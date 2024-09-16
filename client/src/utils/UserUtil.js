import { GraphQLrequest } from "./request";
export const APICreateUser = async (formData) => {
    const query = `mutation CreateUser($uid: String, $name: String, $email: String, $role: String, $photoUrl: String) {
  createUser(uid: $uid, name: $name, email: $email, role: $role, photoURL: $photoUrl) {
    id
  }
}`;
    const {createUser} = await GraphQLrequest({query, variables: formData});
    return createUser;
};

export const APISearchUser = async (name) => {
  const query = `query SearchUser($name: String) {
  searchUser(name: $name) {
    id
    name
    photoURL
    uid
    email
  }
}`;
  const {searchUser} = await GraphQLrequest({query, variables: {name}});
  return searchUser;
};

export const APIGetUser = async (uid) => {
  const query = `query GetUser($uid: String) {
  getUser(uid: $uid) {
    id
    uid
    name
    email
    role
    photoURL
    online
    lastOnline
  }
}`;
  const {getUser} = await GraphQLrequest({query, variables: {uid}});
  return getUser;
};