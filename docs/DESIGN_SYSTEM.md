# hezina.cz — Design System (MASTER)

> Jediný zdroj pravdy pro vzhled. Tokeny žijí jako CSS custom properties
> v `src/styles/global.css` (`:root` + `:root[data-theme="dark"]`) a jsou
> vystavené jako Tailwind v4 utility přes `@theme` blok ve stejném souboru —
> žádný `tailwind.config.js`. Komponenty berou barvy/fonty/spacing přes tyto
> tokeny (Tailwind třídy jako `bg-bg`, `text-ink`, `font-sans`, `rounded-lg`),
> nikdy natvrdo.
>
> Vše níž je **1:1 extrakce ze stávajícího `styles.css`** živého webu —
> nic se nevymýšlí, jen se přepisuje zápis pro Tailwind v4.

## Esence značky

Jan Hezina — diagnostika a AI pro malé a střední firmy. Hlavní kompetence je
umět přečíst systém a najít, kde se to reálně láme; "Jarvis" je až popis
toho, co se staví *poté*, co diagnostika potvrdí, že to dává smysl (viz
pozicování v `/CLAUDE.md`). Věcné, no-nonsense, důvěryhodné. Konkrétní čísla
a příklady místo buzzwordů ("transformace", "disrupce", "synergie" — viz
sekce `NoBS`). Systém, ne kouzlo.

## Barvy (tokeny)

Světlý režim výchozí, tmavý přes `:root[data-theme="dark"]` (přepínač v Nav +
`prefers-color-scheme` fallback, iniciováno inline scriptem v `<head>` proti FOUC).

| Token | Light (`oklch`) | Dark (`oklch`) | Použití |
|---|---|---|---|
| `--bg` / `bg-bg` | `0.992 0.003 250` | `0.16 0.012 255` | hlavní pozadí stránky |
| `--bg-soft` / `bg-bg-soft` | `0.972 0.006 250` | `0.20 0.014 255` | pozadí `.section--soft` |
| `--bg-card` / `bg-bg-card` | `1 0 0` | `0.22 0.016 255` | karty, panely |
| `--ink` / `text-ink` | `0.18 0.022 255` | `0.96 0.005 250` | primární text, nadpisy |
| `--ink-soft` / `text-ink-soft` | `0.42 0.018 255` | `0.78 0.01 250` | sekundární text |
| `--ink-mute` / `text-ink-mute` | `0.58 0.014 255` | `0.62 0.012 250` | terciární text, popisky |
| `--line` / `border-line` | `0.91 0.008 255` | `0.30 0.018 255` | jemné bordery |
| `--line-strong` / `border-line-strong` | `0.84 0.012 255` | `0.38 0.020 255` | výraznější bordery |
| `--blue` / `text-blue` `bg-blue` | `0.48 0.14 252` | `0.72 0.14 240` | primární accent (CTA, odkazy, aktivní stavy) |
| `--blue-deep` / `bg-blue-deep` | `0.36 0.13 254` | `0.78 0.13 235` | hover primárního CTA |
| `--blue-soft` / `bg-blue-soft` | `0.94 0.025 252` | `0.28 0.06 252` | jemné pozadí (chip, badge) |
| `--blue-glow` | `0.78 0.12 230` | `0.78 0.14 230` | eyebrow tečka, kontaktní accent |

**Pravidlo:** nová barva nevzniká ad-hoc v komponentě. Chybí-li token, přidej ho
sem nejdřív a zdůvodni proč — nehardcoduj `oklch()`/hex přímo do `.astro` souboru.

## Typografie

Google Fonts, tři rodiny (na rozdíl od BoHeMi-web má tenhle web sans + serif +
mono kombinaci — je to záměrná součást stávajícího designu, nešaháme na to):

- **`--font-sans` = Geist** (400/500/600/700) — vše základní: nadpisy, body text, UI
- **`--font-serif` = Instrument Serif** (italic) — třída `.serif`, jen akcentová
  slova v nadpisech a citace (`Editorial`, `MagicVsOps` divider "vs.")
- **`--font-mono` = JetBrains Mono** (400/500) — třída `.mono`, labely, čísla,
  časové značky, tab tagy

**Škála (desktop, `clamp()` pro responzivitu):**
- h1: `clamp(40px, 6.4vw, 76px)`, line-height 1.02, letter-spacing -0.035em, weight 600
- h2: `clamp(30px, 4.2vw, 50px)`, line-height 1.08, letter-spacing -0.028em
- h3: `clamp(20px, 2.2vw, 24px)`, line-height 1.25, letter-spacing -0.018em
- body: 17px / line-height 1.55

## Spacing & layout

- `--container-page: 1180px` — max šířka obsahu (třída `.container`, `mx-auto` + `clamp(20px,4vw,48px)` padding)
- Vertikální rytmus sekcí: `.section { padding-block: clamp(72px, 11vw, 144px) }`
- Radius: `--radius-sm: 8px` (malé prvky), `--radius-md: 14px` (karty), `--radius-lg: 22px` (velké panely, hero card)

## Komponentové vzory

- **Primární CTA** (`.btn--primary` / `.btn--blue`): `bg-blue` pozadí, bílý/cream text, pill nebo `radius-md`, hover `bg-blue-deep`, šipka `→` jako suffix span.
- **Ghost tlačítko** (`.btn--ghost`): outline `border-line-strong`, transparentní pozadí, hover tmavší border.
- **Eyebrow label**: malý mono/uppercase label s tečkou (`<span class="dot">`) v `--blue-glow`, nad každým `<h2>` sekce.
- **Section head**: eyebrow → h2 → krátký lead odstavec, `text-ink-soft`, max ~60ch šířka.
- **Tab/pill přepínače** (Services, Cases): aktivní stav `border-blue` + `box-shadow` glow, neaktivní `border-line`.
- **Karta** (`.price-card`, `.jarvis-card`, `.benefit-preview`): `bg-bg-card`, `border-line`, `radius-lg`, jemný stín.
- Ikony: inline SVG (stroke, `currentColor`), ne emoji, ne ikonový font.

## Pohyb

Decentní přechody (150–300 ms) na hover/aktivní stavech. Respektovat
`prefers-reduced-motion`. Žádné agresivní animace, žádný autoplay carousel.

## Interaktivita — bez frameworku

Web je **maximálně statický**. Žádný React/Vue na produkci — interaktivní
sekce (JarvisDemo, DayWith, Services, Cases, Calculator, FitCheck, StickyCTA,
Contact) jsou statický Astro markup + vanilla JS v jednom `<script>` tagu dané
komponenty. FAQ je čisté `<details>`/`<summary>`, bez JS.

## Pre-delivery checklist

- [ ] Barvy a fonty jen z tokenů v `global.css` (nic natvrdo)
- [ ] Jeden `<h1>` na stránce, `<title>` + `meta description` zachované ze živého webu
- [ ] Kontrast textu ≥ 4.5:1
- [ ] `cursor-pointer` na klikatelném, viditelný focus ring
- [ ] `prefers-reduced-motion` respektováno
- [ ] Žádný React/framework runtime na produkci — jen vanilla JS tam, kde je interakce nutná
- [ ] Build (`npm run build`) + grep na klíčový obsah v `dist/index.html` — viz Fáze 6
