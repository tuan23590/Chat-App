# Chat Application

This is a real-time chat application built with React, Apollo Client, GraphQL, and Firebase for the client-side, and Node.js, Apollo Server, and MongoDB for the server-side.
## Features

- User authentication with Firebase
- Real-time messaging with GraphQL subscriptions
- Create and join chat rooms
- Online/offline status
- Message seen status
- Responsive design
## Demo

![image](https://github.com/user-attachments/assets/1c0e7255-d92e-4d2d-8ee5-58f170abaa16)


## Installation

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/tuan23590/Chat-App.git
cd chat-app   
```
2. Install dependencies for both client and server:

```
cd client
npm install
cd ../server
npm install
```
### Configuration

1. Set up Firebase for authentication and update the configuration in client/src/firebase/config.js.

2. Create a .env file in the server directory and add your MongoDB credentials:

```
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

### Running the Application

1. Start the server:

```
cd server
npm run dev
```

2. Start the client:

```
cd client
npm run dev
```
3. Open your browser and navigate to http://localhost:3000.

### Usage

- Register or log in with your email or Google account.
- Create or join chat rooms.
- Start messaging in real-time.
