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
  }
}`;
  const {searchUser} = await GraphQLrequest({query, variables: {name}});
  return searchUser;
};