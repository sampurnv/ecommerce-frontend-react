import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './LiveChat.css';

const LiveChat = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && !stompClient) {
      connectToChat();
    }
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToChat = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    
    client.connect({}, () => {
      setIsConnected(true);
      setStompClient(client);
      
      // Subscribe to public messages
      client.subscribe('/topic/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prev => [...prev, receivedMessage]);
      });
      
      // Send join message
      const user = username || `User${Math.floor(Math.random() * 1000)}`;
      setUsername(user);
      
      client.send('/app/chat.addUser', {}, JSON.stringify({
        sender: user,
        type: 'JOIN'
      }));
    }, (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && stompClient && isConnected) {
      const chatMessage = {
        sender: username,
        content: inputMessage,
        type: 'CHAT'
      };
      
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setInputMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>{t('liveChat')}</h3>
            <span className={`status ${isConnected ? 'online' : 'offline'}`}>
              {isConnected ? t('online') : t('offline')}
            </span>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === username ? 'own' : ''} ${msg.type.toLowerCase()}`}
              >
                {msg.type === 'JOIN' && (
                  <div className="system-message">
                    {msg.sender} joined the chat
                  </div>
                )}
                {msg.type === 'LEAVE' && (
                  <div className="system-message">
                    {msg.sender} left the chat
                  </div>
                )}
                {msg.type === 'CHAT' && (
                  <>
                    <div className="message-sender">{msg.sender}</div>
                    <div className="message-content">{msg.content}</div>
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder={t('typeMessage')}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={!isConnected}
            />
            <button 
              type="submit" 
              className="chat-send-btn"
              disabled={!isConnected || !inputMessage.trim()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChat;