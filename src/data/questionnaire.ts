export type Score = 0 | 1 | 2 | 3 | 4 | null;

export interface Question {
  id: string;
  text: string;
  score: Score;
  notes: string;
  notApplicable: boolean;
  guidance?: string;
}

export interface Domain {
  id: string;
  title: string;
  description: string;
  weight: number; // For risk calculation
  questions: Question[];
}

export interface CustomerDetails {
  customerName: string;
  workshopDate: string;
  consultantName: string;
  contactName: string;
  businessUnit: string;
  assessmentScope: string;
  notes: string;
  industry: string;
}

export const initialCustomerDetails: CustomerDetails = {
  customerName: '',
  workshopDate: new Date().toISOString().split('T')[0],
  consultantName: '',
  contactName: '',
  businessUnit: '',
  assessmentScope: '',
  notes: '',
  industry: '',
};

export const defaultDomains: Domain[] = [
  {
    id: 'A',
    title: 'Governance and accountability',
    description: 'Assessing ownership, decision-making, and lifecycle management of AI agents.',
    weight: 1.0,
    questions: [
      { id: 'A1', text: 'Is there a named owner for each AI agent or AI use case?', score: null, notes: '', notApplicable: false, guidance: 'Every agent should have a business or technical owner accountable for its outcomes.' },
      { id: 'A2', text: 'Are responsibilities for design, deployment, approval, and monitoring clearly defined?', score: null, notes: '', notApplicable: false },
      { id: 'A3', text: 'Is there a documented decision-making process for approving AI agents?', score: null, notes: '', notApplicable: false },
      { id: 'A4', text: 'Is there a review process for material changes to an agent?', score: null, notes: '', notApplicable: false },
      { id: 'A5', text: 'Is there an inventory or registry of all AI agents in use?', score: null, notes: '', notApplicable: false },
      { id: 'A6', text: 'Are regular governance meetings held to review AI agent performance and risks?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'B',
    title: 'Risk management',
    description: 'Processes for identifying and mitigating AI-specific risks.',
    weight: 1.5,
    questions: [
      { id: 'B1', text: 'Are AI-specific risks identified before deployment?', score: null, notes: '', notApplicable: false },
      { id: 'B2', text: 'Are risks such as hallucination, misuse, harmful output, or overreach considered?', score: null, notes: '', notApplicable: false },
      { id: 'B3', text: 'Is there a process for documenting risk acceptance?', score: null, notes: '', notApplicable: false },
      { id: 'B4', text: 'Are higher-risk use cases treated differently from low-risk ones?', score: null, notes: '', notApplicable: false },
      { id: 'B5', text: 'Are risk assessments updated when the underlying AI model changes?', score: null, notes: '', notApplicable: false },
      { id: 'B6', text: 'Is there a defined incident response plan for AI-related failures?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'C',
    title: 'Security and access control',
    description: 'Ensuring agents operate securely and access is managed appropriately.',
    weight: 2.0,
    questions: [
      { id: 'C1', text: 'Are agents deployed with least-privilege access?', score: null, notes: '', notApplicable: false },
      { id: 'C2', text: 'Are service accounts segregated from user accounts?', score: null, notes: '', notApplicable: false },
      { id: 'C3', text: 'Are connectors and permissions documented before deployment?', score: null, notes: '', notApplicable: false },
      { id: 'C4', text: 'Is traceability and auditability in place for agent actions?', score: null, notes: '', notApplicable: false },
      { id: 'C5', text: 'Are misuse scenarios such as prompt injection or jailbreak attempts considered?', score: null, notes: '', notApplicable: false },
      { id: 'C6', text: 'Are API keys and secrets managed securely (e.g., using a vault)?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'D',
    title: 'Data protection and privacy',
    description: 'Safeguarding sensitive data handled by AI agents.',
    weight: 2.0,
    questions: [
      { id: 'D1', text: 'Is the data handled by the agent classified?', score: null, notes: '', notApplicable: false },
      { id: 'D2', text: 'Are sensitive or regulated data types identified before use?', score: null, notes: '', notApplicable: false },
      { id: 'D3', text: 'Are retention, logging, and deletion behaviours understood?', score: null, notes: '', notApplicable: false },
      { id: 'D4', text: 'Are privacy considerations reviewed before production deployment?', score: null, notes: '', notApplicable: false },
      { id: 'D5', text: 'Are data boundaries clear for uploaded files, SharePoint, and external systems?', score: null, notes: '', notApplicable: false },
      { id: 'D6', text: 'Is user consent obtained where required for data processing by AI?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'E',
    title: 'Technical design and change control',
    description: 'Software engineering practices for AI agents.',
    weight: 1.0,
    questions: [
      { id: 'E1', text: 'Is there documentation for what the agent does and how it works?', score: null, notes: '', notApplicable: false },
      { id: 'E2', text: 'Are environments separated appropriately, for example dev, test, production?', score: null, notes: '', notApplicable: false },
      { id: 'E3', text: 'Are changes to agents controlled and reviewed?', score: null, notes: '', notApplicable: false },
      { id: 'E4', text: 'Are integrations and dependencies documented?', score: null, notes: '', notApplicable: false },
      { id: 'E5', text: 'Is there testing with dummy or sanitised data?', score: null, notes: '', notApplicable: false },
      { id: 'E6', text: 'Is version control used for agent logic and prompts?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'F',
    title: 'Human oversight and operational controls',
    description: 'Controls to ensure humans remain in charge of critical decisions.',
    weight: 2.0,
    questions: [
      { id: 'F1', text: 'Is human review mandatory for high-risk or client-facing outputs?', score: null, notes: '', notApplicable: false },
      { id: 'F2', text: 'Are there controls preventing autonomous sending or publishing where appropriate?', score: null, notes: '', notApplicable: false },
      { id: 'F3', text: 'Is there a fallback if the agent fails or produces poor output?', score: null, notes: '', notApplicable: false },
      { id: 'F4', text: 'Is there a support model and escalation path?', score: null, notes: '', notApplicable: false },
      { id: 'F5', text: 'Is there a re-review process after incidents or major changes?', score: null, notes: '', notApplicable: false },
      { id: 'F6', text: 'Are users provided with a clear way to provide feedback on agent outputs?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'G',
    title: 'Vendor and third-party assurance',
    description: 'Managing risks introduced by external providers.',
    weight: 1.0,
    questions: [
      { id: 'G1', text: 'Are third-party builders required to document permissions, architecture, and controls?', score: null, notes: '', notApplicable: false },
      { id: 'G2', text: 'Are support and ownership boundaries clear between customer, builder, and vendors?', score: null, notes: '', notApplicable: false },
      { id: 'G3', text: 'Are contractual responsibilities defined for logic, output quality, and support?', score: null, notes: '', notApplicable: false },
      { id: 'G4', text: 'Is there evidence of testing from the third party?', score: null, notes: '', notApplicable: false },
      { id: 'G5', text: 'Are third-party AI models evaluated for bias and performance limits?', score: null, notes: '', notApplicable: false },
      { id: 'G6', text: 'Is there an exit strategy if a third-party AI provider needs to be replaced?', score: null, notes: '', notApplicable: false }
    ]
  },
  {
    id: 'H',
    title: 'Policy, training, and awareness',
    description: 'Ensuring staff understand how to build and use AI safely.',
    weight: 1.0,
    questions: [
      { id: 'H1', text: 'Does the customer have an AI policy?', score: null, notes: '', notApplicable: false },
      { id: 'H2', text: 'Are staff trained on acceptable use of AI agents?', score: null, notes: '', notApplicable: false },
      { id: 'H3', text: 'Are builders and reviewers trained on safe deployment practices?', score: null, notes: '', notApplicable: false },
      { id: 'H4', text: 'Are there guidelines for handling sensitive information in AI workflows?', score: null, notes: '', notApplicable: false },
      { id: 'H5', text: 'Is the AI policy reviewed and updated regularly?', score: null, notes: '', notApplicable: false },
      { id: 'H6', text: 'Is there a process for users to report suspected AI policy violations?', score: null, notes: '', notApplicable: false }
    ]
  }
];
