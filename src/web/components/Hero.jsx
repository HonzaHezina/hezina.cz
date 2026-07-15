// Hero.jsx — interactive Jarvis demo
const { useState: useStateHero, useEffect: useEffectHero, useRef: useRefHero } = React;

const SAMPLE_QUERIES = [
  { q: 'Připrav mi shrnutí zakázky Novák s.r.o. na zítřejší schůzku.', who: 'obchod' },
  { q: 'Kolik faktur zbývá zaplatit do konce týdne?', who: 'majitel' },
  { q: 'Najdi mi všechny smlouvy s klientem ABC za poslední rok.', who: 'admin' },
  { q: 'Odpověz panu Svobodovi že termín posuneme o týden.', who: 'obchod' },
];

// Pre-baked fallback responses (in case AI call fails or for instant feel)
const FALLBACKS = {
  'Připrav mi shrnutí zakázky Novák s.r.o. na zítřejší schůzku.': {
    summary: 'Mám 3 dokumenty, 11 emailů a aktuální fakturu k Novák s.r.o.',
    bullets: [
      'Termín dodání: 12. 5. (zbývá 8 dní)',
      'Čeká schválení cenové doložky z 28. 4.',
      'Klient čeká odpověď na nabídku z pondělí',
      'Poslední platba: 145 200 Kč přijata 22. 4.',
    ],
    next: 'Mám připravit návrh emailu s upravenou cenovou doložkou?',
  },
  'Kolik faktur zbývá zaplatit do konce týdne?': {
    summary: 'Do pátku 9. 5. zbývá uhradit 4 faktury — celkem 187 340 Kč.',
    bullets: [
      'Dodavatel A: 84 200 Kč · splatnost zítra',
      'Dodavatel B: 32 100 Kč · splatnost čtvrtek',
      'Dodavatel C: 48 600 Kč · splatnost pátek',
      'Dodavatel D: 22 440 Kč · splatnost pátek',
    ],
    next: 'Připravit příkaz k úhradě přes vaši banku?',
  },
  'Najdi mi všechny smlouvy s klientem ABC za poslední rok.': {
    summary: 'Našel jsem 7 smluv s ABC s.r.o. od 5/2025 do 4/2026.',
    bullets: [
      'Rámcová smlouva (5/2025) — stále platná',
      '4 dílčí objednávky · celkem 1.24 mil. Kč',
      '2 dodatky (poslední 3/2026 — prodloužení)',
      'Žádná otevřená pohledávka',
    ],
    next: 'Chcete shrnutí klíčových bodů z rámcové smlouvy?',
  },
  'Odpověz panu Svobodovi že termín posuneme o týden.': {
    summary: 'Připravil jsem návrh odpovědi panu Svobodovi.',
    bullets: [
      '„Dobrý den, pane Svobodo,"',
      '„děkuji za trpělivost. Termín dodání musíme posunout o jeden týden — z 14. 5. na 21. 5."',
      '„Důvod: zpoždění komponentu od dodavatele B. Garantujeme původní cenu i kvalitu."',
      '„S pozdravem, [Vy]"',
    ],
    next: 'Schválit a odeslat, nebo upravit?',
  },
};

function Hero({ tweaks }) {
  const headlines = {
    jarvis: <React.Fragment>Váš vlastní <span className="accent">Jarvis</span><br />pro firmu.</React.Fragment>,
    znalost: <React.Fragment>AI asistent, který<br /><span className="accent">zná vaši firmu.</span></React.Fragment>,
    rutina: <React.Fragment>AI, která za vás<br /><span className="accent">dělá rutinu.</span></React.Fragment>,
  };
  const headline = headlines[tweaks.headline] || headlines.jarvis;

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow"><span className="dot"></span>AI agent pro malé a střední firmy</span>
          <h1>{headline}</h1>
          <p className="hero__lead">
            AI asistent napojený na vaše emaily, dokumenty a zakázky.
            Učí se, jak vaše firma funguje. Postupně přebírá rutinní práci.
            Žádná krabice — systém šitý na míru, který roste s vámi.
          </p>

          <div className="hero__ctas">
            <a href="#kontakt" className="btn btn--primary btn--lg">
              Domluvit hovor zdarma (20 min)
              <span className="arrow">→</span>
            </a>
            <a href="#diagnostika" className="btn btn--ghost btn--lg">Nejsem si jistý ↓</a>
          </div>

          <p className="hero__microcopy">
            Ozvu se do 24 hodin. Pokud to u vás nemá smysl, řeknu vám to rovnou.
          </p>

          <div className="hero__meta">
            <span><span className="check">✓</span> Vaše data zůstávají vaše</span>
            <span><span className="check">✓</span> Přesně víte, co AI udělala a proč</span>
            <span><span className="check">✓</span> Pilot za 2–4 týdny</span>
          </div>
        </div>

        <JarvisDemo />
      </div>
    </section>
  );
}

