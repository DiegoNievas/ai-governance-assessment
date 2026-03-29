import React from 'react';
import type { AssessmentResults } from '../../utils/scoring';

interface ExecutiveSummaryProps {
  results: AssessmentResults;
  customerName: string;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ results, customerName }) => {
  return (
    <div className="bg-white border text-left p-6 sm:p-8 rounded-xl shadow-sm border-gray-200 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">Executive Summary</h2>
      
      <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Current Maturity & Posture</h4>
          <p>
            The overall AI governance and readiness maturity for {customerName ? <strong>{customerName}</strong> : 'the assessed scope'} is rated at <strong>{results.overallMaturityScore} / 4.0</strong>, which places the organisation in the <strong>"{results.maturityLevel}"</strong> phase. Based on the responses provided across 8 foundational domains, the residual risk of deploying AI agents under the current operating model is assessed as <strong>{results.riskRating}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">Key Strengths</h4>
            <ul className="list-disc pl-5 space-y-1">
              {results.topStrengths.map(s => (
                <li key={s.id}><strong>{s.title}</strong>: Demonstrating stronger controls and practices compared to other areas.</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">Primary Gaps</h4>
            <ul className="list-disc pl-5 space-y-1">
              {results.topGaps.map(g => (
                <li key={g.id}><strong>{g.title}</strong>: Requires immediate attention to reduce risk exposure and build foundational capability.</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-md mt-6">
          <h4 className="text-md font-bold text-blue-900 mb-2">Strategic Recommendation</h4>
          <p className="text-blue-800 font-medium">
            {results.recommendedAction}
          </p>
        </div>
      </div>
    </div>
  );
};
