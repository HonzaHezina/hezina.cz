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

Klientská řeč, ne tech žargon. Klient už často jednou naletěl (levný chatbot,
agentura) a hledá pravdu, ne slevu. **Hlavní kompetence je diagnostika, ne
stavění AI asistentů** — klíčová věta na webu: *„Neplatíte za AI. Platíte za
to, že vím, kde ji použít a kde ne."*

Nabídka má hierarchii (viz `Services.astro`), ne tři rovnocenné položky:
1. **Provozní diagnostika** — 40 000 Kč, ~1 týden. Vstupní bod, nahoře.
2. **Implementace AI asistenta** — 50 000 Kč jednorázově + 15 000 Kč měsíčně.
   Navazující krok po diagnostice.
3. **Školení AI pro firmy** — 18 000 Kč, samostatná volba.

Metafora **Jarvis** zůstává, ale jako popis toho, co se staví *po*
diagnostice — ne jako headline/H1. Jednotná časová osa napříč webem:
diagnostika ~1 týden → první verze 2–4 týdny → plný efekt ~2 měsíce.

USP: **vaše data zůstávají vaše, žádný vendor lock-in** (platforma janAGI).
Anti-buzzword tón — žádná "transformace", "disrupce", "AI-first", "synergie".
Žádné pseudopřesné statistiky ("0 Kč", "100 %") a žádné vymyšlené citace
v `Cases` — jen ověřitelná čísla nebo tvrzení v textu.

Primární CTA je jednotně **"Objednat diagnostiku"** napříč webem (CTAStrip,
Contact submit) — telefon/email jsou sekundární kanál, ne vlastní CTA.

Profesní historie (`About`, `Services`, `FAQ`) čerpá z Honzova LinkedIn/CV:
E.ON, RWE, SZIF, Ministerstvo zemědělství, Komerční banka, T-Systems,
Aegon, Česká spořitelna — jako kontext pro diagnostickou zkušenost, ne
jako výčet loga. Plný seznam rolí/let v `/CLAUDE.md`.

## Tvrdá pravidla

1. **Statický render nepřekročitelný.** `npm run build` → `dist/index.html`
   musí obsahovat veškerý text přímo v HTML, ne za JS.
2. **Žádný framework runtime na produkci.** Interaktivní sekce = vanilla JS
   `<script>` v `.astro` komponentě. FAQ = čisté `<details>`, bez JS.
3. **Barvy/fonty jen z tokenů** (`src/styles/global.css`). Chybí token →
   zeptej se, nevymýšlej.
4. **Obsahové změny jen přes schválený plán** — ne rozhodnutí za Honzu.
   `docs/MIGRATION_INVENTORY.md` je historický záznam původní 1:1 migrace,
   dnes už neplatí jako živé pravidlo. Fabrikovaný obsah (vymyšlené
   případovky, citace) nesmí na produkci — `WhereItBreaks.astro` je dnes
   zapojená s obecnými diagnostickými vzorci ze zadání, ale reálný
   anonymizovaný příklad v ní čeká na dodání od Honzy (`TODO` v souboru).
5. Jazyk webu = čeština, `<html lang="cs">`.
6. Kontaktní formulář posílá přímo na `https://n8n.janagi.org/webhook/contact`
   z prohlížeče — žádný server endpoint.
7. JarvisDemo je simulace (předpřipravené odpovědi + statický fallback),
   ne reálné API volání. Nenavracet `window.claude.complete()`.

## Architektura

`src/pages/index.astro` (homepage) skládá statické `.astro` komponenty ze
`src/components/` (viz plný seznam v `/CLAUDE.md`), v pořadí odrážejícím
pozicovací hierarchii (diagnostika → nabídka/důkaz → implementace → filtr),
ne abecedně ani podle data vzniku souboru. `src/web/` je referenční export
starého designu (obsah/vzhled 1:1 zdroj původní migrace), není součástí
buildu. `FitCheck.astro` má `id="rychly-test"` — "diagnostika" je název
placené služby v `Services.astro`, ne kvízu.

## Nasazení

Coolify na Hetzneru, statika: Nixpacks, „Is it a static site?" ON, „Is it a
SPA?" OFF, publish dir `/dist`, `nginx:alpine`.
