# Portfólio Barbara Fonseca — Refinamento de Presença das Animações

## Objetivo
Aumentar a presença e a percepção das animações já adicionadas ao portfólio, mantendo a mesma linguagem estética premium, editorial e controlada. O refinamento deve tornar o movimento mais perceptível para a Barbara sem deixar a experiência exagerada ou com cara de template genérico.

## Contexto atual
- O portfólio já possui Motion for React integrado.
- Hero, serviços, about, especialização, CTA e footer já têm animações funcionais.
- O feedback da Barbara foi que o resultado ficou "muito sutil".
- A necessidade agora não é mudar a direção visual, e sim **intensificar** a presença das animações atuais.

## Decisão principal
Refinar a solução existente aumentando:
- amplitude de deslocamentos
- contraste entre etapas de entrada
- presença de stagger
- intensidade controlada de hover
- percepção de parallax em pontos-chave

## O que não muda
- a biblioteca continua sendo Motion for React
- a arquitetura geral das animações permanece a mesma
- reduced motion continua sendo respeitado
- a linguagem visual continua sofisticada, não exuberante

## Escopo
Refinar as animações de:
1. Hero
2. Serviços
3. About
4. Especialização
5. CTA final
6. interações de hover relevantes

## Fora de escopo
- trocar de biblioteca
- adicionar novas famílias de efeito complexas
- criar sequência cinematográfica entre múltiplas seções
- transformar o site em experiência altamente dramática
- alterar o layout base do portfólio

## Estratégia geral
Ajustar os valores existentes de motion em vez de reescrever a solução do zero.

Os refinamentos devem priorizar:
- entradas mais claras
- timing mais perceptível
- hierarquia de entrada mais evidente
- hover mais vivo
- scroll-linked motion um pouco mais marcante

## Refinamentos por área
### Hero
Aumentar a imponência de entrada do topo.

Ajustes esperados:
- título com deslocamento inicial maior
- subtítulo com atraso e separação mais perceptíveis
- CTA com entrada mais marcada
- seta com micro-movimento mais visível
- parallax do background e do bloco principal mais perceptível, mas ainda elegante

Resultado esperado:
- o hero deve parecer mais vivo e mais premium logo no primeiro impacto

### Serviços
Aumentar a sensação de progressão dos cards.

Ajustes esperados:
- heading entra com presença maior
- cards com stagger mais claro
- cards sobem mais ao entrar
- hover com elevação e presença um pouco mais fortes

Resultado esperado:
- a seção deve parecer mais ritmada e menos estática

### About
Dar mais contraste entre os blocos de texto e imagem.

Ajustes esperados:
- texto e imagem entram com deslocamentos um pouco maiores
- parallax da imagem mais perceptível
- composição mais viva conforme a seção aparece na viewport

Resultado esperado:
- a seção deve transmitir mais sofisticação e direção visual

### Especialização
Destacar melhor a entrada dos cards visuais.

Ajustes esperados:
- reveal mais marcado no título e nos cards
- stagger mais claro entre primeiro e segundo card
- hover das imagens com presença maior, sem exagero

Resultado esperado:
- a seção deve ganhar mais presença visual sem perder sobriedade

### CTA final
Fazer a parte final parecer mais convincente e memorável.

Ajustes esperados:
- entrada mais forte do bloco
- botão com hover mais vivo
- ritmo mais claro entre texto e ação

Resultado esperado:
- a CTA deve parecer mais importante e mais convidativa

### Footer
Manter discrição.

Ajustes esperados:
- preservar entrada sutil
- deixar apenas os hovers um pouco mais elegantes se necessário

Resultado esperado:
- o footer segue sóbrio, sem competir com o restante

## Regras de ajuste
- aumentar presença sem gerar ruído
- evitar rebote exagerado
- evitar escala excessiva
- evitar parallax forte demais
- manter legibilidade e percepção premium

## Acessibilidade
- `useReducedMotion` continua obrigatório
- usuários com reduced motion não devem receber a versão intensificada dos transforms
- nesses casos, manter apenas transições mínimas ou neutras

## Performance
- continuar priorizando `transform` e `opacity`
- não introduzir animações custosas em layout
- não espalhar hooks ou lógica extra sem necessidade real

## Estrutura esperada de alteração
Arquivos mais prováveis:
- `src/lib/motion.ts`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/SpecialtiesSection.tsx`
- `src/components/sections/CtaSection.tsx`
- possivelmente pequenos ajustes em componentes de card e botão

## Estratégia de testes
- manter a cobertura funcional atual
- validar que a renderização e navegação continuam intactas
- validar build após ajustes
- principal validação qualitativa será visual/manual no desktop

## Critérios de sucesso
- Barbara percebe mais claramente o movimento
- o portfólio continua sofisticado e não exagerado
- o hero ganha mais presença
- o ritmo entre seções fica mais vivo
- a CTA final fica mais impactante
- reduced motion continua funcionando
- sem regressão em testes ou build

## Sequência esperada de implementação
1. ajustar primitives compartilhadas de motion
2. reforçar hero
3. reforçar serviços/about/especialização
4. reforçar CTA e hovers
5. validar testes e build
6. fazer passe final de sensibilidade visual no desktop

## Observações
- O objetivo é sair do “muito sutil” para “claramente presente”, sem atravessar a linha do exagero.
- A mudança é de **intensidade e presença**, não de identidade visual.
- O portfólio deve continuar parecendo refinado, estratégico e esteticamente controlado.
