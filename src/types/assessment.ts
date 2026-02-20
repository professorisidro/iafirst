export type MaturityLevel = 'Inicial' | 'Emergente' | 'Estruturado' | 'Avançado' | 'AI-First';

export interface CompanyInfo {
  razao_social: string;
  cnpj: string;
  contato_nome: string;
  email: string;
  telefone: string;
  website: string;
  numero_colaboradores: string;
  setor: string;
}

export interface DimensionScore {
  name: string;
  score: number;
  maxScore: number;
}

export interface AssessmentResult {
  companyInfo: CompanyInfo;
  answers: Record<string, number>;
  dimensionScores: DimensionScore[];
  overallScore: number;
  maturityLevel: MaturityLevel;
  timestamp: string;
}

export interface Question {
  id: string;
  dimension: string;
  text: string;
  options: {
    value: number;
    label: string;
    description: string;
  }[];
}