import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { DomainScore } from '../../utils/scoring';

interface RadarChartProps {
  data: DomainScore[];
  isAtturraBranded?: boolean;
}

export const RadarChartComp: React.FC<RadarChartProps> = ({ data, isAtturraBranded }) => {
  const chartData = data.map(d => ({
    subject: d.title,
    A: d.score,
    fullMark: 4,
  }));

  const strokeColor = isAtturraBranded ? '#3e82ac' : '#2563eb';
  const fillColor = isAtturraBranded ? '#3e82ac' : '#3b82f6';

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#4b5563', fontSize: 11 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 4]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <Radar
            name="Maturity Score"
            dataKey="A"
            stroke={strokeColor}
            fill={fillColor}
            fillOpacity={0.5}
            activeDot={{ r: 6 }}
          />
          <Tooltip 
            formatter={(value: any) => [value, 'Score']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
