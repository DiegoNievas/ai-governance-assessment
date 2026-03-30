import React from 'react';
import { useAssessmentStore } from '../../store/assessmentStore';
import type { Score, Question } from '../../data/questionnaire';
import { MessageSquare, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuestionRowProps {
  domainId: string;
  question: Question;
}

export const QuestionRow: React.FC<QuestionRowProps> = ({ domainId, question }) => {
  const { setQuestionScore, setQuestionNote, toggleNotApplicable } = useAssessmentStore();
  const [showNotes, setShowNotes] = React.useState(!!question.notes);

  const activeColor = 'bg-blue-600 text-white border-blue-600';
  const hoverColor = 'hover:border-blue-400';

  const handleScore = (score: Score) => {
    if (question.notApplicable) return;
    setQuestionScore(domainId, question.id, score);
  };

  const scoreLabels = ['Not in place', 'Ad hoc', 'Partial', 'Defined', 'Mature'];

  return (
    <div className={cn(
      "py-5 border-b border-gray-100 last:border-0 transition-opacity",
      question.notApplicable && "opacity-60 grayscale-[50%]"
    )}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 justify-between">
        
        {/* Question Text */}
        <div className="flex-1 max-w-2xl">
          <div className="flex gap-3">
            <span className="text-gray-400 font-mono text-sm mt-0.5">{question.id}</span>
            <div>
              <p className="text-sm font-medium text-gray-900 leading-snug">{question.text}</p>
              {question.guidance && (
                <div className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                  <HelpCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <p>{question.guidance}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:w-auto lg:shrink-0 lg:pl-4">
          
          {/* Scoring Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex rounded-md shadow-sm" role="group">
              {[0, 1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleScore(s as Score)}
                  disabled={question.notApplicable}
                  title={`${s} - ${scoreLabels[s]}`}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium border focus:z-10 focus:ring-2 focus:ring-blue-500 transition-colors",
                    s === 0 ? "rounded-l-md" : "",
                    s === 4 ? "rounded-r-md" : "",
                    question.score === s && !question.notApplicable 
                      ? activeColor 
                      : `bg-white text-gray-700 border-gray-300 ${hoverColor} ${question.notApplicable ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"}`,
                    s !== 0 && "-ml-px"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 w-24 text-center sm:text-left font-medium">
              {question.score !== null && !question.notApplicable ? scoreLabels[question.score] : ''}
              {question.notApplicable && "Not Applicable"}
            </div>
          </div>

          {/* Utility Toggles */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={question.notApplicable}
                onChange={() => toggleNotApplicable(domainId, question.id)}
                className={cn(
                  "rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-offset-1 transition-colors",
                  "text-blue-600 focus:ring-blue-500"
                )}
              />
              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">N/A</span>
            </label>

            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                showNotes || question.notes ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              )}
              title="Toggle notes"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Notes Field */}
      {showNotes && (
        <div className="mt-3 pl-[2.25rem]">
          <textarea
            rows={2}
            placeholder="Add context or rationale for this score..."
            value={question.notes}
            onChange={(e) => setQuestionNote(domainId, question.id, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border bg-gray-50"
          />
        </div>
      )}
    </div>
  );
};
