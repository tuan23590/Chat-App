export const typeDefs = `#graphql
type User {
    id: String
    uid: String
    name: String
    email: String
    role: String
    photoURL: String
}    
type Query {
    getUser(uid: String): User
}
type Mutation {
    createUser(uid: String, name: String, email: String, role: String, photoURL: String): User
}
type Subscription {
        _: String
}
`;

