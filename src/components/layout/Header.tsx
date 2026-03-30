import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { useAssessmentStore } from '../../store/assessmentStore';

export const Header: React.FC = () => {
  const { resetAssessment, loadDemoData } = useAssessmentStore();

  return (
    <header className="border-b bg-slate-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}app-icon.png`} alt="Logo" className="w-8 h-8 rounded bg-white p-0.5 shrink-0" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Agent Governance & Readiness</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-0.5">Assessment Tool</p>
            </div>
          </div>
          
          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto mt-1 sm:mt-0">
            <button 
              onClick={loadDemoData}
              className="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              title="Load sample data"
            >
              Demo Data
            </button>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to reset the assessment? All data will be lost.')) {
                  resetAssessment();
                }
              }}
              className="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              title="Reset Assessment"
            >
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
