
'use client';

import { useState, useEffect } from 'react';

export default function ChatWindow({ chat, onBack }) {
  const [messages, setMessages] = useState([
    { sender: 'user', message: 'Hello!', time: '10:10 AM', status: 'read' },
    { sender: 'admin', message: 'Hi, how can I help?', time: '10:11 AM', status: 'read' },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessageIndex = messages.length;

    const newMessage = {
      sender: 'admin',
      message: input,
      time: 'Now',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev];
        updated[newMessageIndex].status = 'delivered';
        return updated;
      });
    }, 1000);

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev];
        updated[newMessageIndex].status = 'read';
        return updated;
      });
    }, 3000);
  };

  const getTickIcon = (status) => {
    switch (status) {
      case 'sent':
        return <span className="tick sent">✔</span>;
      case 'delivered':
        return <span className="tick delivered">✔✔</span>;
      case 'read':
        return <span className="tick read">✔✔</span>;
      default:
        return null;
    }
  };

  return (
    <div className="chat-window">

      <div className="chat-header">
        <button className="chat-back-btn" onClick={onBack}>
          ←
        </button>
        <strong>{chat.name}</strong>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-bubble ${m.sender === 'admin' ? 'admin-msg' : 'user-msg'}`}
          >
            {m.message}
            <span className="chat-time-tag">
              {m.time}

              {m.sender === 'admin' && (
                <span className="tick-wrapper">{getTickIcon(m.status)}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
