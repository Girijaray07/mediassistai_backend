import React from 'react';
import { Stethoscope, FileText, Activity, ShieldCheck, ChevronRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, disabled }) => (
  <div className={`p-5 rounded-xl border ${disabled ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-emerald-200 hover:shadow-md'} transition-all`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${disabled ? 'bg-slate-200 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>
      <Icon size={22} />
    </div>
    <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    {disabled && <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2 inline-block">Coming Soon</span>}
  </div>
);

const WelcomeScreen = ({ onPromptClick }) => {
  const suggestedPrompts = [
    "What could cause persistent headaches?",
    "Explain CBC report values",
    "What are normal blood sugar levels?",
    "Suggest diet for high cholesterol"
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
          <Stethoscope size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome to MediAssist AI</h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          Your intelligent health companion. Ask questions or upload lab reports for personalized insights.
        </p>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <FeatureCard 
          icon={Activity} 
          title="Ask Health Questions" 
          description="Get instant answers about symptoms and health concerns."
        />
        <FeatureCard 
          icon={FileText} 
          title="Upload Lab Reports" 
          description="AI-powered analysis of your blood tests and medical data."
          disabled
        />
        <FeatureCard 
          icon={Stethoscope} 
          title="Smart Diagnosis" 
          description="Understand potential conditions based on your symptoms."
        />
        <FeatureCard 
          icon={ShieldCheck} 
          title="Private & Secure" 
          description="Your medical data is encrypted and remains private."
        />
      </div> */}

      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1">Suggested Prompts</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(prompt)}
              className="bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 text-sm py-2 px-4 rounded-full transition-all flex items-center gap-2 group"
            >
              {prompt}
              <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
