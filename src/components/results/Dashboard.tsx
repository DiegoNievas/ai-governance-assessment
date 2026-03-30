import React, { useMemo, useRef, useState } from 'react';
import { useAssessmentStore } from '../../store/assessmentStore';
import { calculateResults } from '../../utils/scoring';
import { RadarChartComp } from './RadarChartComp';
import { DetailedFindings } from './DetailedFindings';
import { ExecutiveSummary } from './ExecutiveSummary';
import { AlertTriangle, TrendingUp, CheckCircle, Download, Copy, Printer, CloudUpload } from 'lucide-react';
// We use dynamic imports for html2pdf to avoid initial bundle bloat and SSR issues if any
import html2pdf from 'html2pdf.js';

import type { AssessmentResults } from '../../utils/scoring';
import type { CustomerDetails, Domain } from '../../data/questionnaire';

interface DashboardProps {
  onBack?: () => void;
  data?: {
    customerDetails: CustomerDetails;
    domains: Domain[];
    results: AssessmentResults;
  };
  isReadOnly?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack, data, isReadOnly = false }) => {
  const storeData = useAssessmentStore();
  
  // Use passed data if provided (historical), otherwise fall back to live store data
  const customerDetails = data ? data.customerDetails : storeData.customerDetails;
  const domains = data ? data.domains : storeData.domains;
  const liveResults = useMemo(() => calculateResults(domains), [domains]);
  const results = data ? data.results : liveResults;
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getRiskColor = (rating: string) => {
    switch (rating) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMaturityColor = (level: string) => {
    switch (level) {
      case 'Initial': return 'text-red-600';
      case 'Emerging': return 'text-orange-600';
      case 'Developing': return 'text-yellow-600';
      case 'Managed': return 'text-blue-600';
      case 'Mature': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleExportPDF = () => {
    const element = contentRef.current;
    if (!element) return;

    const opt: any = {
      margin: 10,
      filename: `AI-Governance-Assessment-${customerDetails.customerName.replace(/\\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleCopyToClipboard = () => {
    const summaryText = `AI Governance & Readiness Assessment - ${customerDetails.customerName}
Date: ${customerDetails.workshopDate}
Scope: ${customerDetails.assessmentScope}

Overall Maturity: ${results.overallMaturityScore} / 4.0 (${results.maturityLevel})
Residual Risk Rating: ${results.riskRating}

Key Strengths:
${results.topStrengths.map(s => `- ${s.title} (${s.score}/4.0)`).join('\\n')}

Key Gaps:
${results.topGaps.map(g => `- ${g.title} (${g.score}/4.0)`).join('\\n')}

Recommended Action:
${results.recommendedAction}
`;
    navigator.clipboard.writeText(summaryText);
    alert("Executive summary copied to clipboard!");
  };

  const handleCloudSubmit = async () => {
    if (isReadOnly) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      if (!data) {
        await storeData.submitToCloud();
      }
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      alert(`Failed to save to cloud: ${err.message || 'Check console for details.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryColorBtn = 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        {!isReadOnly ? (
          <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-md transition-colors">
            Edit Assessment
          </button>
        ) : (
          <div>{/* Empty spacer or generic back button could go here */}</div>
        )}
        <div className="flex flex-wrap gap-3 items-center w-full justify-end sm:w-auto">
          {!isReadOnly && (
            <>
              {submitStatus === 'success' && <span className="text-green-600 text-sm font-medium mr-2">Saved to Cloud!</span>}
              <button 
                onClick={handleCloudSubmit} 
                disabled={isSubmitting}
                className={`flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-md shadow-sm transition-colors hide-on-print ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'}`}
              >
                <CloudUpload className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save to Cloud'}
              </button>
              
              <span className="w-px h-6 bg-gray-200 hide-on-print mx-1"></span>
            </>
          )}

          <button onClick={handleCopyToClipboard} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md transition-colors">
            <Copy className="w-4 h-4" /> Copy Summary
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md transition-colors hide-on-print">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button id="export-pdf-btn" onClick={handleExportPDF} className={`flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-md shadow-sm transition-colors hide-on-print ${primaryColorBtn}`}>
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Printable Area Wrapper */}
      <div ref={contentRef} className="print-area space-y-8 bg-white p-2 sm:p-8 rounded-xl">
        
        {/* Report Header for Exports */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance & Readiness Report</h1>
          <p className="text-gray-500 max-w-3xl">This report provides a maturity evaluation and risk assessment for AI agent deployment, aligned with established AI governance frameworks.</p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
            <div><span className="text-gray-500 block mb-1">Customer</span><strong className="text-gray-900">{customerDetails.customerName || 'N/A'}</strong></div>
            <div><span className="text-gray-500 block mb-1">Date</span><strong className="text-gray-900">{customerDetails.workshopDate || 'N/A'}</strong></div>
            <div><span className="text-gray-500 block mb-1">Consultant</span><strong className="text-gray-900">{customerDetails.consultantName || 'N/A'}</strong></div>
            <div><span className="text-gray-500 block mb-1">Business Unit</span><strong className="text-gray-900">{customerDetails.businessUnit || 'N/A'}</strong></div>
          </div>
        </div>

        {/* High-Level Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border text-center p-6 rounded-xl shadow-sm border-gray-200 flex flex-col justify-center">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Overall Maturity</h3>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-5xl font-extrabold ${getMaturityColor(results.maturityLevel)}`}>{results.overallMaturityScore}</span>
              <span className="text-xl text-gray-400">/ 4</span>
            </div>
            <p className={`mt-2 font-medium ${getMaturityColor(results.maturityLevel)}`}>{results.maturityLevel}</p>
          </div>
          
          <div className={`border text-center p-6 rounded-xl shadow-sm flex flex-col justify-center ${getRiskColor(results.riskRating)}`}>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-2 opacity-80">Risk Rating</h3>
            <div className="flex items-center justify-center gap-3">
              <AlertTriangle className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-extrabold">{results.riskRating}</span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Recommended Action</h3>
            <p className="font-semibold text-gray-900 leading-snug">{results.recommendedAction}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-stretch">
          
          {/* Radar Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Maturity by Domain</h3>
            <RadarChartComp data={results.domainScores} />
          </div>

          {/* Top Strengths & Gaps */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-2 mb-4 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Top Strengths</h3>
              </div>
              <ul className="space-y-3">
                {results.topStrengths.map(d => (
                  <li key={d.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                    <span className="font-medium text-gray-700">{d.title}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">{d.score}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-2 mb-4 text-red-700">
                <TrendingUp className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Key Gaps areas</h3>
              </div>
              <ul className="space-y-3">
                {results.topGaps.map(d => (
                  <li key={d.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                    <span className="font-medium text-gray-700">{d.title}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-bold">{d.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <ExecutiveSummary results={results} customerName={customerDetails.customerName} />

        {/* Detailed Findings */}
        <DetailedFindings domains={domains} results={results} />
      </div>
    </div>
  );
};
