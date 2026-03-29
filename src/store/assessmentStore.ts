import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialCustomerDetails, defaultDomains } from '../data/questionnaire';
import type { CustomerDetails, Domain, Score } from '../data/questionnaire';

interface AssessmentState {
  customerDetails: CustomerDetails;
  domains: Domain[];
  setCustomerDetail: (field: keyof CustomerDetails, value: string) => void;
  setQuestionScore: (domainId: string, questionId: string, score: Score) => void;
  setQuestionNote: (domainId: string, questionId: string, notes: string) => void;
  toggleNotApplicable: (domainId: string, questionId: string) => void;
  resetAssessment: () => void;
  loadDemoData: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      customerDetails: { ...initialCustomerDetails },
      domains: JSON.parse(JSON.stringify(defaultDomains)),

      setCustomerDetail: (field, value) => set((state) => ({
        customerDetails: { ...state.customerDetails, [field]: value }
      })),

      setQuestionScore: (domainId, questionId, score) => set((state) => {
        const newDomains = state.domains.map(domain => {
          if (domain.id !== domainId) return domain;
          return {
            ...domain,
            questions: domain.questions.map(q => 
              q.id === questionId ? { ...q, score, notApplicable: false } : q
            )
          };
        });
        return { domains: newDomains };
      }),

      setQuestionNote: (domainId, questionId, notes) => set((state) => {
        const newDomains = state.domains.map(domain => {
          if (domain.id !== domainId) return domain;
          return {
            ...domain,
            questions: domain.questions.map(q => 
              q.id === questionId ? { ...q, notes } : q
            )
          };
        });
        return { domains: newDomains };
      }),

      toggleNotApplicable: (domainId, questionId) => set((state) => {
        const newDomains = state.domains.map(domain => {
          if (domain.id !== domainId) return domain;
          return {
            ...domain,
            questions: domain.questions.map(q => {
              if (q.id === questionId) {
                const newNa = !q.notApplicable;
                return { ...q, notApplicable: newNa, score: newNa ? null : q.score };
              }
              return q;
            })
          };
        });
        return { domains: newDomains };
      }),

      resetAssessment: () => set({
        customerDetails: { ...initialCustomerDetails },
        domains: JSON.parse(JSON.stringify(defaultDomains))
      }),

      loadDemoData: () => set({
        customerDetails: {
          customerName: 'Acme Corp Financial',
          workshopDate: new Date().toISOString().split('T')[0],
          consultantName: 'Jane Doe',
          contactName: 'John Smith (CTO)',
          businessUnit: 'Customer Service & Trading',
          assessmentScope: 'Initial deployment of internal trading copilot and customer support chatbot.',
          notes: 'Customer is eager but has strict regulatory requirements.'
        },
        domains: defaultDomains.map(domain => ({
          ...domain,
          questions: domain.questions.map((q, idx) => ({
            ...q,
            // Generate pseudo-random realistic scores 0-4, mostly 1-3. 
            // Weighted slightly by domain mapping for realism.
            score: (domain.id === 'A' || domain.id === 'G') 
              ? ([2, 2, 1, 3, 1, 2][idx] as Score) 
              : domain.id === 'C' 
                ? ([3, 3, 2, 4, 1, 2][idx] as Score)
                : ([1, 2, 2, 3, 1, 0][idx] as Score),
            notes: idx === 0 ? 'Discussed, currently undocumented.' : '',
            notApplicable: false
          }))
        }))
      })
    }),
    {
      name: 'ai-governance-assessment-storage',
    }
  )
);
