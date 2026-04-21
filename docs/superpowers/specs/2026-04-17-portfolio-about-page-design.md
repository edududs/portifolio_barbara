# Portfólio Barbara Fonseca — Página Sobre

## Objetivo
Implementar uma página própria `/sobre` a partir do novo estado do Figma, substituindo a antiga seção About da landing principal por uma experiência editorial dedicada, consistente com a linguagem visual e de movimento já existentes no projeto.

## Contexto atual
- O projeto atual é uma landing page em React + Vite + TypeScript + Tailwind.
- A antiga seção “A Curadora por Trás da Estratégia” fazia parte da landing.
- No Figma, essa seção foi removida da página principal e transformada em uma página própria no mesmo arquivo.
- A nova página About parece ocupar a faixa horizontal em `x≈2707` no arquivo do Figma.
- O projeto já possui header, footer e linguagem de animação com Motion.

## Decisão principal
Criar uma rota dedicada **`/sobre`** e remover da landing principal a antiga seção About.

## Por que essa escolha
- Reflete fielmente a nova estrutura do Figma.
- Mantém a landing mais enxuta e objetiva.
- Dá mais espaço para apresentar Barbara com profundidade editorial.
- Permite reutilizar a base visual e técnica já pronta sem misturar responsabilidades.

## Escopo
1. Criar rota própria `/sobre`
2. Remover a antiga seção About da landing principal
3. Implementar a nova página a partir das Sections 4 a 8 do Figma
4. Reaproveitar header/footer e linguagem visual existente
5. Manter coerência de animação com o resto do site

## Fora de escopo
- CMS
- blog
- múltiplas páginas adicionais além de `/sobre`
- refatoração ampla do restante da landing
- reestruturação total da navegação além do necessário para suportar a rota nova

## Estrutura da nova página
### 1. Hero da página About
Baseado na **Section 4** do Figma.

Conteúdo principal:
- título: “A Curadora por Trás da Estratégia”
- subtítulo/apoio: “7 anos transformando conteúdo em conexão”
- navegação no topo consistente com a identidade atual

Objetivo:
- apresentar Barbara com mais peso editorial e posicionamento claro logo na abertura da página

### 2. Bloco principal de conteúdo
Baseado na **Section 5** e no conteúdo já expandido no Figma.

Estrutura:
- coluna textual com os parágrafos principais
- imagem editorial lateral
- composição ampla, com bastante respiro

Objetivo:
- aprofundar a narrativa pessoal/profissional da Barbara
- manter leitura elegante e ritmo visual controlado

### 3. Seção “Minha Abordagem”
Baseada na **Section 6**.

Subblocos textuais:
- Estratégia antes da execução
- Olhar editorial, resultado comercial
- Da captação à entrega final

Objetivo:
- explicar a forma de trabalho da Barbara de modo mais estratégico e autoral

### 4. Seção “Meus Princípios”
Baseada na **Section 7** com os blocos internos 8, 9 e 10.

Cards/colunas:
- Intencionalidade
- Excelência Estética
- Resultados Mensuráveis

Objetivo:
- resumir os pilares que orientam o trabalho dela
- dar fechamento conceitual antes do footer

### 5. Footer
Baseado na **Section 8**.

Objetivo:
- reaproveitar a estrutura já existente no projeto, ajustando navegação se necessário para refletir a nova rota `/sobre`

## Navegação
A navegação deve ser atualizada para refletir a nova arquitetura:
- na landing principal, o item “Sobre” deve navegar para **`/sobre`**
- na página `/sobre`, a navegação pode manter os demais itens apontando para a landing principal ou para destinos equivalentes definidos no projeto
- a marca “Barbara Fonseca” deve continuar funcionando como ponto de retorno coerente

## Arquitetura técnica
### Rotas
Adicionar roteamento simples ao projeto para suportar pelo menos:
- `/` → landing principal
- `/sobre` → nova página About

### Estrutura de componentes
Criar componentes específicos para a página `/sobre`, preservando separação clara entre:
- hero da página about
- bloco editorial principal
- seção de abordagem
- seção de princípios

### Reuso
Reaproveitar quando fizer sentido:
- `SiteHeader`
- `SiteFooter`
- tokens visuais já definidos
- linguagem de motion existente

## Direção visual
- mesma identidade premium/editorial da landing
- página mais textual e narrativa
- layout com bastante respiro
- títulos fortes e bem escalados
- blocos de conteúdo com leitura confortável

## Animações
A nova página deve herdar a mesma linguagem de motion do projeto:
- hero com entrada elegante
- bloco editorial com reveal coordenado entre texto e imagem
- seção “Minha Abordagem” com progressão suave
- cards de “Meus Princípios” com stagger discreto porém perceptível
- sem exagerar nem transformar a página em showcase de efeitos

## Acessibilidade
- manter semântica clara com `header`, `main`, `section`, `footer`
- preservar headings coerentes
- links e navegação claros
- reduced motion continua obrigatório

## Estratégia de testes
Cobrir principalmente:
- renderização da nova rota `/sobre`
- remoção da antiga seção About da landing, se aplicável aos testes existentes
- atualização correta do item de navegação “Sobre”
- presença dos principais títulos e blocos da nova página
- build e testes gerais passando após a introdução do roteamento

## Critérios de sucesso
- `/sobre` implementada e funcionando
- landing principal sem a antiga seção About
- navegação atualizada corretamente
- nova página visualmente alinhada ao Figma atual
- coerência com a identidade do restante do portfólio
- sem regressões em build, testes e navegação

## Sequência esperada de implementação
1. adicionar suporte simples a rotas
2. ajustar navegação para suportar `/sobre`
3. remover a antiga seção About da landing
4. implementar hero da página About
5. implementar bloco editorial principal
6. implementar “Minha Abordagem”
7. implementar “Meus Princípios”
8. integrar footer e revisar navegação
9. validar testes, build e refinamento visual final

## Observações
- O foco não é inventar uma nova direção visual, e sim traduzir corretamente a nova organização do Figma para o projeto.
- A página `/sobre` deve parecer parte natural do mesmo site, não um microsite separado.
- A mudança principal é estrutural: o conteúdo About ganha autonomia como página própria.
