import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

const InputBar = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="border-t border-slate-200 bg-tranparent p-4 sticky bottom-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center gap-2">
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Attach file (Coming soon)"
        >
          <Paperclip size={20} />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Describe your symptoms or ask a health question..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                : 'text-slate-300 bg-transparent'
            }`}
          >
            <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
          </button>
        </div>
      </form>
      <p className="text-[10px] text-center text-slate-400 mt-2">
        MediAssist AI can provide health insights but is not a substitute for professional medical advice.
      </p>
    </div>
  );
};

export default InputBar;
