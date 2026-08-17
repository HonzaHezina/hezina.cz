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
majitel/manažer firmy 5–50 lidí, ne technik — a typicky je to člověk, který už
jednou naletěl (levný chatbot, agentura, nadšený junior) a hledá pravdu, ne
slevu. Web se čte hlavně po osobním doporučení (1:1), ne ze studeného
trafficu — je to legitimizace ("není to amatér"), ne lead-gen trychtýř.

- **Hlavní kompetence je diagnostika, ne stavění AI asistentů.** Postavit
  systém umí spousta lidí — vzácné je vědět, co postavit a co ne. Klíčová
  věta, která se na webu musí objevit prominentně (dnes v `Hero`): *„Neplatíte
  za AI. Platíte za to, že vím, kde ji použít a kde ne."*
- **Nabídka (`Services`) má hierarchii, ne tři rovnocenné položky:**
  1. **Provozní diagnostika** — 40 000 Kč jednorázově, ~1 týden. Vstupní bod,
     vizuálně dominantní (první/aktivní tab). Výstup je dokument — co
     automatizovat, co ne, co se rozbije dřív, než se dostane k AI. Cena je
     odečitatelná od implementace, pokud spolupráce pokračuje.
  2. **Implementace AI asistenta** — 50 000 Kč jednorázové nastavení +
     15 000 Kč měsíčně (provoz, rozvoj, podpora). Navazující krok po
     diagnostice, ne samostatný vstupní produkt. Bez skrytých poplatků, bez
     účtování za dotaz/uživatele.
  3. **Školení AI pro firmy** — 18 000 Kč, samostatná volba nezávislá na
     diagnostice.
  Když se ceny zmiňují, zmiňují se přesně takhle — a všechny tři existují
  současně, žádná se nenahrazuje "AI auditem" ani podobnou položkou.
- **Metafora Jarvis je podřízená diagnostice, ne headline.** Popisuje, co se
  staví *poté*, co diagnostika potvrdí, že to dává smysl (viz `DayWith` —
  sekce žije až za `Services`/`Process`, ne jako hook hned po Hero). V H1/hero
  se nepoužívá jako první věc, kterou návštěvník vidí.
- **Jednotná časová osa — používat všude konzistentně, nevymýšlet jiná
  čísla:** diagnostika ~1 týden → první funkční verze asistenta 2–4 týdny od
  podpisu → plný efekt (AI zná firmu) ~2 měsíce provozu.
- **USP: vaše data zůstávají vaše, žádný vendor lock-in.** Postaveno na
  otevřené platformě janAGI. Když klient zítra skončí spolupráci, systém běží
  dál — runbook a přístupy jsou jeho. Tvrzení v textu ano, ale ne jako
  pseudopřesná "statistika" (např. "0 Kč", "100 %") — buď ověřitelné číslo
  (roky, typy systémů, konkrétní projekt), nebo věta, nikdy obojí naráz.
- **Anti-buzzword tón** (viz sekce `NoBS` na homepage): žádná "transformace",
  "disrupce", "revoluce", "10× zrychlení", "AI-first", "synergie". Konkrétní
  hodiny, konkrétní ceny, konkrétní scénáře — i to, kdy to nedává smysl.
- **Manifest "Systém, ne kouzlo"** (sekce `MagicVsOps`): AI navrhuje, člověk
  schvaluje. Žádná citlivá akce (email klientovi, faktura, smlouva) neodchází
  bez lidského schválení.
- **Modelová čísla nejsou reference.** `Cases` obsahuje modelové scénáře
  (problem/solution/metrics popsané jako "modelová", ne měřená), bez citací
  přisuzovaných vymyšlené osobě ("— majitel firmy" apod.).

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
4. **Obsahové změny jdou přes schválený plán, ne rozhodnutí za Honzu.**
   Původní migrace byla 1:1 podle `docs/MIGRATION_INVENTORY.md` (historický
   záznam, dokončeno ve Fázi 6 — dnes už neplatí jako živé pravidlo). Od
   repozicování na diagnostiku (viz sekce Pozicování výše) se obsah i
   struktura sekcí smí měnit, ale vždy jen na základě explicitního zadání od
   Honzy a schváleného plánu (research → plán → schválení → implementace po
   sekcích/commitech). Nevymýšlet nový copy ani sekce iniciativně bez zadání.
   Nová sekce s reálnými případovkami (`WhereItBreaks.astro`) čeká na obsah
   od Honzy a záměrně **není** zapojená do `index.astro` — fabrikovaný obsah
   (vymyšlené případovky, citace) nesmí jít na produkci, viz i `Cases.astro`,
   odkud byly z téhož důvodu odstraněny vymyšlené citace klientů.
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
│   ├── Hero.astro               # copy + <script> pro JarvisDemo; H1 = diagnostika, ne Jarvis
│   ├── NoBS.astro
│   ├── Services.astro           # + <script> pro taby; pořadí = Diagnostika → Implementace → Školení
│   ├── WhereItBreaks.astro      # "Kde se to obvykle láme" — TODO obsah, NEIMPORTOVANÁ do index.astro
│   ├── Process.astro            # 3 kroky podél jednotné časové osy (diagnostika → implementace → provoz)
│   ├── CTAStrip.astro           # props: title, sub, btn, href, variant
│   ├── DayWith.astro            # + <script> pro klikací timeline; žije až za Services/Process
│   ├── Cases.astro              # + <script> pro taby; modelové scénáře, bez citací
│   ├── Calculator.astro         # + <script> pro slidery/live přepočet; ROI v měsících, konzervativní koeficienty
│   ├── FitCheck.astro           # + <script> pro kvíz; id="rychly-test" (ne "diagnostika" — to je název služby)
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

Pořadí importů v `src/pages/index.astro` odráží pozicovací hierarchii (schopnost →
nabídka/důkaz → implementace → filtr) a nekopíruje 1:1 pořadí souborů výše.

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
grep -i "15 000" dist/index.html && echo "OK: cena implementace v HTML"
grep -i "40 000" dist/index.html && echo "OK: cena diagnostiky v HTML"
grep -i "Neplatíte za AI" dist/index.html && echo "OK: klíčová věta v HTML"
grep -i "<h1" dist/index.html && echo "OK: h1 v HTML"
grep -ci "zdarma" dist/index.html   # musí být ≤ 1 v celém webu
```

Otevři `dist/index.html` a potvrď reálný text v raw HTML — ne `<div id="root">`,
ne jen scripty. Bez zeleného gripu není změna hotová.

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
