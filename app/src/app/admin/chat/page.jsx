
'use client';

import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import ChatPlaceholder from './components/ChatPlaceholder';
import './chats.css';
import { useState, useEffect } from 'react';

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return (
        <div>
            <main className="admin-content chat-page">

                <div className={`chat-container ${selectedChat ? "chat-open" : ""}`}>

                   
                    {(!isMobile || !selectedChat) && (
                        <ChatList
                            onSelectChat={(chat) => setSelectedChat(chat)}
                            selectedChat={selectedChat}
                        />
                    )}

                    
                    {selectedChat && (
                        <ChatWindow
                            chat={selectedChat}
                            onBack={() => setSelectedChat(null)}
                        />
                    )}

                    {!selectedChat && !isMobile && <ChatPlaceholder />}

                </div>

            </main>
        </div>
    );
}
