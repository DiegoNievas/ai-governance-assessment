import type { Domain } from '../data/questionnaire';

export interface DomainScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  weight: number;
}

export interface AssessmentResults {
  domainScores: DomainScore[];
  overallMaturityScore: number;
  maturityLevel: string;
  riskScore: number;
  riskRating: 'Low' | 'Moderate' | 'High' | 'Critical';
  topStrengths: DomainScore[];
  topGaps: DomainScore[];
  recommendedAction: string;
}

export const getMaturityLevel = (score: number) => {
  if (score < 1.0) return 'Initial';
  if (score < 2.0) return 'Emerging';
  if (score < 3.0) return 'Developing';
  if (score < 3.5) return 'Managed';
  return 'Mature';
};

export const calculateResults = (domains: Domain[]): AssessmentResults => {
  const domainScores: DomainScore[] = domains.map(domain => {
    const applicableQuestions = domain.questions.filter(q => !q.notApplicable);
    const answeredQuestions = applicableQuestions.filter(q => q.score !== null);
    
    let score = 0;
    if (answeredQuestions.length > 0) {
      const sum = answeredQuestions.reduce((acc, q) => acc + (q.score as number), 0);
      score = sum / answeredQuestions.length;
    }

    return {
      id: domain.id,
      title: domain.title,
      score: Number(score.toFixed(2)),
      maxScore: 4,
      percentage: Number(((score / 4) * 100).toFixed(0)),
      weight: domain.weight,
    };
  });

  // Overall Maturity Score (Unweighted average of domain scores)
  const overallMaturityScore = Number((domainScores.reduce((acc, current) => acc + current.score, 0) / domainScores.length).toFixed(2));

  // Risk Calculation (Weighted based on domain relevance)
  // Higher risk domains have higher weights.
  // We inverse the score because a low score means HIGH risk.
  // E.g., Score 0 -> Risk 4. Score 4 -> Risk 0.
  let totalWeightedRisk = 0;
  let totalWeight = 0;

  domainScores.forEach(d => {
    const riskFactor = 4 - d.score; // Inverted score for risk
    totalWeightedRisk += riskFactor * d.weight;
    totalWeight += d.weight;
  });

  const averageRiskFactor = totalWeightedRisk / totalWeight;

  let riskRating: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
  if (averageRiskFactor > 3.0) riskRating = 'Critical';
  else if (averageRiskFactor > 2.0) riskRating = 'High';
  else if (averageRiskFactor > 1.0) riskRating = 'Moderate';

  // Sort to find top gaps (lowest scores) and strengths (highest scores)
  const sortedByScore = [...domainScores].sort((a, b) => a.score - b.score);
  const topGaps = sortedByScore.slice(0, 3);
  const topStrengths = sortedByScore.slice(-3).reverse();

  // Recommend next action
  let recommendedAction = '';
  if (riskRating === 'Critical' || overallMaturityScore < 1.5) {
    recommendedAction = 'Not ready for production or sensitive use cases. Foundational governance required before proceeding.';
  } else if (riskRating === 'High') {
    recommendedAction = 'Further design and governance work required before pilot. Remediate top gaps first.';
  } else if (riskRating === 'Moderate' && overallMaturityScore < 3.0) {
    recommendedAction = 'Proceed only with conditions. Implement compensating controls for identified gaps.';
  } else {
    recommendedAction = 'Safe to proceed with controlled pilot or phased deployment.';
  }

  return {
    domainScores,
    overallMaturityScore,
    maturityLevel: getMaturityLevel(overallMaturityScore),
    riskScore: averageRiskFactor,
    riskRating,
    topStrengths,
    topGaps,
    recommendedAction,
  };
};
