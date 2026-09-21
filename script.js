/* REDLINE — the animated site behaviour.
   Everything that moves runs on GSAP:
     · page transitions between the three HTML pages (overlay sweep)
     · hero / masthead / install-hero entrances
     · scroll reveals (ScrollTrigger batch, small delay after entry)
     · the marquee loop
     · the scrubbed redline statement
     · aurora core drift + hero parallax
   State only, no motion: progress bar, section spy.
   Also: EN ⇄ PT-BR language toggle (US/Brazil flag liquid-glass button).
   Falls back to a fully static, informative page when GSAP is missing
   or the user prefers reduced motion. Links always navigate. */

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!window.gsap && !!window.ScrollTrigger;
  const canFx = hasGsap && !reduced;
  const FLAG = 'rl-x';
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ── i18n: EN ⇄ PT  ─────────────────────────────────────────── */
  const STORE = 'rl-lang';
  const REVEAL = { start: 'top 84%', delay: 0.18 };
  let lang = 'en';
  try { if (localStorage.getItem(STORE) === 'pt') lang = 'pt'; } catch {}

  /* PT dictionary.
     · mixed-markup elements are translated through `data-i18n` (short key) →
       full PT innerHTML here.
     · plain text nodes are translated by exact trimmed-string match (below).
     Keys/values use decoded characters: ’ “ ” … —  (not &rsquo; etc). */
  const PT = {
    /* ── nav / chrome ── */
    'Landing': 'Início',
    'Guide': 'Guia',
    'Standard': 'Padrão',
    'Product': 'Produto',
    'Catalogue': 'Catálogo',
    'Tests': 'Testes',
    'Method': 'Método',
    'Rules': 'Regras',
    'Steps': 'Passos',
    'Verify': 'Verificar',
    'Send to Hermes': 'Enviar ao Hermes',
    'Install': 'Instalar',
    'Get the file': 'Pegar o arquivo',
    'Download pack': 'Baixar pack',
    'Field guide': 'Guia de campo',
    'Download the pack (.zip)': 'Baixar o pack (.zip)',
    'Download REDLINE-SKILL.md': 'Baixar REDLINE-SKILL.md',
    'Sections': 'Seções',
    'Footer': 'Rodapé',
    'REDLINE — home': 'REDLINE — início',
    'Skip to content': 'Pular para o conteúdo',

    /* ── index: hero ── */
    '· SINGLE MARKDOWN FILE ·': '· ARQUIVO MARKDOWN ÚNICO ·',
    'Design that could only belong to its product': 'Design que só poderia pertencer ao seu produto',
    'Install the skill': 'Instalar a skill',
    'Read the field guide': 'Ler o guia de campo',
    'Rules': 'Regras',
    'Anti-patterns': 'Anti-padrões',
    'Phases': 'Fases',
    'Gates': 'Portões',
    'Packs': 'Packs',

    '· swift · honest · structural': '· rápido · honesto · estrutural',
    'REDLINE-SKILL.md · plain text': 'REDLINE-SKILL.md · texto simples',
    'format': 'formato',
    'version': 'versão',
    'license': 'licença',
    'runs in': 'roda em',
    'MIT — free, incl. plugins': 'MIT — grátis, incl. plugins',
    'opencode · claude · hermes · any agent': 'opencode · claude · hermes · qualquer agente',
    'GSAP 8 — transitions · reveals · scroll': 'GSAP 8 — transições · reveals · scroll',
    'Three.js 10 — when the brief asks': 'Three.js 10 — quando o brief pedir',

    /* index hero .sub — data-i18n="hero.sub" */
    'hero.sub':
      'REDLINE é uma disciplina de design que você coloca em qualquer agente — humanos inclusos. Um arquivo <code class="inline-code">SKILL.md</code> que mantém cada interface que entrega <em>intencional</em>, <em>coerente</em> e <em>desenhada por humanos</em>. Motion é GSAP — transições de página, reveals, marquee, parallax — e quando o brief pede 3D, Three.js de verdade. Sem framework. Sem build. Sem chrome para configurar.',

    /* index skillcard — data-i18n keys */
    'sc.h2': '<span class="strike"># Slopless</span> vira # <span class="strike">REDLINE</span>',
    'sc.rules':
      'Específico <span class="strike">da moda</span> · propósito <span class="strike">decoração</span> · clareza <span class="strike">complexidade</span> · identidade <span class="strike">template</span> · hierarquia <span class="strike">ornamento</span>',

    /* ── §1 The standard ── */
    's1.title': 'O padrão <span class="strike">da moda</span>',
    'Five comparisons. Everything in REDLINE follows from these.': 'Cinco comparações. Tudo na REDLINE decorre delas.',
    'Design from the product, the task, and the content — not from a collection of fashionable patterns.': 'Desenhe a partir do produto, da tarefa e do conteúdo — não de uma coleção de padrões da moda.',
    'Every significant visual decision must have a reason. If an element has no job, it has no place.': 'Toda decisão visual significativa precisa de um motivo. Se um elemento não tem função, não tem lugar.',
    'First, second, third — design around what the user should notice, in that order.': 'Primeiro, segundo, terceiro — desenhe em torno do que o usuário deve notar, nessa ordem.',
    'Swap in another company’s logo. If the site still feels right, it is not yours.': 'Troque o logo de outra empresa. Se o site ainda parece certo, não é seu.',
    'Primary attention, secondary information, supporting detail. If everything is emphasized, nothing is.': 'Atenção primária, informação secundária, detalhe de apoio. Se tudo está em destaque, nada é.',

    /* terms (index §1 + guide §1) — data-i18n keys t.* */
    't.var': 'Específico <span class="cmp">&gt;</span> da moda',
    't.pur': 'Propósito <span class="cmp">&gt;</span> decoração',
    't.cla': 'Clareza <span class="cmp">&gt;</span> complexidade',
    't.ide': 'Identidade <span class="cmp">&gt;</span> template',
    't.hie': 'Hierarquia <span class="cmp">&gt;</span> ornamento',

    /* ── §2 Dials ── */
    'Three dials': 'Três dials',
    'Not style choices — settings that must come from the task.': 'Não são escolhas de estilo — ajustes que devem vir da tarefa.',
    'Variance, motion, and density are dials. Their values follow the product. REDLINE never raises them just to look impressive — and it will tell you when to turn them down.': 'Variância, motion e densidade são dials. Os valores seguem o produto. A REDLINE nunca os aumenta só para impressionar — e avisa quando é hora de baixá-los.',
    'Variance': 'Variância',
    'Density': 'Densidade',
    'conventional · stable · predictable': 'convencional · estável · previsível',
    'asymmetric · editorial · unusual composition': 'assimétrico · editorial · composição incomum',
    'feedback only · small transitions': 'só feedback · transições curtas',
    'immersive interaction · scroll choreography': 'interação imersiva · coreografia de scroll',
    'presentation · marketing · storytelling': 'apresentação · marketing · storytelling',
    'dashboards · tools · professional interfaces': 'dashboards · ferramentas · interfaces profissionais',
    'How experimental is the composition?': 'Quão experimental é a composição?',
    'How much motion is justified?': 'Quanto motion é justificado?',
    'How much information is visible at once?': 'Quanta informação fica visível de uma vez?',

    /* guide dial variants */
    'Dial values follow the product. Never raise them just to look impressive.': 'Os valores dos dials seguem o produto. Nunca os aumente só para impressionar.',
    'Not every interface is spacious. Not every dashboard is dense. The dials are set by the task, and REDLINE enforces the setting.': 'Nem toda interface é espaçosa. Nem todo dashboard é denso. Os dials são definidos pela tarefa, e a REDLINE impõe o ajuste.',
    'Composition, not decoration': 'Composição, não decoração',
    'Movement must communicate': 'Movimento precisa comunicar',
    'Follow the task, not the fashion': 'Siga a tarefa, não a moda',

    /* ── §3 The removal catalogue ── */
    'The removal catalogue': 'O catálogo de remoção',
    'Strikethrough is the redline — the delete mark. Hover to consider reinstating.': 'Riscado é a redline — a marca de excluir. Passe o mouse para reconsiderar.',
    'Strikethrough = delete. Hover an item to reconsider it.': 'Riscado = excluir. Passe o mouse em um item para reconsiderá-lo.',
    '26 patterns to avoid unless the product genuinely requires them. None are banned outright — the burden of proof sits with the pattern.': '26 padrões a evitar, a menos que o produto realmente os exija. Nenhum é banido por completo — o ônus da prova está com o padrão.',
    'Patterns to avoid unless the product genuinely requires them. The burden of proof sits with the pattern — and 26 of them have the burden.': 'Padrões a evitar, a menos que o produto realmente os exija. O ônus da prova está com o padrão — e 26 deles carregam esse ônus.',
    'B · Decoration': 'B · Decoração',
    'C · Detail': 'C · Detalhe',
    'D · Copy & claims': 'D · Copy e claims',

    'Generic hero + CTA + mockup': 'Hero genérico + CTA + mockup',
    'Identical centered landing pages': 'Landing pages centralizadas idênticas',
    'Excessive cards': 'Cards em excesso',
    'Card-inside-card layouts': 'Layouts de card dentro de card',
    'Uniform card grids': 'Grades de cards uniformes',
    'Components added only to fill whitespace': 'Componentes adicionados só para preencher espaço',
    'Random gradients': 'Gradientes aleatórios',
    'Decorative glassmorphism': 'Glassmorphism decorativo',
    'Excessive blur': 'Blur em excesso',
    'Excessive shadows': 'Sombras em excesso',
    'Excessive glow': 'Brilho em excesso',
    'Floating blobs': 'Blobs flutuantes',
    'Fake “3D” objects': 'Objetos “3D” falsos',
    'Unnecessary rounded rectangles': 'Retângulos arredondados desnecessários',
    'Excessive pills': 'Pills em excesso',
    'Badge spam': 'Spam de badges',
    'Icon spam': 'Spam de ícones',
    'Stock-looking illustrations': 'Ilustrações com cara de banco de imagens',
    'AI-generated decorative imagery without art direction': 'Imagens decorativas geradas por IA sem direção de arte',
    'Generic SaaS copy': 'Copy genérica de SaaS',
    'Meaningless statistics': 'Estatísticas sem sentido',
    'Giant headings with no structural purpose': 'Títulos gigantes sem propósito estrutural',
    'Excessive animation': 'Animação em excesso',
    'Oversized dashboard mockups': 'Mockups gigantes de dashboard',
    'Repetitive section layouts': 'Layouts de seção repetitivos',
    'Arbitrary abstract shapes': 'Formas abstratas arbitrárias',

    /* marquee (lowercase, duplicated set) */
    'generic hero + CTA + mockup': 'hero genérico + CTA + mockup',
    'card-inside-card layouts': 'layouts de card dentro de card',
    'random gradients': 'gradientes aleatórios',
    'decorative glassmorphism': 'glassmorphism decorativo',
    'badge spam': 'spam de badges',
    'meaningless statistics': 'estatísticas sem sentido',
    'floating blobs': 'blobs flutuantes',
    'generic SaaS copy': 'copy genérica de SaaS',
    'excessive pills': 'pills em excesso',
    'uniform card grids': 'grades de cards uniformes',

    /* ── §4 Motion & 3D ── */
    'Motion & 3D, with the packs': 'Motion e 3D, com os packs',
    'CSS still first. GSAP for motion, Three.js for 3D. The brief decides which.': 'CSS ainda primeiro. GSAP para motion, Three.js para 3D. O brief decide.',
    'GSAP for motion, Three.js for 3D. The brief decides which.': 'GSAP para motion, Three.js para 3D. O brief decide.',
    'REDLINE does not force animation — the dial sets the motion, and the brief sets the dial. Asked for animated? Everything that can carry feeling animates, GSAP, done right: transitions between pages, hero reveals, scroll reveals, marquee, parallax. Asked for 3D? Real Three.js — scene, geometry, light, assets, interaction. Asked for dry? Dry. GSAP is 100% free, including every plugin; Three.js is free and open source.': 'A REDLINE não força animação — o dial define o motion, e o brief define o dial. Pediu animado? Tudo que pode carregar sentimento anima, em GSAP, feito direito: transições entre páginas, reveals do hero, reveals de scroll, marquee, parallax. Pediu 3D? Three.js de verdade — cena, geometria, luz, assets, interação. Pediu seco? Seco. GSAP é 100% grátis, incluindo todos os plugins; Three.js é grátis e open source.',
    '· 3D — ONLY WHEN THE BRIEF ASKS': '· 3D — SÓ QUANDO O BRIEF PEDIR',

    /* gskills — index wording */
    'Single tweens, eases, staggers, defaults, matchMedia.': 'Tweens únicos, eases, staggers, defaults, matchMedia.',
    'Base layer — load this one for any GSAP work.': 'Camada base — carregue esta para qualquer trabalho GSAP.',
    'Sequences and choreography — position, nesting, playback.': 'Sequências e coreografia — posição, aninhamento, playback.',
    'Loads when animation must happen in an order.': 'Carrega quando a animação precisa acontecer em ordem.',
    'Scroll-linked, pinned, scrubbed sections.': 'Seções ligadas ao scroll, com pin e scrub.',
    'Loads when the page answers to the scroll.': 'Carrega quando a página responde ao scroll.',
    'React done right — useGSAP, refs, cleanup on unmount.': 'React feito do jeito certo — useGSAP, refs, cleanup no unmount.',
    'Loads when the stack is React / Next.js.': 'Carrega quando a stack é React / Next.js.',
    'Vue, Svelte and other frameworks — lifecycle & scoping.': 'Vue, Svelte e outros frameworks — ciclo de vida e escopo.',
    'Loads when the stack is not React.': 'Carrega quando a stack não é React.',
    'Loads when a tween needs a plugin.': 'Carrega quando um tween precisa de um plugin.',
    '60fps — transforms only, no layout thrash, will-change done right.': '60fps — só transforms, sem layout thrash, will-change bem feito.',
    'Loads when the animation must not jank.': 'Carrega quando a animação não pode travar.',
    'Math helpers — clamp, mapRange, snap, wrap, random, pipe.': 'Helpers de math — clamp, mapRange, snap, wrap, random, pipe.',
    'Loads when values need mapping, not magic numbers.': 'Carrega quando valores precisam de mapeamento, não números mágicos.',

    /* gskills — guide wording */
    'Any GSAP work starts here; matchMedia for reduced-motion.': 'Qualquer trabalho GSAP começa aqui; matchMedia para reduced-motion.',
    'Choreographed sequences — position parameter, nesting, playback.': 'Sequências coreografadas — parâmetro de posição, aninhamento, playback.',
    'Loads when order matters.': 'Carrega quando a ordem importa.',
    'Scroll-linked animation, pinning, scrub, triggers.': 'Animação ligada ao scroll, pinning, scrub, triggers.',
    'useGSAP hook, context, cleanup on unmount, refs.': 'Hook useGSAP, contexto, cleanup no unmount, refs.',
    'Loads on React / Next.js.': 'Carrega em React / Next.js.',
    'Vue, Svelte & co — lifecycle, scoping, onDestroy cleanup.': 'Vue, Svelte e cia — ciclo de vida, escopo, cleanup no onDestroy.',
    'Loads outside React.': 'Carrega fora do React.',
    'Loads when a tween needs a plugin — register once.': 'Carrega quando um tween precisa de um plugin — registre uma vez.',
    'Transforms only, no layout thrash, mindful will-change, 60fps.': 'Só transforms, sem layout thrash, will-change consciente, 60fps.',
    'Loads when it must not jank.': 'Carrega quando não pode travar.',

    'Scene, camera, renderer, Object3D hierarchy, coordinates.': 'Cena, câmera, renderer, hierarquia de Object3D, coordenadas.',
    'Scene, camera, renderer, Object3D hierarchy, coordinate systems.': 'Cena, câmera, renderer, hierarquia de Object3D, sistemas de coordenadas.',
    'Every 3D scene starts here.': 'Toda cena 3D começa aqui.',
    'Loads when the scene needs shape.': 'Carrega quando a cena precisa de forma.',
    'Loads when surfaces need a look.': 'Carrega quando as superfícies precisam de aparência.',
    'Texture types, UV mapping, environment maps, colour spaces.': 'Tipos de textura, mapeamento UV, environment maps, espaços de cor.',
    'Loads when the surface needs detail.': 'Carrega quando a superfície precisa de detalhe.',
    'Light types, shadows, environment light, lighting performance.': 'Tipos de luz, sombras, luz de ambiente, performance de iluminação.',
    'Loads when the scene needs depth.': 'Carrega quando a cena precisa de profundidade.',
    'Loads when stock materials are not enough.': 'Carrega quando os materiais prontos não bastam.',
    'Loads when there are assets to load.': 'Carrega quando há assets para carregar.',
    'Keyframes, skeletal animation, morph targets, mixing.': 'Keyframes, animação esquelética, morph targets, mixing.',
    'Loads when the scene moves.': 'Carrega quando a cena se move.',
    'Raycasting, controls, mouse/touch input, object selection.': 'Raycasting, controles, input de mouse/touch, seleção de objetos.',
    'Loads when the scene answers to the user.': 'Carrega quando a cena responde ao usuário.',
    'Loads when the frame needs a finish.': 'Carrega quando o frame precisa de acabamento.',

    /* motionrule chips */
    'Register plugins once': 'Registre plugins uma vez',
    'respects reduced-motion': ' respeita reduced-motion',
    'down for reduced-motion': ' desligado para reduced-motion',
    'No looping decoration': 'Sem decoração em loop',
    'Ask the dial first': 'Pergunte ao dial primeiro',
    '3D only when asked': '3D só quando pedir',
    'CSS before JS': 'CSS antes de JS',

    /* statement */
    'Remove': 'Remova',
    'before': 'antes de',
    'adding': 'adicionar',
    'THE REMOVAL TEST — if removing it changes nothing about understanding or interaction, remove it. The redline here is drawn by GSAP ScrollTrigger as you scroll — one scrub, one message, nothing else.': 'O TESTE DA REMOÇÃO — se remover não muda nada no entendimento ou na interação, remova. A redline aqui é desenhada pelo GSAP ScrollTrigger conforme você rola — um scrub, uma mensagem, nada mais.',
    'If removing it changes nothing about understanding or interaction, remove it.': 'Se remover não muda nada no entendimento ou na interação, remova.',

    /* ── §5 method ── */
    'The method': 'O método',
    'Seven phases, in order. Shape before code.': 'Sete fases, em ordem. Forma antes do código.',
    'Shape before code. The page is one composition.': 'Forma antes do código. A página é uma composição.',
    'Understand': 'Entender',
    'Shape': 'Modelar',
    'Establish': 'Estabelecer',
    'Build': 'Construir',
    'Refine': 'Refinar',
    'Audit': 'Auditar',
    'Distill': 'Destilar',
    'Product, user, task, content, constraints.': 'Produto, usuário, tarefa, conteúdo, restrições.',
    'Hierarchy, composition, navigation, interaction, responsive behaviour — before decorative details.': 'Hierarquia, composição, navegação, interação, comportamento responsivo — antes dos detalhes decorativos.',
    'Typography, colour, geometry, spacing, density, variance, motion.': 'Tipografia, cor, geometria, espaçamento, densidade, variância, motion.',
    'Semantic structure and reusable primitives.': 'Estrutura semântica e primitivas reutilizáveis.',
    'Hierarchy, spacing, typography, alignment, states, motion, responsive behaviour.': 'Hierarquia, espaçamento, tipografia, alinhamento, estados, motion, comportamento responsivo.',
    'Usability, accessibility, responsive behaviour, performance, consistency, content accuracy, visual hierarchy.': 'Usabilidade, acessibilidade, comportamento responsivo, performance, consistência, precisão de conteúdo, hierarquia visual.',
    'Remove anything that does not contribute. Do not add more because the page feels empty.': 'Remova tudo o que não contribui. Não adicione mais só porque a página parece vazia.',

    /* ── index installbox ── */
    '· ONE FILE': ' · UM ARQUIVO',
    'Drop it into your agent. That’s the whole install': 'Jogue no seu agente. A instalação é só isso',
    'REDLINE is a single markdown file. Your agent reads it like a manual, and every interface it designs from then on answers to the same discipline.': 'REDLINE é um único arquivo markdown. Seu agente o lê como um manual, e toda interface que ele desenhar a partir daí responde à mesma disciplina.',
    'ib.s1': 'Copie <code class="inline-code">REDLINE-SKILL.md</code> para <code class="inline-code">skills/redline/</code>',
    'ib.s2': 'Copie as <span class="red">8 skills de GSAP</span> e as <span class="red">10 skills de Three.js</span> para <code class="inline-code">skills/</code> e registre cada uma no índice',
    'ib.s3': 'Peça para desenhar algo — e veja a disciplina se redlinar sozinha',
    'Install & send to Hermes': 'Instalar e enviar ao Hermes',

    /* terminal (index) */
    '# skill + GSAP + Three.js packs': '# skill + packs GSAP + Three.js',
    '# register each in skills-index.md (one line each)': '# registre cada uma em skills-index.md (uma linha cada)',
    '# done. 19 skills live, 0 slop found.': '# pronto. 19 skills ativas, 0 slop encontrado.',
    'Terminal showing the Redline install commands': 'Terminal mostrando os comandos de instalação do Redline',

    /* ── colophon ── */
    'Set in': 'Tipografia',
    'Medium': 'Meio',
    'Liquid glass — requested by the product, used with restraint': 'Vidro líquido — pedido pelo produto, usado com contenção',
    'Radius': 'Raio',
    '22px on glass only — glass needs curvature to refract': '22px só no vidro — vidro precisa de curvatura para refratar',
    'Everything GSAP — page transitions, reveals, marquee, parallax, scrub; 3D = Three.js pack': 'Tudo em GSAP — transições de página, reveals, marquee, parallax, scrub; 3D = pack Three.js',
    'Content': 'Conteúdo',
    'The skill itself — nothing invented': 'A própria skill — nada inventado',
    'Status': 'Status',
    'v1.2 · packs GSAP + Three.js · transitions in': 'v1.2 · packs GSAP + Three.js · transições ativas',
    '— design discipline, not decoration': ' — disciplina de design, não decoração',
    '— nothing on this page was added to fill space': ' — nada nesta página foi adicionado para preencher espaço',
    '— one zip, any agent, every interface': ' — um zip, qualquer agente, toda interface',

    /* ── guide: masthead ── */
    'FIELD GUIDE № 01': 'GUIA DE CAMPO № 01',
    '· v1.2 · WORKING DRAFT': ' · v1.2 · RASCUNHO DE TRABALHO',
    'The full discipline,': 'A disciplina completa,',
    'on one page': 'em uma página',
    'Every rule below obeys the discipline. Nothing on this page was added to fill space.': 'Toda regra abaixo obedece à disciplina. Nada nesta página foi adicionado para preencher espaço.',
    '13 rules': '13 regras',
    '26 anti-patterns': '26 anti-padrões',
    '7 steps': '7 passos',
    '2 gates': '2 portões',
    '0 invented facts': '0 fatos inventados',
    'Edition': 'Edição',
    'Field guide № 01': 'Guia de campo № 01',
    'Subject': 'Assunto',
    'Web interface design': 'Design de interfaces web',
    'Working draft': 'Rascunho de trabalho',
    'The skill text itself': 'O próprio texto da skill',

    /* guide §1 */
    'The standard': 'O padrão',
    'The core principle. Everything below follows from this.': 'O princípio central. Tudo abaixo decorre dele.',
    'Design from the product, the task, the content, the brand, the environment, the interaction — not from a collection of fashionable UI patterns.': 'Desenhe a partir do produto, da tarefa, do conteúdo, da marca, do ambiente, da interação — não de uma coleção de padrões de UI da moda.',
    'Every significant visual decision must have a reason. No job, no place.': 'Toda decisão visual significativa precisa de um motivo. Sem função, sem lugar.',
    'What should the user notice first, second, third? Design around that order.': 'O que o usuário deve notar primeiro, segundo, terceiro? Desenhe em torno dessa ordem.',
    'Still correct with another company’s logo and copy? Then it is too generic.': 'Ainda correto com o logo e o copy de outra empresa? Então é genérico demais.',

    /* guide §2 product */
    'Know the product': 'Conheça o produto',
    'Fact discipline. Missing content is a constraint, not a licence to decorate.': 'Disciplina de fatos. Conteúdo ausente é uma restrição, não uma licença para decorar.',
    'Before designing, determine the minimum necessary product truth. Answer these seven questions:': 'Antes de desenhar, determine a verdade mínima necessária do produto. Responda a estas sete perguntas:',
    'What is the product?': 'O que é o produto?',
    'Who is using it?': 'Quem está usando?',
    'What is the primary user goal?': 'Qual é o objetivo principal do usuário?',
    'What action matters most?': 'Qual ação importa mais?',
    'What information needs the most attention?': 'Qual informação precisa de mais atenção?',
    'What makes this product different?': 'O que torna este produto diferente?',
    'What constraints exist?': 'Quais restrições existem?',
    'Do not invent': 'Não invente',
    'statistics · customers · testimonials · reviews · partnerships · features · capabilities · claims · product metrics': 'estatísticas · clientes · depoimentos · avaliações · parcerias · recursos · capacidades · alegações · métricas do produto',
    'If information is missing, design around what is actually known. Do not compensate for missing content by adding decorative UI.': 'Se faltar informação, desenhe em torno do que é realmente conhecido. Não compense conteúdo ausente adicionando UI decorativa.',

    /* guide §5 tests */
    'The two gates': 'Os dois portões',
    'Both run before shipping. No exceptions.': 'Ambos rodam antes do envio. Sem exceções.',
    'Gate 01 · Removal': 'Portão 01 · Remoção',
    'Gate 02 · Template': 'Portão 02 · Template',
    'If I remove this, does the product become harder to understand, use, navigate, or recognize?': 'Se eu remover isto, o produto fica mais difícil de entender, usar, navegar ou reconhecer?',
    'If no — remove it. For every unusual element, the same question: what specific product reason justifies this? No good answer, do not add it.': 'Se não — remova. Para cada elemento incomum, a mesma pergunta: que motivo específico de produto justifica isto? Sem boa resposta, não adicione.',
    'Replace the logo and copy with another company’s. Does it still feel correct?': 'Troque o logo e o copy de outra empresa. Ainda parece correto?',
    'If yes, the design is too generic. Do not fix with decoration — change composition, typography, hierarchy, interaction, content structure, visual language.': 'Se sim, o design é genérico demais. Não conserte com decoração — mude composição, tipografia, hierarquia, interação, estrutura de conteúdo, linguagem visual.',

    /* guide §6 lead — data-i18n="g6.lead" */
    'g6.lead':
      'Os dials são definidos pela tarefa — e o brief define os dials. Pediu animação, a REDLINE entrega as oito skills oficiais de GSAP e o padrão de transição de página para a implementação sair correta: com scrub, registrada uma vez, com cleanup no unmount, respeitando <code class="inline-code">prefers-reduced-motion</code>. Pediu 3D, entrega as dez skills oficiais de Three.js para cenas reais. Esta própria página redline a frase acima com um ScrollTrigger com scrub — e cada link entre páginas atravessa o overlay de transição.',

    /* guide §8 rules + maxim — data-i18n="maxim" */
    'The final rules': 'As regras finais',
    'Adjectives are not goals. They arrive on their own — or not at all.': 'Adjetivos não são metas. Eles chegam sozinhos — ou não chegam.',
    'Optimize for': 'Otimize para',
    'Never optimize for': 'Nunca otimize para',
    'Clarity': 'Clareza',
    'Hierarchy': 'Hierarquia',
    'Usability': 'Usabilidade',
    'Identity': 'Identidade',
    'Consistency': 'Consistência',
    'Intentionality': 'Intencionalidade',
    'Product truth': 'Verdade do produto',
    'Modern': 'Moderno',
    'Beautiful': 'Bonito',
    'Futuristic': 'Futurista',
    'Trendy': 'Da moda',
    'Clean': 'Limpo',
    'maxim':
      'Específico <span class="cmp">&gt;</span> genérico. \u00A0Propósito <span class="cmp">&gt;</span> decoração. \u00A0Hierarquia <span class="cmp">&gt;</span> espetáculo. \u00A0Identidade de produto <span class="cmp">&gt;</span> template. \u00A0Implementação simples <span class="cmp">&gt;</span> complexidade desnecessária. \u00A0Remova antes de adicionar.',

    /* ── install page ── */
    '· ONE FILE · NO DEPENDENCIES': ' · UM ARQUIVO · SEM DEPENDÊNCIAS',
    'Copy a file. Redline everything after': 'Copie um arquivo. Redline tudo depois',
    'REDLINE installs anywhere an agent can read markdown. Skip only the steps that do not apply to your setup — the file does the heavy lifting either way.': 'REDLINE instala em qualquer lugar onde um agente lê markdown. Pule apenas os passos que não se aplicam ao seu setup — o arquivo faz o trabalho pesado de qualquer forma.',
    'sec.install': 'Instalação',
    'Three steps. The first one is downloading the file.': 'Três passos. O primeiro é baixar o arquivo.',
    'Get the pack': 'Pegue o pack',
    'd1.p':
      '<code class="inline-code">redline-gsap.zip</code> — a disciplina mais os dois packs: oito skills oficiais de GSAP e dez skills oficiais de Three.js, prontos para encaixar. Markdown puro, nada para buildar. Ou pegue apenas o arquivo da skill da sua instalação do opencode em <code class="inline-code">~/.config/opencode/skills/redline/SKILL.md</code>.',
    'Just REDLINE-SKILL.md': 'Só o REDLINE-SKILL.md',
    'Put it in the agent’s skills folder': 'Coloque na pasta de skills do agente',
    'd2.p': 'Qualquer agente que carregue arquivos <code class="inline-code">SKILL.md</code> funciona. Exemplos:',
    '# discipline + GSAP + Three.js packs': '# disciplina + packs GSAP + Three.js',
    '# register each in the lazy-load index (one line):': '# registre cada uma no índice lazy-load (uma linha):',
    '→ add rows': '→ adicione linhas',
    'd2.p2':
      'Para outros agentes — Claude Code, Hermes, Cursor, pipelines custom — mesma ideia: <code class="inline-code">REDLINE-SKILL.md</code> vai para onde o agente lê seus documentos de skill, e cada pasta <code class="inline-code">skills/gsap-*</code> e <code class="inline-code">skills/threejs-*</code> segue a mesma regra. Se o agente aceita prompts em markdown puro, cole o conteúdo do arquivo diretamente — a disciplina não precisa de runtime.',
    'Restart the session (one time)': 'Reinicie a sessão (uma vez)',
    'Skills are discovered when the agent session starts. After that, just start any design task — the agent loads the discipline when the task matches its description.': 'Skills são descobertas quando a sessão do agente começa. Depois disso, basta iniciar qualquer tarefa de design — o agente carrega a disciplina quando a tarefa corresponde à descrição dela.',
    'Anything you can put a SKILL.md in, REDLINE works in.': 'Em qualquer lugar onde você possa colocar um SKILL.md, a REDLINE funciona.',
    '· SAME FILE': ' · MESMO ARQUIVO',
    'One pack, both agents': 'Um pack, dois agentes',
    'You do not need a different version for Hermes. Send the same zip:': 'Você não precisa de uma versão diferente para o Hermes. Envie o mesmo zip:',
    'hs1': '<code class="inline-code">redline-gsap.zip</code> — REDLINE + 8 skills de GSAP + 10 de Three.js, um único arquivo (também em <code class="inline-code">~/Downloads</code>)',
    'hs2': 'Descompacte na pasta de skills do Hermes — <code class="inline-code">redline/SKILL.md</code> + <code class="inline-code">gsap-*/SKILL.md</code> + <code class="inline-code">threejs-*/SKILL.md</code>',
    'hs3': 'Registre cada skill no índice dela (se houver), e reinicie a sessão',
    'Terminal showing what to send to Hermes': 'Terminal mostrando o que enviar ao Hermes',
    '# send this': '# envie isto',
    '· 19 skills inside': ' · 19 skills dentro',
    '# then one instruction:': '# depois, uma instrução:',
    '“Install REDLINE plus its GSAP and Three.js packs. REDLINE is': '“Instale a REDLINE e seus packs de GSAP e Three.js. A REDLINE é',
    'a design discipline: read it before any interface': 'uma disciplina de design: leia antes de qualquer interface',
    'design, and apply its gates to every result —': 'de design, e aplique seus portões a todo resultado —',
    'motion and 3D included.”': 'motion e 3D incluídos.”',
    'Verify it took': 'Verifique se pegou',
    'The discipline proves itself on the first job.': 'A disciplina se prova no primeiro trabalho.',
    'Sanity prompt': 'Prompt de sanidade',
    '“Design a landing page for my product. Use the REDLINE discipline.”': '“Desenhe uma landing page para o meu produto. Use a disciplina REDLINE.”',
    'In working order, the agent will ask about your product before touching CSS — and will refuse to invent testimonials, stats, or features you did not provide.': 'Em pleno funcionamento, o agente vai perguntar sobre o seu produto antes de tocar no CSS — e vai se recusar a inventar depoimentos, stats ou funcionalidades que você não forneceu.',
    'Tell-tale': 'Sinal revelador',
    'It asks the seven product questions before the first pixel': 'Ele faz as sete perguntas do produto antes do primeiro pixel',
    'If it immediately starts writing cards and gradients, it did not load the skill. Check the skills folder and index, restart, and try again.': 'Se ele já começa escrevendo cards e gradientes, a skill não carregou. Verifique a pasta e o índice de skills, reinicie e tente de novo.',
  };

  const PAGES = {
    'index.html': {
      title: {
        en: 'REDLINE — Design that could only belong to its product',
        pt: 'REDLINE — Design que só poderia pertencer ao seu produto',
      },
      desc: {
        en: 'REDLINE is a design discipline skill — one SKILL.md file that keeps AI-generated interfaces intentional, coherent, and human. Drop it into any agent.',
        pt: 'REDLINE é uma skill de disciplina de design — um arquivo SKILL.md que mantém interfaces geradas por IA intencionais, coerentes e humanas. Coloque em qualquer agente.',
      },
    },
    'guide.html': {
      title: { en: 'The Field Guide — REDLINE', pt: 'O Guia de Campo — REDLINE' },
      desc: {
        en: 'The complete REDLINE field guide: the standard, product truth, the three dials, the removal catalogue, the gates, and the seven-phase method.',
        pt: 'O guia de campo completo da REDLINE: o padrão, a verdade do produto, os três dials, o catálogo de remoção, os portões e o método em sete fases.',
      },
    },
    'install.html': {
      title: { en: 'Install — REDLINE', pt: 'Instalar — REDLINE' },
      desc: {
        en: 'Install the REDLINE design discipline skill into opencode, Claude, Hermes, or any agent that reads SKILL.md files.',
        pt: 'Instale a skill de disciplina de design REDLINE no opencode, Claude, Hermes ou qualquer agente que leia arquivos SKILL.md.',
      },
    },
  };

  /* Snapshot node → original string (innerHTML for elements / nodeValue for text). */
  const snap = new Map();

  const applyLang = (next) => {
    lang = next;
    try { localStorage.setItem(STORE, lang); } catch {}
    const root = document.documentElement;
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    root.setAttribute('data-rl-lang', lang);

    if (lang === 'pt') {
      /* 1. mixed-markup elements — full innerHTML swap */
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const pt = PT[el.getAttribute('data-i18n')];
        if (!pt) return;
        if (!snap.has(el)) snap.set(el, el.innerHTML);
        el.innerHTML = pt;
      });

      /* 2. aria attributes (data-i18n-attr="attrname") */
      document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        const attr = el.getAttribute('data-i18n-attr');
        const enVal = el.getAttribute(attr);
        if (!enVal || !PT[enVal]) return;
        if (!snap.has(el)) snap.set(el, { attr, val: enVal });
        el.setAttribute(attr, PT[enVal]);
      });

      /* 3. plain text nodes — exact trimmed match */
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest('code, pre, script, style, [data-i18n]')) return NodeFilter.FILTER_REJECT;
          const t = node.nodeValue.trim();
          return t && PT[t] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const trimmed = node.nodeValue.trim();
        if (!snap.has(node)) snap.set(node, node.nodeValue);
        node.nodeValue = node.nodeValue.split(trimmed).join(PT[trimmed]);
      });
    } else {
      /* restore EN from snapshots */
      const entries = [...snap.entries()];
      snap.clear();
      entries.forEach(([node, orig]) => {
        if (orig && typeof orig === 'object') {
          node.setAttribute(orig.attr, orig.val);
        } else if (node.nodeType === Node.TEXT_NODE) {
          node.nodeValue = orig;
        } else {
          node.innerHTML = orig;
        }
      });
    }

    /* document title + meta description */
    const page = (location.pathname.split('/').pop() || 'index.html');
    const doc = PAGES[page] || PAGES['index.html'];
    if (doc) {
      document.title = doc.title[lang];
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', doc.desc[lang]);
    }

    /* language button state */
    const btn = document.getElementById('langBtn');
    if (btn) {
      btn.classList.toggle('is-pt', lang === 'pt');
      btn.classList.toggle('is-en', lang === 'en');
      const code = btn.querySelector('[data-langcode]');
      if (code) code.textContent = lang === 'pt' ? 'PT' : 'EN';
      btn.setAttribute('aria-label', lang === 'pt' ? 'Mudar para inglês' : 'Mudar para português');
    }

    if (hasGsap) ScrollTrigger.refresh();
  };

  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => applyLang(lang === 'pt' ? 'en' : 'pt'));
  }

  applyLang(lang); // keep chosen language across pages (localStorage)

  /* ── Page transitions ───────────────────────────────────────── */
  const overlay = document.querySelector('.pagefx');
  const word = overlay && overlay.querySelector('.pagefx__word');
  const entering = sessionStorage.getItem(FLAG) === '1';
  sessionStorage.removeItem(FLAG);
  let leaving = false;

  if (overlay && entering && canFx) {
    gsap.set(overlay, { visibility: 'visible', scaleY: 1 });
    gsap.set(word, { opacity: 0 });
    gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { visibility: 'hidden' });
        ScrollTrigger.refresh();
      },
    })
      .to(word, { opacity: 1, duration: 0.16, ease: 'power1.out' }, 0)
      .to(overlay, { scaleY: 0, duration: 0.55, ease: 'expo.inOut' }, 0.1);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (a.hasAttribute('download') || a.target === '_blank' || href.startsWith('#')) return;
    if (/^(https?:)?\/\//.test(href) || /^(mailto:|tel:)/.test(href)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    let url;
    try { url = new URL(href, location.href); } catch { return; }
    if (url.origin !== location.origin) return;

    if (url.pathname === location.pathname) {
      if (!url.hash) {
        e.preventDefault(); // same page, no anchor → smooth return to top
        document.documentElement.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
      return; // same-page anchors keep native behaviour (CSS smooth-scroll)
    }

    if (!canFx) return; // no GSAP or reduced motion → plain navigation

    e.preventDefault();
    if (leaving) return;
    leaving = true;
    sessionStorage.setItem(FLAG, '1');
    gsap.set(overlay, { visibility: 'visible' });
    const tl = gsap.timeline({ onComplete: () => { window.location.href = url.href; } });
    tl.to('main', { opacity: 0, y: -30, duration: 0.34, ease: 'power2.in' }, 0)
      .to('.topbar', { opacity: 0, yPercent: -130, duration: 0.3, ease: 'power2.in' }, 0)
      .to(word, { opacity: 1, duration: 0.18, ease: 'power1.out' }, 0.1)
      .to(overlay, { scaleY: 1, duration: 0.42, ease: 'expo.inOut' }, 0.08);
  });

  /* ── Entrances (hero / masthead / install-hero) ─────────────── */
  const heroStart = entering && canFx ? 0.22 : 0;
  if (canFx) {
    gsap.utils.toArray('.hero, .masthead, .install-hero').forEach((zone) => {
      gsap.from(zone.querySelectorAll('h1, .eyebrow, .sub, .hero__cta, .hero__meta, .guidemeta'), {
        y: 26, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.07, delay: heroStart, overwrite: true,
      });
    });
    // parallax-wrapped pieces fade in without touching their y (parallax owns it)
    document.querySelectorAll('.hero__stage, .masthead__meta').forEach((el) => {
      gsap.from(el, { opacity: 0, duration: 0.7, delay: heroStart });
    });
  }

  /* ── Scroll reveals ───────────────────────────────────────────
     Elements are pre-hidden so they never look "normal" before
     scrolling; the batch then animates them slightly AFTER the
     element enters the viewport (REVEAL.delay) — the "delayzinho". */
  const revealSel = '.sec__head, .sec__lead, .standard, .dial, .gskill, .test, .dstep, .phases__row, .catalogue-grid > div, .motionrule, .installbox, .maxim, .rules, .principles__row, .questions, .stamp';
  const revealEls = hasGsap ? gsap.utils.toArray(revealSel) : [];
  if (canFx && revealEls.length) {
    gsap.set(revealEls, { opacity: 0, y: 28 });
    ScrollTrigger.batch(revealEls, {
      start: REVEAL.start,
      once: true,
      onEnter: (batch) => gsap.to(batch, {
        y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
        delay: REVEAL.delay, stagger: 0.06, overwrite: true,
      }),
    });
  }

  /* ── The scrubbed redline statement ─────────────────────────── */
  const words = [...document.querySelectorAll('.s-word')];
  const stmt = document.querySelector('.statement');
  if (words.length && stmt) {
    if (canFx) {
      gsap.timeline({
        scrollTrigger: { trigger: stmt, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
      })
        .to(words, { '--line': 1, stagger: 0.22, ease: 'none' }, 0)
        .to(words, { color: '#FF6A4D', stagger: 0.22, ease: 'none' }, 0);
    } else {
      stmt.classList.add('statement--manual'); // static redlines: informative, no motion
    }
  }

  /* ── Marquee (GSAP-owned loop; static without motion) ───────── */
  const track = document.querySelector('.marquee__track');
  if (track && canFx) {
    const zone = track.closest('.marquee') || track;
    const tween = gsap.to(track, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });
    const pause = () => tween.pause();
    const play = () => tween.play();
    zone.addEventListener('mouseenter', pause);
    zone.addEventListener('mouseleave', play);
  }

  /* ── Aurora core drift (GSAP; pseudo-layers keep CSS) ───────── */
  const core = document.querySelector('.aura__core');
  if (core && canFx) {
    gsap.to(core, { y: 56, scale: 1.06, duration: 11, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }

  /* ── Parallax: hero stage & masthead (desktop only) ─────────── */
  if (canFx && window.innerWidth > 760) {
    const stage = document.querySelector('.hero__stage');
    if (stage) {
      gsap.fromTo(stage, { y: 0 }, {
        y: -44, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
      });
    }
    const mast = document.querySelector('.masthead__grid');
    if (mast) {
      gsap.fromTo(mast, { y: 0 }, {
        y: -32, ease: 'none',
        scrollTrigger: { trigger: '.masthead', start: 'top top', end: 'bottom top', scrub: 0.5 },
      });
    }
  }

  /* ── State only: progress bar + section spy ─────────────────── */
  const bar = document.getElementById('progressBar');
  const spy = [...document.querySelectorAll('[data-spy]')];
  const links = [...document.querySelectorAll('.topnav a[href^="#"]')];

  const onScroll = () => {
    const doc = document.documentElement;
    if (bar && !reduced) {
      const total = doc.scrollHeight - doc.clientHeight;
      bar.style.transform = `scaleX(${total > 0 ? clamp(doc.scrollTop / total, 0, 1) : 0})`;
    }
    if (spy.length && links.length) {
      const probe = doc.scrollTop + doc.clientHeight * 0.35;
      let current = null;
      for (const el of spy) {
        if (el.offsetTop <= probe) current = el;
        else break;
      }
      links.forEach((a) => {
        const on = !!current && a.getAttribute('href') === `#${current.id}`;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', () => { if (hasGsap) ScrollTrigger.refresh(); });

  /* debug/test hook */
  window.__rl = {
    get lang() { return lang; },
    reveal: REVEAL,
    setLang: (l) => applyLang(l === 'pt' ? 'pt' : 'en'),
  };
})();