import React from 'react';
import { Plus, MessageSquare, HeartPulse } from 'lucide-react';

const Sidebar = ({ conversations, activeId, onNewChat, onSelectChat }) => {
  return (
    <div className="w-54 bg-slate-50 h-screen border-r border-slate-200 flex flex-col p-4 fixed left-0 top-0">
      <a className="flex items-center gap-3 p-2 mb-4 cursor-pointer" href="/">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <HeartPulse className="text-emerald-600" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">MediAssist</h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">AI Health Assistant</p>
        </div>
      </a>

      <button
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-xl transition-all mb-6 shadow-sm active:scale-98"
      >
        <Plus size={18} />
        <span>New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
          Recent History
        </h3>
        <div className="flex flex-col gap-1">
          {conversations.length === 0 ? (
            <div className="text-slate-400 text-xs px-2 py-8 text-center italic border border-dashed border-slate-200 rounded-xl">
              No conversations yet
            </div>
          ) : (
            conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all group text-left ${
                  activeId === chat.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm ring-1 ring-emerald-100'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <MessageSquare 
                  size={16} 
                  className={activeId === chat.id ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-500'} 
                />
                <span className="truncate flex-1">{chat.title}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 py-2 bg-white/50 rounded-xl border border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
            GR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-700 truncate">Girija Ray</p>
            <p className="text-[10px] text-emerald-600 font-medium truncate">Premium Member</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
