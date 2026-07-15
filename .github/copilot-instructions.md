# Pokyny pro GitHub Copilot — hezina.cz

Tento soubor čte Copilot ve VS Code automaticky. Plná pravidla jsou v
`/CLAUDE.md`, design tokeny v `/docs/DESIGN_SYSTEM.md` +
`src/styles/global.css`. **Při návrhu UI vždy ber barvy, fonty a spacing
odsud** — nikdy je nehardcoduj.

## Co tohle repo je

Osobní prezentační web Jana Hezina — AI konzultant pro malé a střední firmy.
Stack: **Astro, output: static, žádný framework runtime**. Tailwind v4 přes
`@tailwindcss/vite`, tokeny v `@theme` v `src/styles/global.css`, žádný
`tailwind.config.js`.

Vznikl migrací z client-rendered SPA (prázdné `<body>` bez JS → neviditelné
pro crawlery). Cíl: veškerý text v HTML po buildu, interaktivita jako vanilla
JS, ne framework island.

## Pozicování

Klientská řeč, ne tech žargon. Metafora **Jarvis** — "váš vlastní Jarvis pro
firmu". Cena vždy konkrétně: **50 000 Kč jednorázově + 15 000 Kč měsíčně**.
USP: **vaše data zůstávají vaše, žádný vendor lock-in** (platforma janAGI).
Anti-buzzword tón — žádná "transformace", "disrupce", "AI-first", "synergie".

## Tvrdá pravidla

1. **Statický render nepřekročitelný.** `npm run build` → `dist/index.html`
   musí obsahovat veškerý text přímo v HTML, ne za JS.
2. **Žádný framework runtime na produkci.** Interaktivní sekce = vanilla JS
   `<script>` v `.astro` komponentě. FAQ = čisté `<details>`, bez JS.
3. **Barvy/fonty jen z tokenů** (`src/styles/global.css`). Chybí token →
   zeptej se, nevymýšlej.
4. **Žádný nový copy, žádné nové sekce** bez schválení — obsah je 1:1 podle
   `docs/MIGRATION_INVENTORY.md`.
5. Jazyk webu = čeština, `<html lang="cs">`.
6. Kontaktní formulář posílá přímo na `https://n8n.janagi.org/webhook/contact`
   z prohlížeče — žádný server endpoint.
7. JarvisDemo je simulace (předpřipravené odpovědi + statický fallback),
   ne reálné API volání. Nenavracet `window.claude.complete()`.

## Architektura

`src/pages/index.astro` (homepage) skládá statické `.astro` komponenty ze
`src/components/` (viz plný seznam v `/CLAUDE.md`). `src/web/` je referenční
export starého designu (obsah/vzhled 1:1 zdroj), není součástí buildu.

## Nasazení

Coolify na Hetzneru, statika: Nixpacks, „Is it a static site?" ON, „Is it a
SPA?" OFF, publish dir `/dist`, `nginx:alpine`.
