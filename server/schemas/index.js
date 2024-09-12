export const typeDefs = `#graphql
type User {
    id: String
    uid: String
    name: String
    email: String
    role: String
    photoURL: String
}    
type Message {
    id: String
    content: String
    type: String
    sender: User
    receiver: [User]
    seen: [User]
    createdAt: String
}
type Room {
    id: String
    photoURL: String
    name: String
    listUser: [User]
    LastMessage: Message
    listMessage: [Message]
}
type Query {
    getUser(uid: String): User,
    getRoom(uid: String): [Room],
    searchUser(name: String): [User],
}
type Mutation {
    createUser(uid: String, name: String, email: String, role: String, photoURL: String): User,
    createRoom(uid: [String],messages: String): Room,
}
type Subscription {
        _: String
}
`;
