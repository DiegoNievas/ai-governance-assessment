import React from 'react';
import type { Domain } from '../../data/questionnaire';
import type { AssessmentResults } from '../../utils/scoring';
import { AlertCircle } from 'lucide-react';

interface DetailedFindingsProps {
  domains: Domain[];
  results: AssessmentResults;
}

export const DetailedFindings: React.FC<DetailedFindingsProps> = ({ domains, results }) => {
  const brandClass = 'bg-blue-50 border-blue-200';

  const generateAction = (questionText: string): string => {
    // A simple heuristic to generate suggested actions based on the question text
    if (questionText.toLowerCase().includes('policy')) return 'Draft and formally approve an AI acceptable use policy.';
    if (questionText.toLowerCase().includes('training') || questionText.toLowerCase().includes('trained')) return 'Develop and mandate role-specific AI training for staff and builders.';
    if (questionText.toLowerCase().includes('owner')) return 'Assign formal business and technical owners to all AI initiatives.';
    if (questionText.toLowerCase().includes('segregated')) return 'Implement strict segregation of service accounts and user identities for agents.';
    if (questionText.toLowerCase().includes('human review')) return 'Introduce mandatory "human-in-the-loop" approval gates for high-risk outputs.';
    if (questionText.toLowerCase().includes('inventory') || questionText.toLowerCase().includes('registry')) return 'Create a centralised registry of all deployed AI agents and their use cases.';
    if (questionText.toLowerCase().includes('third-party') || questionText.toLowerCase().includes('vendor')) return 'Establish formal vendor assurance criteria for external AI providers.';
    if (questionText.toLowerCase().includes('incident')) return 'Update the IT incident response plan to specifically cover AI failures (e.g., hallucinations, prompt injection).';
    if (questionText.toLowerCase().includes('least-privilege')) return 'Review and restrict agent permissions to strict least-privilege access.';
    
    return 'Formalise controls, documentation, and processes for this specific capability.';
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">Detailed Findings & Action Plan</h2>
      
      <div className="space-y-8">
        {domains.map(domain => {
          const domainScore = results.domainScores.find(d => d.id === domain.id);
          const gaps = domain.questions.filter(q => q.score !== null && q.score < 3 && !q.notApplicable);

          if (!domainScore) return null;

          return (
            <div key={domain.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm page-break-inside-avoid">
              <div className={`p-4 border-b flex justify-between items-center ${brandClass}`}>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{domain.title}</h3>
                  <p className="text-sm text-gray-600">{domain.description}</p>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-gray-900">{domainScore.score} <span className="text-sm text-gray-500 font-normal">/ 4</span></span>
                </div>
              </div>

              <div className="p-6">
                {gaps.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No significant gaps identified in this domain. Capabilities are well defined.</p>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Identified Gaps & Suggested Actions
                    </h4>
                    <ul className="space-y-4">
                      {gaps.map(gap => (
                        <li key={gap.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
                          <p className="font-medium text-gray-900 mb-1">Gap: {gap.text}</p>
                          <p className="text-gray-500 mb-2">Current Score: <strong>{gap.score}</strong> (Target: 3+)</p>
                          <div className="bg-white p-3 border border-gray-200 rounded text-gray-700">
                            <strong>Suggested Action:</strong> {generateAction(gap.text)}
                          </div>
                          {gap.notes && (
                            <div className="mt-2 text-xs text-gray-500 italic border-l-2 border-gray-300 pl-2">
                              Note: {gap.notes}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
