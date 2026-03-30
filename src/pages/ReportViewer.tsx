import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Dashboard } from '../components/results/Dashboard';
import { AppLogo } from '../components/common/AppLogo';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { CustomerDetails, Domain } from '../data/questionnaire';
import type { AssessmentResults } from '../utils/scoring';

interface AssessmentData {
  customerDetails: CustomerDetails;
  domains: Domain[];
  results: AssessmentResults;
}

export const ReportViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const autoDownload = searchParams.get('autoDownload') === 'true';

  const [data, setData] = useState<AssessmentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfTriggered, setPdfTriggered] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        if (!id) throw new Error("No Assessment ID provided.");

        const { data: row, error: fetchError } = await supabase
          .from('assessments')
          .select('full_data')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        if (!row || !row.full_data) throw new Error("Assessment data not found.");

        setData(row.full_data as AssessmentData);
      } catch (err: any) {
        console.error("Failed to load generic assessment report:", err);
        setError(err.message || 'Failed to load report data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessment();
  }, [id]);

  // Handle auto-download
  useEffect(() => {
    if (autoDownload && data && !isLoading && !pdfTriggered) {
      // Need a slight timeout to ensure the Dashboard component is fully rendered
      const timer = setTimeout(() => {
        const btn = document.getElementById('export-pdf-btn');
        if (btn) {
          btn.click();
          setPdfTriggered(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoDownload, data, isLoading, pdfTriggered]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Assessment Report...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Report Unavailable</h2>
          <p className="text-gray-500 mb-6">{error || 'The requested report could not be found or you do not have permission to view it.'}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <AppLogo />
          </div>
          
          <div className="text-sm text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-md">
            Read Only Snapshot
          </div>
        </div>
      </header>

      <main className="py-8">
        <Dashboard data={data} isReadOnly={true} />
      </main>
    </div>
  );
};
