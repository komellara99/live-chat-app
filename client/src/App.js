
import './App.css';
import io from 'socket.io-client'; 
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');//connect to backend

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => { //enter a socket.io room
      if(username !== '' && room !==''){
        socket.emit("join_chat", room);
        setShowChat(true)
      }
  }
  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input type='text' placeholder='Name' onChange={(event)=> {setUsername(event.target.value)}}/>
      <input type='text' placeholder='Room ID' onChange={(event)=> {setRoom(event.target.value)}}/>
      <button onClick={joinChat}>Join! </button>
      </div>
      )
      : (
      <Chat socket={socket} username={username} chat={room}/>
      )}
      </div>
  );
}

export default App;
