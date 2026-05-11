import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, FileText, Image as ImageIcon } from 'lucide-react';

const InputBar = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((input.trim() || files.length > 0) && !isLoading) {
      // Pass the text and files to the parent component
      onSendMessage(input, files.map(f => f.file));
      
      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      
      setInput('');
      setFiles([]);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const removed = newFiles.splice(index, 1)[0];
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return newFiles;
    });
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <ImageIcon size={16} className="text-emerald-500" />;
    return <FileText size={16} className="text-blue-500" />;
  };

  return (
    <div className="bg-white p-1 sticky bottom-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
        <input 
          type="file" 
          multiple 
          accept="image/*,.pdf,.docx,.doc" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        <div className={`flex flex-col bg-transparent border border-slate-200 rounded-2xl transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 ${files.length > 0 ? 'p-3' : 'p-1'}`}>
          {/* File Previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {files.map((fileObj, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm shadow-sm relative group">
                  {fileObj.preview ? (
                    <img src={fileObj.preview} alt="preview" className="w-8 h-8 object-cover rounded" />
                  ) : (
                    getFileIcon(fileObj.file)
                  )}
                  <span className="truncate max-w-[120px] text-slate-700">{fileObj.file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)} 
                    className="ml-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Input area */}
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={handleFileClick}
              className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Describe your symptoms or ask a health question..."
              className="flex-1 bg-transparent py-2 px-2 focus:outline-none text-slate-700 disabled:opacity-60 pr-12"
            />
            <button
              type="submit"
              disabled={(!input.trim() && files.length === 0) || isLoading}
              className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                (input.trim() || files.length > 0) && !isLoading
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                  : 'text-slate-300 bg-transparent'
              }`}
            >
              <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
            </button>
          </div>
        </div>
      </form>
      <p className="text-[10px] text-center text-slate-400 mt-2">
        MediAssist AI can provide health insights but is not a substitute for professional medical advice.
      </p>
    </div>
  );
};

export default InputBar;
