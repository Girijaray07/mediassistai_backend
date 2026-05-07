import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import WelcomeScreen from './WelcomeScreen';

const ChatWindow = ({ messages, onPromptClick, isLoading }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-white" ref={scrollRef}>
      {messages.length === 0 ? (
        <WelcomeScreen onPromptClick={onPromptClick} />
      ) : (
        <div className="max-w-4xl mx-auto py-8 px-6">
          {messages.map((msg, index) => (
            <MessageBubble key={index} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
