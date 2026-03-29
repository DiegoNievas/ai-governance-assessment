import React from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';
import { useAssessmentStore } from '../../store/assessmentStore';

interface HeaderProps {
  isAtturraBranded: boolean;
  setIsAtturraBranded: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isAtturraBranded, setIsAtturraBranded }) => {
  const { resetAssessment, loadDemoData } = useAssessmentStore();

  return (
    <header className={`border-b ${isAtturraBranded ? 'bg-atturra-950 text-white' : 'bg-white text-gray-900 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldAlert className={`w-8 h-8 ${isAtturraBranded ? 'text-atturra-300' : 'text-blue-600'}`} />
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Agent Governance & Readiness</h1>
              {isAtturraBranded && <p className="text-xs text-atturra-300 font-medium">Atturra Advisory Tool</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm mr-4">
              <span className={isAtturraBranded ? 'text-atturra-200' : 'text-gray-500'}>Generic</span>
              <button 
                onClick={() => setIsAtturraBranded(!isAtturraBranded)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isAtturraBranded ? 'bg-atturra-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isAtturraBranded ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              <span className={isAtturraBranded ? 'text-white font-medium' : 'text-gray-500'}>Atturra</span>
            </div>

            <button 
              onClick={loadDemoData}
              className={`text-sm flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${isAtturraBranded ? 'hover:bg-atturra-800 text-atturra-100' : 'hover:bg-gray-100 text-gray-600'}`}
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
              className={`text-sm flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${isAtturraBranded ? 'hover:bg-atturra-800 text-atturra-100' : 'hover:bg-gray-100 text-gray-600'}`}
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
