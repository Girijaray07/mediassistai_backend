import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ role, content }) => {
  const isAI = role === 'assistant';

  return (
    <div className={`flex w-full mb-6 ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isAI 
            ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
            : 'bg-emerald-500 text-white rounded-tr-none'
        }`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
          <div className={`text-[10px] mt-2 ${isAI ? 'text-slate-400' : 'text-emerald-100'} flex justify-end`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