function JarvisDemo() {
  const [messages, setMessages] = useStateHero([
    { who: 'system', label: 'AI asistent · online', text: 'Vyberte ukázkový dotaz, nebo si napište vlastní. Odpověď uvidíte za 1–2 vteřiny.' },
  ]);
  const [input, setInput] = useStateHero('');
  const [busy, setBusy] = useStateHero(false);
  const scrollRef = useRefHero(null);

  useEffectHero(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  async function ask(q) {
    if (!q.trim() || busy) return;
    setMessages(m => [...m, { who: 'user', label: 'Vy', text: q }]);
    setInput('');
    setBusy(true);

    // Try real claude call, fall back to canned response
    let answer = null;
    if (FALLBACKS[q]) {
      // for the canned ones, simulate small delay for realism
      await new Promise(r => setTimeout(r, 700));
      answer = FALLBACKS[q];
    } else {
      try {
        const prompt = `Jsi AI asistent pro českou malou firmu (5-50 lidí). Klient je majitel/manažer, ne technik. Odpověz česky, krátce, prakticky. Max 4 odrážky. Předstírej že máš přístup k jejich emailům, dokumentům a zakázkám - vymysli si konkrétní data (čísla, jména, termíny) ale tak aby to znělo věrohodně.

Vrať POUZE JSON ve tvaru:
{"summary": "1 věta shrnutí", "bullets": ["bod 1", "bod 2", "bod 3"], "next": "návrh dalšího kroku"}

Dotaz: "${q}"`;
        const raw = await window.claude.complete(prompt);
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          answer = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        // fall through
      }
      if (!answer) {
        answer = {
          summary: 'Tohle je jen ukázka. Naživo by AI měla přístup k vašim emailům a dokumentům.',
          bullets: [
            'Konkrétní odpověď podle vašich dat',
            'Návrh dalšího kroku k vašemu schválení',
            'Žádné domnělé odpovědi — vždy ze zdroje',
          ],
          next: 'Chcete vidět, jak by to fungovalo na vašem případu? Domluvte si 20min hovor.',
        };
      }
    }

    setMessages(m => [...m, { who: 'ai', label: 'Asistent · 2 s', ...answer }]);
    setBusy(false);
  }

  function pickSample(s) {
    ask(s.q);
  }

  return (
    <div className="hero__visual">
      <div className="jarvis-card">
        <div className="jarvis-head">
          <span className="jarvis-head__dot"><i></i> Živá ukázka · zkuste si</span>
          <span className="mono">demo</span>
        </div>

        <div className="jarvis-scroll" ref={scrollRef}>
          {messages.map((m, i) => (
            <Message key={i} m={m} />
          ))}
          {busy && (
            <div className="msg msg--ai">
              <div className="msg__avatar">AI</div>
              <div className="msg__bubble">
                <span className="typing"><i></i><i></i><i></i></span>
              </div>
            </div>
          )}
        </div>

        <div className="jarvis-samples">
          {SAMPLE_QUERIES.map((s, i) => (
            <button
              key={i}
              type="button"
              className="sample-pill"
              onClick={() => pickSample(s)}
              disabled={busy}
            >
              {s.q.length > 44 ? s.q.slice(0, 42) + '…' : s.q}
            </button>
          ))}
        </div>

        <form
          className="jarvis-input"
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
        >
          <input
            type="text"
            placeholder="Napište vlastní dotaz…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
          />
          <button type="submit" className="jarvis-send" disabled={busy || !input.trim()} aria-label="Odeslat">
            →
          </button>
        </form>
      </div>
    </div>
  );
}

function Message({ m }) {
  if (m.who === 'system') {
    return (
      <div className="msg msg--system">
        <div className="msg__bubble">{m.text}</div>
      </div>
    );
  }
  if (m.who === 'user') {
    return (
      <div className="msg msg--user">
        <div className="msg__avatar">Vy</div>
        <div className="msg__bubble"><span className="label">{m.label}</span>{m.text}</div>
      </div>
    );
  }
  // AI structured response
  return (
    <div className="msg msg--ai">
      <div className="msg__avatar">AI</div>
      <div className="msg__bubble">
        <span className="label">{m.label}</span>
        <strong>{m.summary}</strong>
        {m.bullets && (
          <ul className="ai-bullets">
            {m.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        {m.next && (
          <div className="ai-next">
            {m.next}
            <div className="ai-actions">
              <button type="button" className="pill">Upravit</button>
              <button type="button" className="pill pill--primary">Schválit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.Hero = Hero;
