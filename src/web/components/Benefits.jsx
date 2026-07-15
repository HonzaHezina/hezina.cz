// Benefits.jsx — expandable benefit cards with concrete examples
const { useState: useStateB } = React;

const BENEFITS = [
  {
    n: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    title: 'Emaily za vás',
    body: 'AI čte příchozí poštu, navrhne odpověď, vy jen schválíte a odešlete. Hodiny týdně zpět.',
    example: {
      from: 'Příchozí · klient ABC s.r.o.',
      subject: 'Re: Termín dodání',
      preview: 'Dobrý den, můžete potvrdit posun na 21. 5.?',
      ai: 'Připravený návrh odpovědi: Potvrzuji termín 21. 5., garantujeme cenu i kvalitu. Schválit a odeslat?',
    },
    metric: '~6 h týdně / člověk',
  },
  {
    n: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
    title: 'Dokumenty pod kontrolou',
    body: 'Smlouvy, faktury, nabídky — AI je najde, shrne a připraví podklady.',
    example: {
      from: 'Vy → Jarvis',
      subject: 'Najdi mi smlouvu s ABC z minulého roku',
      preview: '...',
      ai: 'Nalezeno: Ramcova_ABC_2025.pdf · podepsáno 14. 3. 2025 · 3 dodatky · klíčové body a cena na požádání.',
    },
    metric: '~4 h týdně / člověk',
  },
  {
    n: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h2M8 18h2M14 14h2" />
      </svg>
    ),
    title: 'Zakázky na očích',
    body: 'AI hlídá stav zakázek, upozorní na termíny, připraví souhrn pro schůzku.',
    example: {
      from: 'Jarvis · ráno 8:00',
      subject: 'Stav zakázek na dnes',
      preview: '...',
      ai: '2 zakázky v termínu · 1 skluz 3 dny (Novák — návrh kontaktu připraven) · 4 čekají na vaše rozhodnutí.',
    },
    metric: '0 zapomenutých termínů',
  },
  {
    n: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v3a4 4 0 0 0-2 7v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2a4 4 0 0 0-2-7V6a4 4 0 0 0-4-4z" />
        <path d="M9 13h6" />
      </svg>
    ),
    title: 'Učí se vaši firmu',
    body: 'Čím déle běží, tím víc toho zná. Žádné opakované vysvětlování.',
    example: {
      from: 'Po 3 měsících provozu',
      subject: 'Co Jarvis ví',
      preview: '...',
      ai: 'Zná 47 vašich klientů, 12 typových odpovědí, vaše schvalovací pravidla, 3 kategorie priorit. Vše bez vašeho ručního nastavování.',
    },
    metric: 'Roste s firmou',
  },
];

function Benefits() {
  const [active, setActive] = useStateB(0);

  return (
    <section className="section" id="prinos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Co dostanete</span>
          <h2>Co konkrétně bude<br />AI dělat za vás.</h2>
          <p>
            Žádná obecná „digitalizace". Konkrétní úkoly, které dnes zabírají hodiny týdně —
            a které AI odbaví za vás. Klikněte pro ukázku.
          </p>
        </div>

        <div className="benefits-bento">
          <div className="benefits-list">
            {BENEFITS.map((b, i) => (
              <button
                key={b.n}
                type="button"
                className={"benefit-row" + (i === active ? " is-active" : "")}
                onClick={() => setActive(i)}
              >
                <div className="benefit-row__icon">{b.icon}</div>
                <div className="benefit-row__main">
                  <div className="benefit-row__top">
                    <span className="benefit-row__num">{b.n}</span>
                    <h3>{b.title}</h3>
                  </div>
                  <p>{b.body}</p>
                </div>
                <div className="benefit-row__metric">{b.metric}</div>
              </button>
            ))}
          </div>

          <div className="benefit-preview" key={active}>
            <div className="benefit-preview__head">
              <span className="benefit-preview__label">Konkrétní příklad</span>
              <span className="mono">{BENEFITS[active].example.from}</span>
            </div>
            <div className="benefit-preview__subject">{BENEFITS[active].example.subject}</div>
            {BENEFITS[active].example.preview !== '...' && (
              <div className="benefit-preview__quote">{BENEFITS[active].example.preview}</div>
            )}
            <div className="benefit-preview__ai">
              <div className="benefit-preview__ai-label">
                <span className="dot-pulse"></span> Jarvis
              </div>
              <p>{BENEFITS[active].example.ai}</p>
              <div className="benefit-preview__actions">
                <button type="button" className="pill">Upravit</button>
                <button type="button" className="pill pill--primary">Schválit a odeslat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Benefits = Benefits;
