'use client';

import { useState } from 'react';

const SAMPLE_CHATS = [
  {
    id: '101',
    name: 'Ram',
    lastMessage: 'Thanks! Will check.',
    time: '10:12 AM',
    unread: true,
    favorite: false,
    type: 'single'
  },
  {
    id: '102',
    name: 'Ravi',
    lastMessage: 'Meeting starts in 5 minutes.',
    time: '9:40 AM',
    unread: false,
    favorite: true,
    type: 'group'
  },
  {
    id: '103',
    name: 'Sita',
    lastMessage: 'Okay, thanks.',
    time: 'Yesterday',
    unread: false,
    favorite: false,
    type: 'single'
  },
  {
    id: '104',
    name: 'Gita',
    lastMessage: 'Sent the documents.',
    time: '2 days ago',
    unread: true,
    favorite: true,
    type: 'single'
  },

  {
    id: '105',
    name: 'Rani',
    lastMessage: 'Meeting will end in 5 minutes.',
    time: '9:40 AM',
    unread: false,
    favorite: true,
    type: 'group'
  },
  {
    id: '106',
    name: 'Reena',
    lastMessage: 'Okay, thanks.',
    time: 'Yesterday',
    unread: false,
    favorite: false,
    type: 'single'
  },
  {
    id: '107',
    name: 'Rita',
    lastMessage: 'Sent the documents.',
    time: '2 days ago',
    unread: true,
    favorite: true,
    type: 'single'
  },
   {
    id: '108',
    name: 'Ragu',
    lastMessage: 'Meeting starts in 5 minutes.',
    time: '9:40 AM',
    unread: false,
    favorite: true,
    type: 'group'
  },
];

export default function ChatList({ onSelectChat, selectedChat }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const getFilteredChats = () => {
    let chats = [...SAMPLE_CHATS];

    if (filter === "unread") {
      chats = chats.filter(c => c.unread);
    }
    if (filter === "favourites") {
      chats = chats.filter(c => c.favorite);
    }
    if (filter === "groups") {
      chats = chats.filter(c => c.type === "group");
    }

    if (search.trim() !== "") {
      chats = chats.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(search.toLowerCase())
      );
    }

    return chats;
  };

  const filteredChats = getFilteredChats();

  return (
    <div className="chat-list">

      <div className="chat-search">
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="chat-filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>Unread</button>
        <button className={filter === "favourites" ? "active" : ""} onClick={() => setFilter("favourites")}>Favourites</button>
        <button className={filter === "groups" ? "active" : ""} onClick={() => setFilter("groups")}>Groups</button>
      </div>

      <div className="chat-group">
        {filteredChats.length === 0 && (
          <p className="no-chat">No chats found</p>
        )}

        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? 'active-chat' : ''}`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-info">
              <strong>{chat.name}</strong>
              <p>{chat.lastMessage}</p>
            </div>

            <div className="chat-meta">
              <span className="chat-time">{chat.time}</span>
              {chat.unread && <span className="unread-dot"></span>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
