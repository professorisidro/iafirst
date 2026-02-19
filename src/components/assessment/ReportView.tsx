"use client";

import React from 'react';
import { AssessmentResult, MaturityLevel } from '../../types/assessment';
import RadarChart from './RadarChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Shield, TrendingUp, Users, Database, Cpu, Zap } from 'lucide-react';

interface ReportViewProps {
  result: AssessmentResult;
  onReset: () => void;
}

const ReportView = ({ result, onReset }: ReportViewProps) => {
  const getMaturityColor = (level: MaturityLevel) => {
    switch (level) {
      case 'Inicial': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Emergente': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Estruturado': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'Avançado': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'AI-First': return 'text-slate-900 bg-slate-100 border-slate-300';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getDimensionIcon = (name: string) => {
    if (name.includes('Liderança')) return <TrendingUp className="w-5 h-5" />;
    if (name.includes('Processos')) return <Zap className="w-5 h-5" />;
    if (name.includes('Dados')) return <Database className="w-5 h-5" />;
    if (name.includes('Cultura')) return <Users className="w-5 h-5" />;
    if (name.includes('LLM')) return <Cpu className="w-5 h-5" />;
    if (name.includes('Governança')) return <Shield className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  const getExecutiveSummary = (level: MaturityLevel, score: number) => {
    if (score < 1) return "Sua organização está nos estágios iniciais de compreensão da IA. Existe uma oportunidade significativa de ganho competitivo ao estabelecer os primeiros fundamentos estratégicos e de dados.";
    if (score < 2) return "A empresa demonstra consciência e experimentação pontual. O desafio agora é transitar de iniciativas isoladas para uma estratégia estruturada e centralizada.";
    if (score < 3) return "Maturidade sólida com processos definidos. O foco estratégico deve ser a escala das soluções e a integração profunda da IA nos modelos de decisão core.";
    if (score < 3.6) return "Organização altamente capacitada e orientada a dados. A fronteira agora é a inovação disruptiva e a liderança de mercado através de capacidades avançadas de IA.";
    return "Sua organização opera no estado da arte. A IA não é apenas uma ferramenta, mas o motor fundamental de valor, cultura e estratégia do negócio.";
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Relatório de Maturidade IA</h1>
          <p className="text-slate-500 mt-1">Diagnóstico Estratégico para {result.companyInfo.razao_social}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onReset} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Novo Diagnóstico
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 gap-2" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-none shadow-sm bg-slate-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Score Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-slate-900">{result.overallScore.toFixed(1)}</div>
            <div className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getMaturityColor(result.maturityLevel)}`}>
              Nível: {result.maturityLevel}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Sumário Executivo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed text-lg">
              {getExecutiveSummary(result.maturityLevel, result.overallScore)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Análise por Dimensão</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart data={result.dimensionScores} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold px-1">Performance Detalhada</h3>
          {result.dimensionScores.map((dim) => (
            <div key={dim.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  {getDimensionIcon(dim.name)}
                </div>
                <span className="font-medium text-slate-700">{dim.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000" 
                    style={{ width: `${(dim.score / 4) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-slate-900 w-6">{dim.score.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-none shadow-sm bg-slate-900 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Próximos Passos Estratégicos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-400">Prioridade Imediata</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Focar na dimensão com menor pontuação para mitigar riscos operacionais e estabelecer uma base sólida para escala.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-400">Visão de Longo Prazo</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Integrar governança de dados e cultura de IA para transformar a organização em uma entidade AI-First resiliente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportView;