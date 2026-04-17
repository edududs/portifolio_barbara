# Portfólio Barbara Fonseca — Design de Implementação

## Objetivo
Implementar em código a landing page do arquivo Figma `portifólio` como uma aplicação **React + Vite + TypeScript + Tailwind**, com foco em fidelidade visual e responsividade para **desktop, tablet e mobile**.

## Contexto atual
- O diretório `/home/eduardo/Projects/workspace/projects/portifolio_babs` está vazio.
- Não há código, configuração, componentes, estilos ou dependências instaladas.
- A implementação precisará começar pela inicialização do projeto base antes de construir a interface.

## Escopo
Implementar uma landing page única com estas seções:
1. Hero com imagem de fundo, navegação e CTA principal
2. Seção “Como ajudo sua marca” com três cards
3. Seção institucional “A Curadora por Trás da Estratégia”
4. Seção “Especialização” com dois blocos visuais e textos
5. CTA final “Pronto para elevar sua marca?”
6. Footer com navegação secundária, texto institucional e link social

## Fora de escopo
- CMS
- Backend
- formulário funcional com envio real
- animações avançadas com bibliotecas extras
- internacionalização
- blog ou múltiplas páginas

## Stack aprovada
- **Vite** para setup do projeto
- **React** para composição da interface
- **TypeScript** para tipagem
- **Tailwind CSS** para estilização

## Dependências esperadas
Como o projeto está vazio, a implementação vai exigir a instalação/configuração de dependências base de frontend. No mínimo:
- React / React DOM
- Vite
- TypeScript
- Tailwind CSS
- tooling associada ao Tailwind/Vite necessária para build local

Se surgir necessidade de qualquer biblioteca extra além desse setup base, isso deve ser comunicado antes de instalar.

## Estrutura proposta
```text
portifolio_babs/
  src/
    assets/
    components/
      layout/
      sections/
      ui/
    data/
    App.tsx
    main.tsx
    index.css
  public/
  docs/superpowers/specs/
```

## Componentes planejados
### Layout
- `SiteHeader`
- `SiteFooter`
- `Section`
- `Container`

### Seções
- `HeroSection`
- `ServicesSection`
- `AboutSection`
- `SpecialtiesSection`
- `CtaSection`

### UI
- `PrimaryButton`
- `NavLink`
- `ServiceCard`
- `SpecialtyCard`

## Estratégia de implementação visual
- Reproduzir a composição do Figma usando Tailwind e componentes React.
- No desktop, a implementação deve ser **exatamente igual ao Figma** em cores, tipografia, espaçamentos, proporções e hierarquia visual.
- Tablet e mobile podem adaptar layout e fluxo por decisão de implementação, desde que preservem a identidade visual e a legibilidade.
- Priorizar uma base visual fiel ao design antes de qualquer refinamento extra.
- Reaproveitar padrões simples entre seções em vez de criar abstrações prematuras.
- Usar imagens vindas do design como referência visual e integrá-las ao projeto de forma local durante a implementação.

## Responsividade
### Desktop
- Layout próximo ao Figma original, com largura ampla e espaçamentos mais generosos.

### Tablet
- Refluxo de grids em 2 colunas quando necessário.
- Redução proporcional de títulos, paddings e gaps.

### Mobile
- Navegação simplificada.
- Seções empilhadas verticalmente.
- Cards em coluna única.
- CTA e textos centralizados quando isso preservar legibilidade.

## Conteúdo
O conteúdo textual principal virá do Figma atual, incluindo:
- Barbara Fonseca
- Estética, Movimento, Estratégia.
- Como ajudo sua marca
- A Curadora por Trás da Estratégia
- Especialização
- Pronto para elevar sua marca?
- Footer institucional e navegação

## Navegação
A navegação será de página única com âncoras para:
- Sobre
- Serviços
- Cases
- Contato

## Acessibilidade
- Estrutura semântica com `header`, `main`, `section`, `footer`
- Hierarquia adequada de headings
- Links e botões com foco visível
- Imagens decorativas com tratamento apropriado
- Contraste preservado dentro do possível sem desviar visualmente do design

## Dados e estado
- A página será majoritariamente estática.
- O conteúdo pode ser mantido em constantes/arrays simples quando isso reduzir repetição.
- Não há necessidade de gerenciamento de estado global.

## Tratamento de erros
- Não criar fluxos artificiais de erro para conteúdo estático.
- Validar apenas o que estiver na fronteira do sistema, como carregamento de assets locais ou links externos quando necessário.

## Estratégia de testes
Seguir TDD durante a implementação:
1. escrever testes mínimos para renderização das seções principais
2. validar navegação por âncoras e presença dos CTAs
3. validar comportamento responsivo básico no nível de componentes quando fizer sentido
4. manter os testes enxutos, focados no comportamento visível

## Critérios de sucesso
- Projeto inicializado com React + Vite + TypeScript + Tailwind
- Landing page implementada no diretório informado
- Estrutura visual equivalente ao Figma
- Layout responsivo para desktop, tablet e mobile
- Código organizado em componentes pequenos
- Sem dependências extras além do setup base, a menos que combinado

## Sequência de build
1. Inicializar projeto Vite + React + TypeScript
2. Configurar Tailwind
3. Definir base global de fontes, cores e reset necessário
4. Implementar estrutura da página e navegação
5. Implementar hero
6. Implementar seções intermediárias
7. Implementar CTA final e footer
8. Refinar responsividade
9. Validar visualmente contra o Figma
10. Executar testes e ajustes finais

## Observações
- O Figma foi usado como fonte de conteúdo, hierarquia e direção visual.
- Como parte do layout ainda veio por blocos/símbolos, a implementação deve adaptar a intenção visual ao projeto em vez de copiar literalmente a saída bruta do MCP.
- Não foi solicitado commit neste momento; portanto, a especificação será salva no repositório sem criar commit automático.
