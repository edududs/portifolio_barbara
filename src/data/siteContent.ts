export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Contato', href: '/contato' }
] as const

export const footerNavItems = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Contato', href: '/contato' }
] as const

export const heroContent = {
  brand: 'Barbara Fonseca',
  title: 'Barbara Fonseca',
  subtitle: 'Estética, Movimento, Estratégia.',
  cta: 'veja meu trabalho'
} as const

export const serviceCards = [
  {
    title: 'Curadoria Visual',
    body: 'Cada detalhe conta. Transformo conceitos abstratos em narrativas visuais coesas que capturam a essência da sua marca e criam conexão emocional com seu público.'
  },
  {
    title: 'Pensamento Estratégico',
    body: 'Beleza que performa. Uno estética refinada a estratégia de negócio, garantindo que cada escolha visual trabalhe a favor dos seus objetivos comerciais.'
  },
  {
    title: 'Execução Técnica',
    body: 'Da ideia à implementação. Domínio completo das ferramentas e plataformas necessárias para dar vida a projetos complexos com excelência técnica e criativa.'
  }
] as const

export const specialties = [
  {
    title: 'Moda & Lifestyle',
    body: 'Narrativas que transformam peças em desejo e lifestyle em aspiração.',
    image: 'fashion'
  },
  {
    title: 'Institucional',
    body: 'Humanização de marcas através de storytelling autêntico e impactante.',
    image: 'institutional'
  }
] as const

export const specialtiesSubtitle = 'Dois nichos, um denominador comum: transformar conteúdo em conexão'

export const ctaContent = {
  title: 'Pronto para elevar sua marca?',
  body: 'Vamos conversar sobre como transformar sua visão em conteúdo que converte.',
  action: 'Iniciar Conversa'
} as const

export const aboutPageHeroContent = {
  title: 'A Curadora por Trás da Estratégia',
  eyebrow: '7 anos transformando conteúdo em conexão'
} as const

export const aboutPageEditorialContent = [
  'Sou Barbara Fonseca, especialista em transformar marcas através da interseção entre estética refinada e estratégia comercial inteligente.',
  'Com 7 anos de experiência em marketing digital, desenvolvi uma abordagem única que combina sensibilidade artística com métricas de performance. Acredito que beleza e resultados não são excludentes — são complementares.',
  'Meu trabalho vai além do superficial. Cada projeto é uma oportunidade de criar narrativas visuais que não apenas encantam, mas convertem. É sobre entender profundamente sua marca, seu público e seus objetivos para criar experiências que deixam marca.'
] as const

export const aboutApproachSections = [
  {
    title: "Estratégia antes da execução",
    body: "Antes de ligar a câmera, eu entendo seu negócio. Seu público. Seus objetivos. Cada peça de conteúdo nasce de um briefing estratégico que une SEO, narrativa de marca e objetivos comerciais.",
  },
  {
    title: "Olhar editorial, resultado comercial",
    body: "Minha formação em design de moda me dá o repertório necessário para construir imagens que comunicam a essência da marca com intenção e profundidade.",
  },
  {
    title: "Da captação à entrega final",
    body: "Domínio técnico completo: conceitualização, direção de fotografia, captação, edição, pós-produção e copy estratégico. Você trabalha com uma profissional, não com uma equipe fragmentada.",
  },
] as const;

export const aboutPrinciplesSection = {
  title: 'Meus Princípios',
  intro: 'Valores que guiam cada projeto, cada frame, cada palavra'
} as const

export const aboutPrinciples = [
  {
    title: 'Intencionalidade',
    body: 'Humanização de marcas através de storytelling autêntico, direção visual e escolhas guiadas por propósito.'
  },
  {
    title: 'Excelência Estética',
    body: 'Refinamento visual para que cada peça comunique valor, posicionamento e desejo com clareza.'
  },
  {
    title: 'Resultados Mensuráveis',
    body: 'Conteúdo bonito não basta. Cada entrega precisa fortalecer percepção, engajamento e conversão.'
  }
] as const

// ─── Serviços page ────────────────────────────────────────────────────────────

export const servicesPageHero = {
  title: 'Serviços',
  subtitle: 'Soluções integradas que unem estética editorial, pensamento estratégico e execução impecável'
} as const

