# hezina.cz — pravidla projektu

> Tento soubor je závazný pro Claude Code. GitHub Copilot čte zkrácenou verzi
> v `.github/copilot-instructions.md`. **Design tokeny žijí pouze v
> `docs/DESIGN_SYSTEM.md` + `src/styles/global.css`** — oba nástroje z nich
> čerpají, aby se barvy a fonty nikdy nerozešly.

## Co tohle repo je

Osobní prezentační web **Jana Hezina** — AI konzultant pro malé a střední
firmy (5–50 lidí). Stack: **Astro, output: static, žádný framework runtime**
(žádný React/Vue/Svelte na produkci). Tailwind CSS v4 přes `@tailwindcss/vite`
v `astro.config.mjs`, tokeny v `@theme` bloku v `src/styles/global.css` —
**žádný `tailwind.config.js`**.

Web vznikl migrací z client-rendered SPA (surové JSX transpilované Babelem
v prohlížeči, žádný build), kde bylo celé `<body>` prázdné až do vykonání JS —
Googlebot i link-preview crawleři neviděli žádný obsah. Cíl migrace: veškerý
textový obsah v HTML hned po buildu, interaktivní kousky jako lehký vanilla JS,
ne jako framework island.

## Pozicování (jak mluvit o produktu)

Ke klientovi mluvíme klientskou řečí, ne technickým žargonem. Klient je
majitel/manažer firmy 5–50 lidí, ne technik.

- **Metafora: Jarvis.** "Váš vlastní Jarvis pro firmu" — AI asistent napojený
  na emaily, dokumenty, zakázky. Ne "AI platforma", ne "LLM integrace".
- **Cena je vždy konkrétní:** 50 000 Kč jednorázové úvodní nastavení +
  15 000 Kč měsíčně (provoz, rozvoj, podpora). Bez skrytých poplatků, bez
  účtování za dotaz/uživatele. Když se cena zmiňuje, zmiňuje se přesně takhle.
- **USP: vaše data zůstávají vaše, žádný vendor lock-in.** Postaveno na
  otevřené platformě janAGI. Když klient zítra skončí spolupráci, systém běží
  dál — runbook a přístupy jsou jeho.
- **Anti-buzzword tón** (viz sekce `NoBS` na homepage): žádná "transformace",
  "disrupce", "revoluce", "10× zrychlení", "AI-first", "synergie". Konkrétní
  hodiny, konkrétní ceny, konkrétní reference — i to, kdy to nedává smysl.
- **Manifest "Systém, ne kouzlo"** (sekce `MagicVsOps`): AI navrhuje, člověk
  schvaluje. Žádná citlivá akce (email klientovi, faktura, smlouva) neodchází
  bez lidského schválení.

## Tvrdá pravidla (neporušitelná)

1. **Statický render je nepřekročitelný požadavek.** `npm run build` musí
   vyprodukovat `dist/index.html`, kde je veškerý textový obsah (nadpisy,
   ceník, popisky) přímo v HTML — ne za JS. Ověřuje se gripem, viz níž.
2. **Žádný framework runtime na produkci.** Interaktivní sekce (JarvisDemo,
   DayWith timeline, Services/Cases taby, Calculator, FitCheck kvíz, StickyCTA,
   Contact formulář) jsou vanilla JS v `<script>` tagu uvnitř příslušné
   `.astro` komponenty. FAQ je čisté `<details>`, bez JS vůbec.
3. **Barvy a fonty jen z tokenů** v `src/styles/global.css` /
   `docs/DESIGN_SYSTEM.md`. Chybí-li token — zeptej se, nevymýšlej.
4. **Žádný nový copy, žádné nové sekce.** Obsah se migruje 1:1 podle
   `docs/MIGRATION_INVENTORY.md`. Návrh na cokoli nového jde zvlášť ke
   schválení, nerozhoduje se to za Honzu.
5. **Jazyk webu je čeština:** `<html lang="cs">`, veškerý copy česky.
6. **Kontaktní formulář** posílá `POST` na `https://n8n.janagi.org/webhook/contact`
   (FormData) přímo z prohlížeče — žádný server endpoint, žádný skrytý klíč.
