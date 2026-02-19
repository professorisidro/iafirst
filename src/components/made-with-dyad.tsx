"use client";

import React, { useState } from 'react';
import AssessmentForm from '../components/assessment/AssessmentForm';
import ReportView from '../components/assessment/ReportView';
import { AssessmentResult } from '../types/assessment';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ShieldCheck, BarChart3, Target } from 'lucide-react';

const Index = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleComplete = (data: AssessmentResult) => {
    setResult(data);
    // Aqui poderíamos salvar no Supabase
    console.log("Resultado para persistência:", data);
  };

  const handleReset = () => {
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-white">
        <ReportView result={result} onReset={handleReset} />
        <footer className="py-12 border-t mt-12">
          <MadeWithDyad />
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Strategic Diagnostic Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            ISI AI-FIRST <span className="text-blue-500">MATURITY</span> ASSESSMENT
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Avalie a prontidão estratégica da sua organização para a era da Inteligência Artificial através de um diagnóstico estruturado e executivo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-slate-800 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-sm">Análise Multidimensional</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-slate-800 rounded-xl">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-sm">Insights Estratégicos</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-slate-800 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-sm">Governança & Risco</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <main className="relative -mt-10 pb-20">
        <AssessmentForm onComplete={handleComplete} />
      </main>

      <footer className="py-12 border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-400 text-sm">© 2024 ISI AI-FIRST. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;