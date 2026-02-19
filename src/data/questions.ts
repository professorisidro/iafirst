import { Question } from "../types/assessment";

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Dimensão 1: Liderança & Estratégia
  {
    id: "q1_1",
    dimension: "Liderança & Estratégia",
    text: "Qual o nível de priorização da IA na agenda da alta gestão?",
    options: [
      { value: 0, label: "Inexistente", description: "A IA não é discutida ou considerada uma prioridade estratégica." },
      { value: 1, label: "Exploratório", description: "Discussões pontuais sem orçamento ou roadmap definido." },
      { value: 2, label: "Definido", description: "IA faz parte do planejamento estratégico anual com orçamento alocado." },
      { value: 3, label: "Integrado", description: "A estratégia de IA está alinhada aos objetivos de negócio core." },
      { value: 4, label: "AI-First", description: "A IA é o pilar central de todas as decisões estratégicas e novos modelos de negócio." }
    ]
  },
  {
    id: "q1_2",
    dimension: "Liderança & Estratégia",
    text: "Como a empresa define o sucesso de iniciativas de IA?",
    options: [
      { value: 0, label: "Sem métricas", description: "Não há acompanhamento de resultados." },
      { value: 1, label: "Métricas Técnicas", description: "Foco apenas em acurácia e performance do modelo." },
      { value: 2, label: "ROI Operacional", description: "Foco em redução de custos e eficiência de processos." },
      { value: 3, label: "Valor Estratégico", description: "Métricas de impacto no cliente e vantagem competitiva." },
      { value: 4, label: "Ecossistema", description: "Métricas de inovação contínua e criação de novos mercados." }
    ]
  },
  // Dimensão 2: Processos & Automação
  {
    id: "q2_1",
    dimension: "Processos & Automação",
    text: "Qual o grau de automação inteligente nos processos core?",
    options: [
      { value: 0, label: "Manual", description: "Processos dependentes de intervenção humana constante." },
      { value: 1, label: "RPA Básico", description: "Automação de tarefas repetitivas baseada em regras simples." },
      { value: 2, label: "Híbrido", description: "IA auxilia humanos em tomadas de decisão específicas." },
      { value: 3, label: "Autônomo", description: "Processos operam de forma autônoma com supervisão humana mínima." },
      { value: 4, label: "Auto-otimizável", description: "Processos que aprendem e se ajustam sozinhos em tempo real." }
    ]
  },
  // Dimensão 3: Dados & Infraestrutura
  {
    id: "q3_1",
    dimension: "Dados & Infraestrutura",
    text: "Como está estruturada a governança e qualidade de dados?",
    options: [
      { value: 0, label: "Silos", description: "Dados fragmentados, inacessíveis e sem padronização." },
      { value: 1, label: "Centralizado", description: "Data Lake ou Warehouse básico, mas com problemas de qualidade." },
      { value: 2, label: "Governança Ativa", description: "Políticas claras de acesso, qualidade e linhagem de dados." },
      { value: 3, label: "Data-as-a-Product", description: "Dados prontos para consumo por modelos de IA em toda a empresa." },
      { value: 4, label: "Real-time Fabric", description: "Infraestrutura de dados em tempo real integrada e resiliente." }
    ]
  },
  // Dimensão 4: Cultura & Pessoas
  {
    id: "q4_1",
    dimension: "Cultura & Pessoas",
    text: "Qual o nível de alfabetização em IA (AI Literacy) dos colaboradores?",
    options: [
      { value: 0, label: "Nulo", description: "A maioria dos colaboradores desconhece o potencial da IA." },
      { value: 1, label: "Conscientização", description: "Treinamentos básicos realizados para lideranças." },
      { value: 2, label: "Capacitação", description: "Programas de upskilling ativos para áreas técnicas e de negócio." },
      { value: 3, label: "Fluência", description: "Colaboradores utilizam IA diariamente para aumentar produtividade." },
      { value: 4, label: "Inovação Distribuída", description: "Cultura de experimentação onde todos propõem soluções de IA." }
    ]
  },
  // Dimensão 5: LLM & IA Generativa
  {
    id: "q5_1",
    dimension: "LLM & IA Generativa",
    text: "Como a empresa utiliza modelos de linguagem (LLMs)?",
    options: [
      { value: 0, label: "Nenhum", description: "Não há uso formal de IA Generativa." },
      { value: 1, label: "Uso Individual", description: "Colaboradores usam ferramentas públicas (ex: ChatGPT) sem diretrizes." },
      { value: 2, label: "Enterprise GPT", description: "Ambiente seguro e privado para uso de LLMs pela organização." },
      { value: 3, label: "Customização", description: "Uso de RAG ou Fine-tuning com dados proprietários da empresa." },
      { value: 4, label: "Agentes", description: "Ecossistema de agentes autônomos integrados aos sistemas core." }
    ]
  },
  // Dimensão 6: Governança & Risco
  {
    id: "q6_1",
    dimension: "Governança & Risco",
    text: "Existe um framework de ética e segurança para IA?",
    options: [
      { value: 0, label: "Inexistente", description: "Nenhuma política de risco ou ética definida." },
      { value: 1, label: "Reativo", description: "Tratamento de incidentes conforme ocorrem." },
      { value: 2, label: "Compliance", description: "Políticas básicas alinhadas à LGPD e segurança da informação." },
      { value: 3, label: "Ética por Design", description: "Avaliação de viés e segurança integrada ao ciclo de vida da IA." },
      { value: 4, label: "Liderança em Padrões", description: "A empresa define padrões de mercado para uso responsável de IA." }
    ]
  }
];