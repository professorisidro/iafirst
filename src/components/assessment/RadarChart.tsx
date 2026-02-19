"use client";

import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { DimensionScore } from '../../types/assessment';

interface RadarChartProps {
  data: DimensionScore[];
}

const RadarChart = ({ data }: RadarChartProps) => {
  const chartData = data.map(d => ({
    subject: d.name,
    A: d.score,
    fullMark: 4,
  }));

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 4]} tick={false} axisLine={false} />
          <Radar
            name="Maturidade"
            dataKey="A"
            stroke="#2563EB"
            fill="#2563EB"
            fillOpacity={0.2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;