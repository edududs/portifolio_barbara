# Portfólio Barbara Fonseca — Design de Animações por Scroll

## Objetivo
Adicionar animações orientadas por scroll ao portfólio para deixá-lo mais dinâmico, mantendo o caráter editorial e sofisticado da landing page. A solução deve ser robusta, integrada ao projeto atual em React + Vite + TypeScript + Tailwind, e preservar a fidelidade visual do desktop já implementado.

## Contexto atual
- O portfólio já foi implementado no worktree `portfolio-landing`.
- A base atual usa React, Vite, TypeScript, Tailwind e Yarn.
- A página já possui seções definidas: hero, serviços, about, especialização, CTA e footer.
- Ainda não existe biblioteca de animação instalada.

## Decisão principal
Usar **Motion for React** como biblioteca de animação.

## Por que essa escolha
- É robusta para React e adequada para uma solução mais confiável do que CSS scroll-driven nativo puro.
- Permite combinar animações disparadas por entrada em viewport e animações ligadas à progressão do scroll.
- Fornece bom controle sobre intensidade, easing e acessibilidade.
- Se encaixa melhor no estilo refinado do portfólio do que uma solução mais pesada e expansiva como GSAP.

## Escopo
Adicionar animações de intensidade média nas seguintes áreas:
1. Hero
2. Serviços
3. About
4. Especialização
5. CTA final
6. estados de hover relevantes

## Fora de escopo
- animações cinematográficas pesadas
- timelines complexas entre múltiplas seções
- canvas/WebGL
- animações que alterem drasticamente o layout
- efeitos que prejudiquem performance ou legibilidade

## Princípios de motion
- A sensação geral deve ser **premium, editorial, controlada e elegante**.
- O movimento deve reforçar hierarquia e ritmo visual, não roubar atenção do conteúdo.
- O desktop continua sendo a principal referência de qualidade visual.
- Tablet e mobile podem usar animações reduzidas, desde que coerentes.
- Sempre respeitar `prefers-reduced-motion`.

## Arquitetura técnica
### Biblioteca
Adicionar `motion` para React ao projeto.

### APIs previstas
- `motion` components para wrappers animados
- `whileInView` para reveals por seção
- `useScroll` para vincular elementos ao progresso do scroll
- `useTransform` para transformar progressos em deslocamentos/opacidade/escala leves
- `useReducedMotion` para fallback acessível

### Estratégia de implementação
- Evitar criar uma camada de abstração complexa cedo demais.
- Aplicar motion diretamente nos componentes de seção e em poucos elementos-chave.
- Quando houver repetição real, extrair helpers simples de animação ou objetos de variants.
- Separar claramente animações de entrada, animações ligadas ao scroll e interações de hover.

## Comportamento por seção
### Hero
Objetivo: dar uma primeira impressão mais viva sem perder sofisticação.

Aplicações:
- título entra com fade + deslocamento vertical curto
- subtítulo entra logo depois com atraso pequeno
- CTA entra por último, reforçando progressão visual
- seta inferior recebe micro-movimento contínuo e discreto
- fundo ou bloco principal recebe parallax muito leve em relação ao scroll

Restrições:
- não usar zoom agressivo no background
- não usar rebotes exagerados
- o hero deve continuar parecendo limpo e estável

### Serviços
Objetivo: criar percepção de progressão quando os cards entram na tela.

Aplicações:
- heading da seção aparece com fade curto
- cards entram em cascata conforme entram em viewport
- hover com leve elevação visual e/ou scale muito sutil

Restrições:
- manter leitura instantânea do conteúdo
- evitar atrasos grandes entre os cards

### About
Objetivo: reforçar o equilíbrio entre texto estratégico e imagem.

Aplicações:
- bloco de texto entra lateralmente com suavidade
- imagem entra do lado oposto com timing coordenado
- imagem recebe parallax vertical leve durante o scroll da seção

Restrições:
- o texto não pode parecer “flutuando” demais
- o parallax deve ser contido para não parecer efeito genérico de template

### Especialização
Objetivo: dar ritmo à exibição das áreas de atuação.

Aplicações:
- título da seção com reveal curto
- cards entram com pequeno stagger
- imagens reagem suavemente no hover, com scale baixa e controlada

Restrições:
- preservar crop e composição visual das imagens
- sem distorções ou shifts perceptíveis do layout

### CTA final
Objetivo: fazer a seção parecer mais importante sem ficar chamativa demais.

Aplicações:
- entrada da seção com fade e subida curta
- botão com hover mais refinado e resposta mais viva
- leve progressão de opacidade/posição no conteúdo conforme entra em viewport

### Footer
Objetivo: encerrar a experiência com sobriedade.

Aplicações:
- no máximo fade curto quando entrar na viewport
- hover sutil em links

Restrições:
- footer deve permanecer essencialmente estático

## Acessibilidade
Usar `useReducedMotion` para reduzir ou remover:
- parallax
- transforms mais perceptíveis em scroll
- movimentos contínuos chamativos

Fallback esperado com reduced motion:
- fades rápidos ou ausência de animação
- nenhuma perda de conteúdo ou usabilidade

## Performance
- Não animar propriedades custosas como layout/reflow quando não for necessário.
- Priorizar `transform` e `opacity`.
- Manter amplitudes pequenas.
- Evitar múltiplos listeners/custom logic redundantes por seção quando hooks da biblioteca já resolverem.

## Estrutura sugerida
Possíveis pontos de alteração:
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/SpecialtiesSection.tsx`
- `src/components/sections/CtaSection.tsx`
- `src/components/layout/SiteFooter.tsx`
- possivelmente um arquivo simples compartilhado para variants/transitions, se isso realmente reduzir duplicação

## Estratégia de testes
Cobrir principalmente:
- renderização intacta após adicionar motion
- ausência de quebra em links/âncoras/CTA
- build passando com a biblioteca adicionada
- comportamento não precisa ser testado visualmente em detalhe no nível unitário; a validação principal será funcional + inspeção manual

## Critérios de sucesso
- biblioteca de animação integrada corretamente
- animações perceptíveis e elegantes, em intensidade média
- desktop com sensação mais dinâmica sem perder fidelidade visual
- mobile e tablet com comportamento coerente e mais contido quando necessário
- sem regressões em navegação, conteúdo e build
- respeito a reduced motion

## Sequência esperada de implementação
1. adicionar a biblioteca Motion
2. aplicar animações de entrada no hero
3. aplicar scroll/reveal nas seções centrais
4. aplicar hover refinado nos pontos adequados
5. adicionar fallback de reduced motion
6. validar testes e build
7. fazer passe final de ajuste visual no desktop

## Observações
- A intenção não é transformar a landing em uma experiência exuberante demais, e sim elevar a sensação de acabamento.
- A linguagem de motion deve acompanhar o posicionamento da marca: estratégica, estética e controlada.
- O foco é melhorar ritmo e presença visual, sem descaracterizar a composição aprovada do portfólio.
