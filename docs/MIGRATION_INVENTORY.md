# Migrační inventura — hezina.cz (Fáze 0)

## Zjištěný stack (aktuální stav)

**Toto není Vite/React build.** Repo nemá `package.json`, žádný bundler, žádný CI.
Je to ručně psané `index.html`, které z CDN (unpkg) natahuje React 18 + ReactDOM +
Babel Standalone a **transpiluje JSX přímo v prohlížeči** (`<script type="text/babel">`).
Žádný build krok — nasazuje se surový zdrojový kód.

Potvrzuje to přesně popsaný problém: `<div id="root"></div>` je v HTML prázdný,
obsah vznikne až po stažení a vykonání ~1.5 MB JS (React+Babel z CDN) plus 21
komponentových souborů. Crawler bez JS vidí jen `<head>`.

Soubory:
- `index.html` — root dokument, `<head>` (title/meta v pořádku), načítá 21 `.jsx` souborů přes Babel
- `app.jsx` — root komponenta, skládá stránku, drží dark-mode a "tweaks" edit-mode stav
- `tweaks-panel.jsx` — **dev-only nástroj** (in-browser editor pro ladění variant), aktivuje se přes postMessage protokol, na produkci neviditelný. **Nemigruje se.**
- `components/*.jsx` — 21 komponent (viz níže)
- `styles.css` — cca 1400 řádků, CSS custom properties (`oklch()` paleta), BEM-like třídy, `[data-theme="dark"]` override blok
- `v1 Hezina Landing.html` — **starý dev prototyp**, není to živý entry point webu, `index.html` je jediný skutečný root. Nemigruje se (jen historický artefakt).

**Deploy/CI:** V repu není žádný Dockerfile, nginx config ani CI workflow. Nevím,
jak se web aktuálně nasazuje na hezina.cz — ptám se na to níž.

**Externí závislosti:**
- Google Fonts (Geist, Instrument Serif, JetBrains Mono) přes `<link>` — CDN
- React 18.3.1 / ReactDOM / Babel Standalone přes unpkg CDN
- Kontaktní formulář → `POST https://n8n.janagi.org/webhook/contact` (n8n webhook, FormData) — čistě klientský `fetch`, žádný skrytý API klíč
- Dark mode: `localStorage['hez_theme']` + `prefers-color-scheme`, čte se inline scriptem v `<head>` před vykreslením (proti FOUC)

## Živé demo (Hero → JarvisDemo)

Zjištěno z `Hero.jsx`: **není napojené na žádný backend.**
- U 4 předpřipravených ukázkových dotazů (`SAMPLE_QUERIES`) vrací natvrdo zapsané odpovědi z `FALLBACKS` objektu (jen s uměle simulovaným 700ms delay).
- U vlastního textu zkusí `window.claude.complete(prompt)` — to je API dostupné jen v Claude Artifacts sandboxu, **na běžném webu neexistuje** a vždy selže — pak spadne do statické obecné odpovědi.
- Závěr: **čistě klientská simulace, žádné volání serveru.** Pro Astro island stačí `client:visible` bez jakéhokoli server endpointu.
- **Rozhodnuto:** `window.claude.complete()` volání se ve Fázi 4 odstraní — vlastní dotazy půjdou rovnou na statickou fallback odpověď (stejné chování navenek, bez mrtvého kódu).

## Obsahová inventura (sekce v pořadí vykreslení v `app.jsx`)

