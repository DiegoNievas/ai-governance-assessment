import React from 'react';
import type { AssessmentResults } from '../../utils/scoring';
import { Target, Activity, Zap, ShieldCheck } from 'lucide-react';

interface ImplementationRoadmapProps {
  results: AssessmentResults;
}

export const ImplementationRoadmap: React.FC<ImplementationRoadmapProps> = ({ results }) => {
  // Extract domain titles safely
  const gap1 = results.topGaps[0]?.title || 'Core Policy Deficiencies';
  const gap2 = results.topGaps[1]?.title || 'Risk Management Structures';
  const gap3 = results.topGaps[2]?.title || 'Vendor Assessments';
  const strength1 = results.topStrengths[0]?.title || 'Existing IT Frameworks';

  const phases = [
    {
      quarter: "Q1",
      months: "Months 1-3",
      title: "Foundation & Triage",
      icon: <Target className="w-5 h-5 text-red-500" />,
      color: "border-red-200 bg-red-50 text-red-800",
      iconBg: "bg-red-100",
      description: `Immediate remediation of critical vulnerabilities in ${gap1} and ${gap2}. Establish baseline policies, define acceptable AI use cases, and designate an internal formal AI Governance owner.`,
      deliverables: ["AI Acceptable Use Policy", "Governance Task Force Charter", "Initial Risk Triage"]
    },
    {
      quarter: "Q2",
      months: "Months 4-6",
      title: "Operationalization",
      icon: <Activity className="w-5 h-5 text-orange-500" />,
      color: "border-orange-200 bg-orange-50 text-orange-800",
      iconBg: "bg-orange-100",
      description: `Formalize structured workflows targeting ${gap3}. Require mandatory vendor risk assessments for all new AI procurements. Transition from manual oversight to documented operational processes.`,
      deliverables: ["Vendor Procurement Checklist", "Standard Operating Procedures (SOPs)", "Employee AI Training Rollout"]
    },
    {
      quarter: "Q3",
      months: "Months 7-9",
      title: "Integration & Scaling",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      color: "border-blue-200 bg-blue-50 text-blue-800",
      iconBg: "bg-blue-100",
      description: `Leverage current organizational maturity within ${strength1} to integrate AI controls seamlessly into standard IT deployment pipelines. Begin controlled pilot expansions with reduced friction.`,
      deliverables: ["DevSecOps AI Integration", "Pilot Escalation Framework", "Automated Threat Modeling"]
    },
    {
      quarter: "Q4",
      months: "Months 10-12",
      title: "Optimization & Audit",
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      color: "border-green-200 bg-green-50 text-green-800",
      iconBg: "bg-green-100",
      description: `Conduct internal pre-audits against ISO 42001 requirements. Establish automated continuous monitoring of deployed agents and review the governance charter for next year's strategic AI objectives.`,
      deliverables: ["ISO 42001 Pre-Audit Report", "Continuous Monitoring Dashboard", "Annual Governance Review"]
    }
  ];

  return (
    <div className="bg-white border text-left p-6 sm:p-8 rounded-xl shadow-sm border-gray-200 mt-8 break-inside-avoid">
      <div className="mb-6 border-b border-gray-200 pb-3 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">12-Month Implementation Roadmap</h2>
          <p className="text-sm text-gray-500">A phased execution plan tailored to remediate identified gaps and scale AI capabilities.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phases.map((phase, i) => (
          <div key={i} className={`border rounded-xl p-5 shadow-sm bg-white relative overflow-hidden`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${phase.iconBg}`}>
                  {phase.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{phase.title}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider border ${phase.color}`}>
                    {phase.quarter} • {phase.months}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {phase.description}
            </p>

            {/* Deliverables */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Deliverables</h4>
              <ul className="space-y-1.5 border-t border-gray-100 pt-3">
                {phase.deliverables.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-300 font-bold mt-0.5">•</span> 
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
