export const typeDefs = `#graphql
type User {
    id: String
    uid: String
    name: String
    email: String
    role: String
    photoURL: String
    status: String
}    
type Message {
    id: String
    content: String
    type: String
    sender: User
    receiver: [User]
    seen: [User]
    createdAt: String
    room: Room
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
    getRoom(roomId: String): Room,
    getListRoom(uid: String): [Room],
    searchUser(name: String): [User],
    getMessages(uid: String): [Message],
}
type Mutation {
    createUser(uid: String, name: String, email: String, role: String, photoURL: String): User,
    createRoom(uid: [String],messages: String,sender: String): Room,
    createMessage(content: String, type: String, sender: String, roomId:String): Message,
    seenMessage(messageId: [String], userId: String): Message,
}
type Subscription {
    newMessage(subscriber: String): Message,
    newRoom(subscriber: String): Room,
    seenMessage(subscriber: String): Message,
}
`;