| # | Komponenta | Typ | Obsah (shrnutí) |
|---|---|---|---|
| 1 | `Nav` | **interaktivní** (scroll state, mobile menu, theme toggle) | Sticky nav, brand "Jan Hezina — AI pro firmu", odkazy Co nabízím/Jak to vypadá/Je to pro vás?/Cena/Kontakt, přepínač tmavý/světlý režim, CTA "Domluvit hovor" |
| 2 | `Hero` | **statický text + interaktivní island** (`JarvisDemo`) | H1 (3 varianty přes tweaks, defaultně "Váš vlastní Jarvis pro firmu."), lead odstavec, 2 CTA, mikrocopy, 3 checkmark body. Vpravo `JarvisDemo` — živý chat s ukázkovými dotazy |
| 3 | `NoBS` | statická | Dva sloupce: "Tady nenajdete" (buzzwordy) / "Najdete" (konkrétní sliby) |
| 4 | `DayWith` (`#den`) | **interaktivní** (klikací timeline, jinak statická data) | "Den s Jarvisem" — 6 událostí na časové ose (07:30–17:30), každá s popisem a "Co dostanete" výstupem |
| 5 | `CTAStrip` ×2 | statická | Mini-CTA pruhy s textem a tlačítkem (parametrizovaná komponenta, volaná 2×) |
| 6 | `Services` (`#sluzby`) | **interaktivní** (taby) | 3 nabídky: Implementace AI asistenta (od 50 000 Kč + měsíční paušál), Školení AI pro firmy (15 000 Kč/půlden), AI audit & konzultace (20 000 Kč) |
| 7 | `Process` (`#proces`) | statická | 3 kroky: Sejdeme se (20 min) → Nastavíme (~1 týden) → Roste to s vámi (průběžně) |
| 8 | `Cases` (`#reference`) | **interaktivní** (taby) | 3 anonymizované case studies (výrobní firma, účetní kancelář, stavební firma) s metrikami a citáty |
| 9 | `Calculator` (`#kalkulacka`) | **interaktivní** (slidery, live přepočet) | Kalkulačka úspory — 4 slidery (hodiny email/dokumenty, počet lidí, hodinová sazba) → roční/měsíční úspora |
| 10 | `FitCheck` (`#diagnostika`) | **interaktivní** (5otázkový kvíz) | Diagnostika "je AI pro vaši firmu" → doporučení (implementace/audit/školení/počkat) |
| 11 | `MagicVsOps` (`#magie`) | statická | Manifest "Magie vs. Systém" — 2 sloupce + statický "flow log" příklad |
| 12 | `About` (`#o-mne`) | statická | "Proč já" — Jan Hezina, 20+ let v IT, 4 credenciály |
| 13 | `ForWhom` | statická | "Pro koho ano / Pro koho ne" — 2× 4 body |
| 14 | `Pricing` (`#cena`) | statická | 2 cenové karty: Úvodní nastavení 50 000 Kč jednorázově / Provoz a rozvoj 15 000 Kč měsíčně |
| 15 | `FAQ` (`#faq`) | **interaktivní** (accordion, `<details>`) | 8 otázek/odpovědí (data, chyby AI, ukončení spolupráce, GDPR, cena, technická náročnost, rychlost výsledků, rozšiřování) |
| 16 | `Editorial` | statická | Celostránkový citát "Klid v hlavě, když přijde email v pátek odpoledne." |
| 17 | `Contact` (`#kontakt`) | **interaktivní** (formulář + fetch na n8n webhook) | Kontaktní info (email/telefon/LinkedIn) + formulář (jméno/email/zpráva/honeypot) → POST na n8n webhook |
| 18 | `Footer` | statická | Copyright, odkaz na janAGI, navigační odkazy |
| 19 | `StickyCTA` | **interaktivní** (scroll-based visibility) | Plovoucí "Domluvit hovor" tlačítko po scrollu |

### Orphaned komponenty — načtené, ale nikde nevykreslené

`index.html` oba tyto soubory natahuje přes `<script>`, ale `app.jsx` je **nikde nevolá** — na živém webu se dnes nezobrazují vůbec:

- **`Stack.jsx`** (`#janagi`) — odstavec o platformě janAGI, "bez vendor lock-inu"
- **`Benefits.jsx`** (`#prinos`) — bento grid "Co konkrétně bude AI dělat za vás" (4 rozklikávací benefity s příklady)

**Rozhodnuto:** vynechat. Migruje se jen to, co je dnes skutečně vidět na živém webu.

## Design inventura (extrahováno ze `styles.css`)

**Fonty** (Google Fonts):
- `--font-sans`: Geist (400/500/600/700) — primární
- `--font-serif`: Instrument Serif (italic) — akcentová slova, citace
- `--font-mono`: JetBrains Mono (400/500) — labely, čísla, mono detaily

**Barvy** — `oklch()`, světlý + `[data-theme="dark"]` override:
- `--bg`, `--bg-soft`, `--bg-card` — pozadí (světlé/tmavé varianty)
- `--ink`, `--ink-soft`, `--ink-mute` — text
- `--line`, `--line-strong` — bordery
- `--blue`, `--blue-deep`, `--blue-soft`, `--blue-glow` — primární accent (CTA, odkazy, aktivní stavy)

**Layout tokeny:**
- `--maxw: 1180px`, `--gutter: clamp(20px,4vw,48px)`, `--section-y: clamp(72px,11vw,144px)`
- `--radius-sm: 8px`, `--radius: 14px`, `--radius-lg: 22px`

