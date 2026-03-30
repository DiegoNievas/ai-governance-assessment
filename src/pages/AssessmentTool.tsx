import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CustomerDetailsForm } from '../components/forms/CustomerDetailsForm';
import { QuestionnaireSection } from '../components/questionnaire/QuestionnaireSection';
import { Dashboard } from '../components/results/Dashboard';
import { useAssessmentStore } from '../store/assessmentStore';
import { ClipboardList, Settings, BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export type AssessmentStep = 'setup' | 'assessment' | 'results';

export const AssessmentTool = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('setup');
  const { domains } = useAssessmentStore();

  const handleNext = () => {
    if (currentStep === 'setup') setCurrentStep('assessment');
    else if (currentStep === 'assessment') setCurrentStep('results');
  };

  const handleBack = () => {
    if (currentStep === 'assessment') setCurrentStep('setup');
    else if (currentStep === 'results') setCurrentStep('assessment');
  };

  const calculateProgress = () => {
    const totalQuestions = domains.reduce((acc, d) => acc + d.questions.length, 0);
    const answeredQuestions = domains.reduce((acc, d) => 
      acc + d.questions.filter(q => q.score !== null || q.notApplicable).length
    , 0);
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <Layout>
      <div className="w-full flex-grow flex flex-col">
        {/* Navigation / Progress Header */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex w-full md:w-auto items-center overflow-x-auto pb-2 md:pb-0">
            <nav className="flex space-x-2 md:space-x-4 items-center min-w-max">
              <button 
                onClick={() => setCurrentStep('setup')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${currentStep === 'setup' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <Settings className="w-4 h-4" /> Setup
              </button>
              <button 
                onClick={() => setCurrentStep('assessment')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${currentStep === 'assessment' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <ClipboardList className="w-4 h-4" /> Assessment
              </button>
              <button 
                onClick={() => setCurrentStep('results')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${currentStep === 'results' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <BarChart3 className="w-4 h-4" /> Results
              </button>
            </nav>
            <Link to="/dashboard" className="ml-4 flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-l border-gray-200 pl-4">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
            <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Progress</span>
            <div className="w-full sm:w-32 bg-gray-200 rounded-full h-2.5 flex-grow md:flex-grow-0">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold text-gray-700 w-9 text-right">{calculateProgress()}%</span>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-grow">
          {currentStep === 'setup' && (
            <CustomerDetailsForm onNext={handleNext} />
          )}
          {currentStep === 'assessment' && (
            <QuestionnaireSection onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 'results' && (
            <Dashboard onBack={handleBack} />
          )}
        </div>
      </div>
    </Layout>
  );
};