export const servicesList = [
  {
    tag: 'carro-chefe',
    title: 'Produção & Edição de Vídeos',
    body: 'Da conceitualização à entrega final. Captação profissional, direção de fotografia, edição avançada e pós-produção que transforma vídeos em experiências memoráveis.',
    bullets: ['Reels estratégicos para Instagram', 'Vídeos institucionais'],
    image: 'producao' as const,
    imageLeft: true
  },
  {
    tag: 'Pensamento Crítico',
    title: 'Estratégia de Conteúdo',
    body: 'Planejamento completo de conteúdo alinhado aos objetivos de negócio. SEO, análise de mercado, definição de pilares e calendário editorial estratégico.',
    bullets: ['Calendário editorial mensal', 'Estratégia de SEO e keywords', 'Análise de concorrência'],
    image: 'estrategia' as const,
    imageLeft: false
  },
  {
    tag: 'Olhar editorial',
    title: 'Storymaking & Curadoria Visual',
    body: 'Direção criativa e curadoria visual com padrão editorial. Transformo produtos em objetos de desejo através de narrativas visuais impactantes.',
    bullets: ['Direção de arte para shoots', 'Concept boards e moodboards', 'Styling e direção de fotografia', 'Consultoria estética'],
    image: 'storymaker' as const,
    imageLeft: true
  },
  {
    tag: 'Palavras que convertem',
    title: 'Copywriting Estratégico',
    body: 'Textos que vendem, educam e conectam. Do microcopy ao storytelling completo, cada palavra tem um propósito claro.',
    bullets: ['Legendas estratégicas para redes sociais', 'Storytelling de marca', 'Scripts para vídeos'],
    image: 'copywriting' as const,
    imageLeft: false
  },
  {
    tag: 'Presença estratégica',
    title: 'Gestão de Redes Sociais',
    body: 'Gestão completa de redes sociais com foco em crescimento orgânico, engajamento qualificado e conversão.',
    bullets: ['Planejamento e execução de conteúdo', 'Gerenciamento de comunidade', 'Análise de métricas e relatórios', 'Otimização de perfis', 'Growth hacking estratégico'],
    image: 'redesSociais' as const,
    imageLeft: true
  }
] as const

export const servicesPrinciples = {
  title: 'Meus Princípios',
  subtitle: 'Um processo estruturado que garante resultados consistentes',
  steps: [
    { number: '01', title: 'Imersão', body: 'Entendimento profundo do negócio, público e objetivos' },
    { number: '02', title: 'Estratégia', body: 'Desenvolvimento de conceito e planejamento tático' },
    { number: '03', title: 'Execução', body: 'Produção com atenção aos detalhes' },
    { number: '04', title: 'Otimização', body: 'Análise de resultados e melhorias contínuas' }
  ]
} as const

// ─── Contato page ─────────────────────────────────────────────────────────────

export const contactPageHero = {
  title: 'Vamos Conversar',
  subtitle: 'Toda grande parceria começa com uma conversa. Estou pronta para entender seu desafio e transformá-lo em oportunidade.'
} as const

export const contactInfo = {
  whatsapp: '5561985341091',
  whatsappDisplay: '61985341091',
  whatsappHref: 'https://wa.me/5561985341091?text=Ol%C3%A1%20Barbara!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F',
  email: 'bfonsecalps@gmail.com',
  emailHref: 'mailto:bfonsecalps@gmail.com',
  instagramHandle: '@bfonsecalps',
  instagramHref: 'https://instagram.com/bfonsecalps'
} as const

export const contactWhyContent = {
  title: 'Por Que Trabalhar Comigo',
  bullets: [
    'Estratégia, criação e execução em uma única profissional Visão 360°.',
    'Foco em Resultados: Beleza que performa, criatividade que converte',
    'Conhecimento profundo dos nichos de moda e institucional com 7 Anos de Experiência.'
  ],
  socialTitle: 'Conecte-se'
} as const

export const contactFaq = {
  title: 'Perguntas Frequentes',
  items: [
    {
      question: 'Qual o investimento médio para um projeto?',
      answer: 'Cada projeto é único e precificado de acordo com escopo, complexidade e prazos. Após o briefing inicial, envio uma proposta personalizada com valores e etapas detalhadas. Trabalho com projetos pontuais ou retainers mensais.'
    },
    {
      question: 'Quanto tempo leva para iniciar um projeto?',
      answer: 'Após aprovação da proposta e alinhamento de briefing, posso iniciar em até 7 dias úteis. Para demandas urgentes, consulte disponibilidade de fast track.'
    },
    {
      question: 'Atende apenas marcas de Brasília?',
      answer: 'Não! Atendo clientes em todo o Brasil. A maior parte do processo pode ser remoto, e para produções presenciais, avalio deslocamento conforme projeto.'
    },
    {
      question: 'Fornece apenas produção de vídeo ou também estratégia?',
      answer: 'Ambos! Meu diferencial é justamente unir estratégia e execução. Cada produção nasce de um planejamento estratégico sólido, mas também ofereço consultoria estratégica isolada.'
    }
  ]
} as const
