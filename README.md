
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
