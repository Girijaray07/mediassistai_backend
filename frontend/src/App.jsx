import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

// Configure axios base URL
const api = axios.create({
  baseURL: 'http://localhost:8000',
});

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get active conversation
  const activeChat = conversations.find(c => c.id === activeId);
  const messages = activeChat ? activeChat.messages : [];

  const generateTitle = (text) => {
    const words = text.split(' ').filter(w => w.length > 0);
    return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
  };

  const handleSendMessage = async (content) => {
    let currentId = activeId;
    let updatedConversations = [...conversations];

    if (!currentId) {
      currentId = Date.now().toString();
      const newChat = {
        id: currentId,
        title: generateTitle(content),
        messages: []
      };
      updatedConversations = [newChat, ...updatedConversations];
      setActiveId(currentId);
    }

    const userMessage = { role: 'user', content };
    const placeholder = { role: "assistant", content: "" };

    updatedConversations = updatedConversations.map(chat => 
      chat.id === currentId 
        ? { ...chat, messages: [...chat.messages, userMessage, placeholder] }
        : chat
    );

    setConversations(updatedConversations);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: content })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiText += chunk;

        // LIVE UPDATE MESSAGE
        setConversations(prev =>
          prev.map(chat =>
            chat.id === currentId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages.slice(0, -1),
                    { role: "assistant", content: aiText }
                  ]
                }
              : chat
          )
        );
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setActiveId(null); // This will trigger the Welcome Screen
  };

  const handleSelectChat = (id) => {
    setActiveId(id);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        conversations={conversations} 
        activeId={activeId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <ChatWindow 
          messages={messages} 
          onPromptClick={handleSendMessage} 
          isLoading={isLoading}
        />
        
        <InputBar 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}

export default App;
