"use client";

import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../../data/questions';
import { CompanyInfo, AssessmentResult, MaturityLevel, DimensionScore } from '../../types/assessment';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { showSuccess, showError } from '../../utils/toast';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface AssessmentFormProps {
  onComplete: (result: AssessmentResult) => void;
}

const AssessmentForm = ({ onComplete }: AssessmentFormProps) => {
  const [step, setStep] = useState(0);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    razao_social: '',
    cnpj: '',
    contato_nome: '',
    email: '',
    telefone: '',
    website: '',
    numero_colaboradores: '',
    setor: ''
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const totalSteps = ASSESSMENT_QUESTIONS.length + 1;
  const progress = (step / (totalSteps - 1)) * 100;

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateResults = (): AssessmentResult => {
    const dimensions = Array.from(new Set(ASSESSMENT_QUESTIONS.map(q => q.dimension)));
    
    const dimensionScores: DimensionScore[] = dimensions.map(dim => {
      const dimQuestions = ASSESSMENT_QUESTIONS.filter(q => q.dimension === dim);
      const totalScore = dimQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      return {
        name: dim,
        score: totalScore / dimQuestions.length,
        maxScore: 4
      };
    });

    const overallScore = dimensionScores.reduce((acc, d) => acc + d.score, 0) / dimensionScores.length;

    let maturityLevel: MaturityLevel = 'Inicial';
    if (overallScore >= 3.6) maturityLevel = 'AI-First';
    else if (overallScore >= 3) maturityLevel = 'Avançado';
    else if (overallScore >= 2) maturityLevel = 'Estruturado';
    else if (overallScore >= 1) maturityLevel = 'Emergente';

    return {
      companyInfo,
      answers,
      dimensionScores,
      overallScore,
      maturityLevel,
      timestamp: new Date().toISOString()
    };
  };

  const nextStep = () => {
    if (step === 0) {
      if (!companyInfo.razao_social || !companyInfo.email) {
        showError("Por favor, preencha os campos obrigatórios.");
        return;
      }
    } else {
      const currentQuestion = ASSESSMENT_QUESTIONS[step - 1];
      if (answers[currentQuestion.id] === undefined) {
        showError("Por favor, selecione uma opção.");
        return;
      }
    }

    if (step < totalSteps - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      const result = calculateResults();
      onComplete(result);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Passo {step + 1} de {totalSteps}</h2>
            <h1 className="text-2xl font-bold text-slate-900">
              {step === 0 ? "Informações Corporativas" : ASSESSMENT_QUESTIONS[step - 1].dimension}
            </h1>
          </div>
          <span className="text-sm font-medium text-slate-500">{Math.round(progress)}% concluído</span>
        </div>
        <Progress value={progress} className="h-2 bg-slate-100" />
      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
        <CardContent className="p-8">
          {step === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="razao_social">Razão Social *</Label>
                <Input id="razao_social" name="razao_social" value={companyInfo.razao_social} onChange={handleInfoChange} placeholder="Ex: Tech Solutions Ltda" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" name="cnpj" value={companyInfo.cnpj} onChange={handleInfoChange} placeholder="00.000.000/0000-00" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato_nome">Nome do Responsável</Label>
                <Input id="contato_nome" name="contato_nome" value={companyInfo.contato_nome} onChange={handleInfoChange} placeholder="Seu nome completo" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail Corporativo *</Label>
                <Input id="email" name="email" type="email" value={companyInfo.email} onChange={handleInfoChange} placeholder="email@empresa.com" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_colaboradores">Nº de Colaboradores</Label>
                <Input id="numero_colaboradores" name="numero_colaboradores" value={companyInfo.numero_colaboradores} onChange={handleInfoChange} placeholder="Ex: 50-200" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setor">Setor de Atuação</Label>
                <Input id="setor" name="setor" value={companyInfo.setor} onChange={handleInfoChange} placeholder="Ex: Tecnologia, Varejo..." className="h-11" />
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                  {ASSESSMENT_QUESTIONS[step - 1].text}
                </h3>
                <p className="text-slate-500 text-sm">Selecione a opção que melhor descreve a realidade atual da sua organização.</p>
              </div>

              <RadioGroup 
                value={answers[ASSESSMENT_QUESTIONS[step - 1].id]?.toString()} 
                onValueChange={(val) => handleAnswer(ASSESSMENT_QUESTIONS[step - 1].id, parseInt(val))}
                className="space-y-3"
              >
                {ASSESSMENT_QUESTIONS[step - 1].options.map((option) => (
                  <Label
                    key={option.value}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 ${
                      answers[ASSESSMENT_QUESTIONS[step - 1].id] === option.value 
                        ? 'border-blue-600 bg-blue-50/50' 
                        : 'border-slate-100'
                    }`}
                  >
                    <RadioGroupItem value={option.value.toString()} className="mt-1" />
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">{option.label}</div>
                      <div className="text-sm text-slate-500 font-normal leading-relaxed">{option.description}</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}
        </CardContent>

        <div className="bg-slate-50 p-6 flex justify-between items-center border-t border-slate-100">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={step === 0}
            className="text-slate-600"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <Button 
            onClick={nextStep}
            className="bg-slate-900 hover:bg-slate-800 px-8 h-11"
          >
            {step === totalSteps - 1 ? (
              <>Finalizar Diagnóstico <CheckCircle2 className="w-4 h-4 ml-2" /></>
            ) : (
              <>Próximo <ChevronRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AssessmentForm;