7. **JarvisDemo je simulace**, ne reálné API volání. Vzorové dotazy mají
   předpřipravené odpovědi, vlastní dotaz dostane statickou fallback odpověď.
   (Historicky se zkoušelo `window.claude.complete()` — Claude Artifacts API,
   mimo sandbox vždy selhalo. V migraci odstraněno, nenavracet.)

## Architektura složek

```
src/
├── pages/
│   └── index.astro           # homepage, celá statická
├── layouts/
│   └── Layout.astro           # <html lang="cs">, head, fonty, dark-mode init script, OG tagy
├── components/
│   ├── Nav.astro               # + <script> pro scroll-shadow/mobile menu/theme toggle
│   ├── Hero.astro               # copy + <script> pro JarvisDemo
│   ├── NoBS.astro
│   ├── CTAStrip.astro           # props: title, sub, btn, href, variant
│   ├── DayWith.astro            # + <script> pro klikací timeline
│   ├── Services.astro           # + <script> pro taby
│   ├── Process.astro
│   ├── Cases.astro              # + <script> pro taby
│   ├── Calculator.astro         # + <script> pro slidery/live přepočet
│   ├── FitCheck.astro           # + <script> pro kvíz
│   ├── MagicVsOps.astro
│   ├── About.astro
│   ├── ForWhom.astro
│   ├── Pricing.astro
│   ├── FAQ.astro                # čisté <details>, bez JS
│   ├── Editorial.astro
│   ├── Contact.astro            # + <script> pro validaci a fetch na n8n webhook
│   ├── Footer.astro
│   └── StickyCTA.astro          # + <script> pro scroll listener
└── styles/
    └── global.css               # @theme tokeny + base styly
```

`src/web/` obsahuje **referenční export starého SPA designu** (od Claude) —
zdroj pravdy pro 1:1 obsah a vzhled při migraci, není součástí buildu.

Starý produkční SPA kód (kořenové `app.jsx`, `components/*.jsx`, `styles.css`,
`index.html`, `tweaks-panel.jsx`) byl po zelené verifikaci (Fáze 6) odstraněn —
nový Astro web je jediný zdroj pravdy.

## Vývoj

```
npm install
npm run dev       # dev server
npm run build     # produkční build → dist/
npm run preview   # lokální náhled produkčního buildu
```

## Verifikace (nepřeskočitelná, viz Fáze 6 migračního tasku)

```bash
npm run build
grep -i "15 000" dist/index.html && echo "OK: cena v HTML"
grep -i "<h1" dist/index.html && echo "OK: h1 v HTML"
grep -ci "jarvis" dist/index.html
```

Otevři `dist/index.html` a potvrď reálný text v raw HTML — ne `<div id="root">`,
ne jen scripty. Bez zeleného gripu není migrace hotová.

## Nasazení

Coolify na Hetzneru, stejný vzor jako sesterský projekt BeHeMi-web. Web už má
v Coolify existující resource (doména + SSL) z dob starého SPA — **nezakládej
nový kontejner**, jen uprav build nastavení stávajícího resource a spusť
redeploy. Nová doména/certifikát by se řešily zbytečně znovu.

V Coolify UI u resource hezina.cz nastav/zkontroluj:

- **Build Pack:** Nixpacks
- **Is it a static site?** = **ON**
- **Is it a SPA?** = **OFF** (i když je to jedna stránka, tenhle přepínač
  řídí SPA-style fallback routing na `index.html` — u nás ho nechceme)
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Publish Directory:** `/dist` (s lomítkem)
- **Static Image:** `nginx:alpine` (default Coolify nginx config —
  `try_files $uri $uri.html $uri/index.html …`, sedí na Astro output)
- **Pre-deployment commands:** prázdné
- Port 3000 je po zapnutí static togglu irelevantní

Po uložení nastavení klikni **Redeploy**. Coolify strhne aktuální `main`,
spustí `npm install && npm run build` a nasadí obsah `dist/` přes nginx.

**Pokud static toggle není zapnutý** (např. starý resource byl nastavený jako
Node server), Coolify by zkoušel spustit `npm start`, který v tomhle projektu
neexistuje → restart smyčka. Zapnutí static togglu je proto nutná podmínka,
ne volitelná optimalizace.
