# REDLINE — site oficial da skill

Sistema de 3 páginas para divulgar a skill **REDLINE** (ex-"Slopless Site
Design"), em **liquid glass**, com os **packs GSAP** (motion) e **Three.js**
(3D) oficiais integrados. O site inteiro é vivo: transições entre páginas,
entrances, reveals, marquee, parallax e scrub — tudo com GSAP, sempre com
fallback estático completo.

## Páginas

| Página | Conteúdo |
| --- | --- |
| `index.html` | Landing — hero com skill card de vidro, "the standard" (5 comparações), 3 dials, catálogo de remoção (marquee), **motion & 3D packs** (8 GSAP + 10 Three.js), method (7 fases), CTA de instalação com terminal |
| `guide.html` | Field guide completo — §1–§8: standard, product truth (carimbo DO NOT INVENT), dials, catálogo 26 itens, gates, **motion & 3D packs**, method, regras finais |
| `install.html` | Instalação passo a passo (opencode, Hermes, Claude) + download do pacote |

## Sistema compartilhado

- `styles.css` — tokens, liquid glass (`.glass` + estados idle/hover/active do `.langbtn`), aurora + grain, marquee, terminal, seção de packs, **overlay de transição** (`.pagefx`), responsive, reduced-motion
- `script.js` — o motor animado (GSAP):
  - **page transitions** entre as 3 páginas — sweep do overlay vermelho com wordmark `REDLINE`; saída (conteúdo some + painel fecha) e entrada (painel abre + conteúdo entra);
  - **entrances** de hero/masthead/install-hero (stagger);
  - **reveals** no scroll via `ScrollTrigger.batch` — elementos pré-escondidos (`opacity:0`) antes do scroll, animam **um pouco depois** de entrar na viewport (`start: 'top 84%'`, `delay: 0.18`, `once` por entrada); cards com stagger;
  - **marquee** com loop GSAP (xPercent, pausa no hover);
  - **statement** "Remove before adding." riscada de vermelho por **ScrollTrigger scrub**;
  - **parallax** do skill card / masthead + deriva da aurora;
  - progresso de leitura + scrollspy (estado, sem movimento).
- favicon novo: **uma linha vermelha** (SVG data-URI inline) nas 3 páginas — substitui o antigo "RED>"
- **Idioma EN ⇄ PT** — botão de vidro líquido (`.langbtn`) no topbar com bandeiras EUA/Brasil: mostra a bandeira dos EUA primeiro; ao ativar, troca para a bandeira do Brasil e traduz o site inteiro para PT-BR (toggle de volta para EN). Detalhes:
  - Motor em `script.js`: `data-i18n` (innerHTML completo PT) para elementos com markup misto; `data-i18n-attr` para atributos (`aria-label`, `<html lang>`, `<title>`/meta por página via mapa `PAGES`); plain text via TreeWalker casando o texto exato (ignora `code/pre/script/style/[data-i18n]`).
  - Conteúdo técnico fica canônico (nomes de skills GSAP/Three.js, IDs, código, `REDLINE-SKILL.md`, dials "Motion/Density") — só o copy do site traduz.
  - Persistência em `localStorage['rl-lang']`; sobrevive a reload e navegação entre páginas; `ScrollTrigger.refresh()` após o swap; reverter para EN restaura o HTML original (snapshots).
  - `window.__rl = { lang, reveal, setLang }` exposto para testes.
- `vendor/` — `gsap.min.js` + `ScrollTrigger.min.js` **3.13.0** locais (offline, sem CDN); arquivos minificados do GSAP, sob a licença da GreenSock (greensock.com/licensing)
- `REDLINE-SKILL.md` — a skill **v1.2** (packs GSAP + Three.js, philosophy "the brief is the law"), servida para download
- `redline-gsap.zip` — REDLINE + **18 skills** (8 GSAP + 10 Three.js), pacote para qualquer agente (também em `~/Downloads/redline-gsap.zip`)

## Créditos

REDLINE agrega e consolida bases existentes — crédito integral a seus autores
e comunidades:

- **impeccable** — skill de design/redesign de interfaces (web, produtos, design systems): o DNA de refinamento, crítica e polimento de UI do REDLINE.
- **tasteskill (design-taste-frontend)** — skill anti-slop para landing pages, portfólios e redesigns: a origem da disciplina contra interfaces genéricas.
- **GSAP (8 skills oficiais)** — o pacote oficial de motion embutido: core, timeline, scrolltrigger, react, frameworks, plugins, performance, utils.
- **Three.js (10 skills oficiais)** — o pacote oficial de 3D embutido: fundamentals, geometry, materials, textures, lighting, shaders, loaders, animation, interaction, postprocessing.

O site e a skill foram escritos do zero sobre essas bases — a execução é original.

## Como o sistema degrada (regras da própria skill)

- **Sem GSAP (JS bloqueado/erro):** navegação por links normais, statement
  estática com linhas desenhadas (`statement--manual`), marquee parado,
  conteúdo 100% visível — zero movimento, zero quebra.
- **`prefers-reduced-motion`:** mesma coisa — navegação direta (sem overlay),
  nada de entrance/reveal/marquee/parallax/scrub; o botão de idioma mantém o
  toggle funcional mas sem animações (deriva `glassIdle` desligada).
- **Transição cancelável:** links externos, `title="_blank"`, `download` e
  âncoras `#` nunca são interceptados; `sessionStorage` passa o estado da
  entrada e é consumido uma única vez.

## Packs na skill (v1.2)

- **GSAP (8):** core, timeline, scrolltrigger, react, frameworks, plugins, performance, utils.
- **Three.js (10):** fundamentals, geometry, materials, textures, lighting, shaders, loaders, animation, interaction, postprocessing.
- **O brief manda:** pediu animado → GSAP em tudo (transições, reveals, marquee); pediu 3D → Three.js de verdade; pediu seco → seco. A disciplina polida a execução, nunca sobrepõe o pedido.

## SEO / descoberta no Google

URL canônica ativa: **`https://klcombr.github.io/redline/`** (GitHub Pages —
deploy automático via `git push`, sem custo).

> **Nota Netlify:** o deploy `redline-skill.netlify.app` está **congelado na
> versão antiga** porque a conta Netlify está com a cota de build esgotada
> (`Skipped due to account credit usage exceeded`). Quando a cota voltar (reset
> mensal ou crédito pago), o reverter para a canônica Netlify é só trocar o
> domínio em 3 lugares: no `canonical` + `og:url`/`og:image`/`twitter:image` dos
> 3 HTMLs, e nas URLs de `sitemap.xml`/`robots.txt` (o repo já esteve nessa
> config — commit `0ac653b`).

- **On-page** — `title`/`description` únicas por página; `canonical`; `meta robots`
  (`index, follow, max-image-preview:large`); `theme-color`; `author`.
- **Open Graph + Twitter Cards** — `og-image.png` (1200×630 gerado com a marca:
  fundo `#05060A`, wordmark Fraunces, linha vermelha, tagline e URL), com
  `og:locale` `en_US` + `og:locale:alternate` `pt_BR`.
- **Dados estruturados (JSON-LD)** — `WebSite` + `Organization` (publisher) em
  todas as páginas; `SoftwareApplication` (a skill, gratuita, MIT) na landing;
  `Article`/`WebPage` + `BreadcrumbList` no guide; `HowTo` (3 passos) em `install.html`.
- **`sitemap.xml`** — as 3 URLs (home 1.0, guide/install 0.9) com `lastmod`.
- **`robots.txt`** — permite tudo e aponta para o sitemap.
- **Favicons** — SVG data-URI (linha vermelha) + `apple-touch-icon.png` (180×180)
  para iOS.
- **Idioma** — o site é uma URL só com toggle EN⇄PT em JS (conteúdo EN padrão,
  indexado); por isso não há `hreflang`, mas o par de locale está declarado via OG.

### Search Console (pendente — passo manual de 2 min)

O Google **não permite criar propriedade via API**; a conta GSC conectada no
Composio (`google_search_console_usure-ajava`) já tem `klcom.netlify.app` e
`cognis-beta.vercel.app` verificadas, mas não a URL do site. Para ativar:

1. Abrir [Search Console](https://search.google.com/search-console) com a conta
   conectada → **Adicionar propriedade** → prefixo de URL →
   `https://klcombr.github.io/redline/` → método **arquivo HTML**.
2. Copiar o nome do arquivo gerado (`google<token>.html`) e me passar.
3. Eu adiciono o arquivo na raiz do repo, faço push (o Pages publica
   automaticamente) → você clica em **Verificar**.
4. Aí eu finalizo via Composio: `SUBMIT_SITEMAP` + `GOOGLE_SEARCH_CONSOLE_INSPECT_URL`
   nas 3 páginas + `LIST_SITEMAPS` para confirmar saúde.

## Rodar

```sh
python3 -m http.server 8742   # em ~/redline  (8743 serve capturas de teste em /tmp/opencode/fx-shots)
```