**Typografická škála:** h1 `clamp(40px,6.4vw,76px)`, h2 `clamp(30px,4.2vw,50px)`, h3 `clamp(20px,2.2vw,24px)`, body 17px/1.55

Tohle půjde 1:1 do `docs/DESIGN_SYSTEM.md` jako Tailwind tokeny ve Fázi 2 — nic se nevymýšlí, jen se přepíše zápis.

## Referenční repo BoHeMi-web (nalezeno)

Sousední `../BeHeMi-web` obsahuje kompletní vzor kostry:
- `CLAUDE.md` (root) — pravidla projektu, hard rules, deploy postup
- `.github/copilot-instructions.md` — zkrácená verze pro Copilota
- `design-system/MASTER.md` — master design tokeny
- Stack: **Astro + Tailwind CSS v4** přes `@tailwindcss/vite` v `astro.config.mjs`, tokeny v `@theme` bloku v `src/styles/global.css` — **žádný `tailwind.config.js`**. To je jiná generace Tailwindu, než klasický `tailwind.config.js` přístup zmíněný v zadání Fáze 1/2.
- Deploy: **Coolify na Hetzneru**, statika (`output: static`), Nixpacks build pack, `dist/` jako publish directory, `nginx:alpine` static image, "Is it a static site? = ON", "Is it a SPA? = OFF".

**Rozhodnuto:** hezina.cz se nasazuje stejným způsobem (Coolify/Hetzner, stejný static nginx vzor) — Fáze 7 bude zrcadlit BeHeMi-web 1:1. Kostra (Fáze 2) bude zrcadlit Tailwind v4 bez `tailwind.config.js`, tokeny v `@theme` bloku.

## Navrhované mapování stará → nová struktura

| Staré (`components/*.jsx`) | Nové | Typ v Astru |
|---|---|---|
| `app.jsx` (skládání) | `src/pages/index.astro` | statická stránka |
| `Nav.jsx` | `src/components/Nav.astro` + `src/components/islands/ThemeToggle.tsx` (jen přepínač+scroll state) | hybrid |
| `Hero.jsx` (copy) | `src/components/Hero.astro` | statická |
| `Hero.jsx` (`JarvisDemo`) | `src/components/islands/JarvisDemo.tsx` | **island**, `client:visible` |
| `NoBS.jsx` | `src/components/NoBS.astro` | statická |
| `DayWith.jsx` | `src/components/islands/DayWith.tsx` | island (klikací tabs), `client:visible` |
| `CTAStrip.jsx` | `src/components/CTAStrip.astro` (Astro props) | statická |
| `Services.jsx` | `src/components/islands/Services.tsx` | island (taby), `client:visible` |
| `Process.jsx` | `src/components/Process.astro` | statická |
| `Cases.jsx` | `src/components/islands/Cases.tsx` | island (taby), `client:visible` |
| `Calculator.jsx` | `src/components/islands/Calculator.tsx` | island (slidery), `client:visible` |
| `FitCheck.jsx` | `src/components/islands/FitCheck.tsx` | island (kvíz), `client:visible` |
| `MagicVsOps.jsx` | `src/components/MagicVsOps.astro` | statická |
| `About.jsx` | `src/components/About.astro` | statická |
| `ForWhom.jsx` | `src/components/ForWhom.astro` | statická |
| `Pricing.jsx` | `src/components/Pricing.astro` | statická |
| `FAQ.jsx` | `src/components/FAQ.astro` (nativní `<details>`, žádný JS potřeba) | statická |
| `Editorial.jsx` | `src/components/Editorial.astro` | statická |
| `Contact.jsx` | `src/components/islands/ContactForm.tsx` (jen formulář) + statický obal (kontakt info) v `.astro` | hybrid |
| `Footer.jsx` | `src/components/Footer.astro` | statická |
| `StickyCTA.jsx` | `src/components/islands/StickyCTA.tsx` | island (scroll listener), `client:visible` |
| `tweaks-panel.jsx` | — | **nemigruje se** (dev-only nástroj) |
| `Stack.jsx`, `Benefits.jsx` | — | **nemigruje se** (orphaned, dnes na živém webu neviditelné) |

Poznámka: víc drobných "interaktivních" sekcí (DayWith, Services, Cases, FitCheck, Calculator, StickyCTA) znamená víc menších islandů místo jednoho velkého — každý hydratuje nezávisle a jen když je viditelný, což je lepší pro výkon než jeden monolitický JS bundle. FAQ jde udělat čistě v HTML (`<details>`/`<summary>` nepotřebuje React vůbec).
