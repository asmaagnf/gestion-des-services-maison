// components/MessageContainer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './MessageContainer.css';


const socket = io('http://localhost:3001'); // Adjust the URL to your backend

const MessageContainer = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { pathname } = useLocation();
    const chatRoomId = pathname.split("/").slice(-1)[0];
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setCurrentUser(decodedToken);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    }, []);
  
    useEffect(() => {
      if (!chatRoomId) {
        console.error('chatRoomId is undefined');
        return;
      }
  
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/chat/chat-room/${chatRoomId}`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
  
      socket.emit('joinRoom', chatRoomId);
  
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => {
        socket.off('receiveMessage');
      };
    }, [chatRoomId]);
  
    const sendMessage = async () => {
      if (!currentUser || !currentUser.id) {
        console.error('currentUser or currentUser.id is undefined');
        return;
      }
  
      if (!chatRoomId) {
        console.error('chatRoomId is undefined');
        return;
      }
  
      try {
        const newMessage = {
          chatRoomId,
          senderId: currentUser.id,
          text,
        };
        const response = await axios.post('http://localhost:3001/api/chat/send-message', newMessage);
        socket.emit('sendMessage', response.data);
        setText('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    return (
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}>
              {msg.sender ? (
          msg.sender.image ? (
            <img
            src={`http://localhost:3001/${msg.sender.image}`}
              alt="User Avatar"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
              <span className="text-5xl text-white">
                {msg.sender.email[0].toUpperCase()}
              </span>
            </div>
          )
        ) : (
          <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
            <span className="text-5xl text-white">
              {/* Default content if userInfo is null */}
            </span>
          </div>
        )}
              <span className="username">{msg.sender.username || 'Unknown'}</span>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tapez un message"
          />
          <button onClick={sendMessage}>Envoyer</button>
        </div>
      </div>
    );
  };
  
  export default MessageContainer;