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