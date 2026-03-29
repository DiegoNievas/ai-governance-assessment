import React, { useState } from 'react';
import { useAssessmentStore } from '../../store/assessmentStore';
import { QuestionRow } from './QuestionRow';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface QuestionnaireSectionProps {
  onNext: () => void;
  onBack: () => void;
  isAtturraBranded?: boolean;
}

export const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({ onNext, onBack, isAtturraBranded }) => {
  const { domains } = useAssessmentStore();
  
  // Start with first domain expanded
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    [domains[0].id]: true
  });

  const toggleDomain = (id: string) => {
    setExpandedDomains(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getDomainProgress = (domain: typeof domains[0]) => {
    const answered = domain.questions.filter(q => q.score !== null || q.notApplicable).length;
    return { answered, total: domain.questions.length, isComplete: answered === domain.questions.length };
  };

  const primaryColor = isAtturraBranded ? 'bg-atturra-600 hover:bg-atturra-700' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Governance & Readiness Assessment</h2>
        <p className="text-gray-500 mt-1">Score each capability from 0 (Not in place) to 4 (Mature). Select N/A if a control strictly does not apply.</p>
      </div>

      <div className="space-y-4">
        {domains.map((domain) => {
          const isExpanded = expandedDomains[domain.id];
          const progress = getDomainProgress(domain);

          return (
            <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Domain Header */}
              <button
                onClick={() => toggleDomain(domain.id)}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${isExpanded ? (isAtturraBranded ? 'bg-atturra-50' : 'bg-blue-50') : 'hover:bg-gray-50'}`}
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${isAtturraBranded ? 'bg-atturra-200 text-atturra-800' : 'bg-blue-100 text-blue-800'}`}>
                      {domain.id}
                    </span>
                    <h3 className={`text-lg font-semibold ${isAtturraBranded ? 'text-atturra-900' : 'text-gray-900'}`}>
                      {domain.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 text-left pl-9 line-clamp-1">{domain.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {progress.isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <span className="text-xs font-medium text-gray-500 px-2.5 py-1 bg-gray-100 rounded-full">
                        {progress.answered} / {progress.total}
                      </span>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {/* Questions List */}
              {isExpanded && (
                <div className="px-6 py-2 bg-white">
                  {domain.questions.map((q) => (
                    <QuestionRow 
                      key={q.id} 
                      domainId={domain.id} 
                      question={q} 
                      isAtturraBranded={isAtturraBranded}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Setup
        </button>
        <button
          onClick={onNext}
          className={`px-8 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${primaryColor} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
        >
          View Results Dashboard
        </button>
      </div>
    </div>
  );
};
