// Cases.jsx — anonymized case studies
const { useState: useStateCases } = React;

const CASES = [
  {
    industry: 'Výrobní firma',
    size: '40 lidí',
    problem: 'Tým obchodu trávil hodiny denně psaním stejných odpovědí klientům.',
    solution: 'AI asistent čte poptávky, vyhledá historii klienta, navrhne odpověď. Obchodník schválí a odešle.',
    metrics: [
      { v: '~35 %', l: 'rychlejší zpracování' },
      { v: '6 h', l: 'týdně zpět / člověk' },
      { v: '0', l: 'vynechaných odpovědí' },
    ],
    quote: 'Předtím to byly hodiny denně. Teď schválím deset emailů u kafe.',
    role: 'majitel firmy',
  },
  {
    industry: 'Účetní kancelář',
    size: '12 lidí',
    problem: 'Hledání ve stovkách klientských složek a dohledávání faktur zabíralo víc času než samotná práce.',
    solution: 'AI napojená na DMS a účetní systém. Stačí zeptat se přirozenou řečí: „Faktury klienta X za leden."',
    metrics: [
      { v: '~50 %', l: 'méně času hledáním' },
      { v: '3 s', l: 'odpověď na dotaz' },
      { v: '100 %', l: 'dohledatelnost' },
    ],
    quote: 'Když mi volá klient, mám odpověď dřív, než dokončí otázku.',
    role: 'jednatelka',
  },
  {
    industry: 'Stavební firma',
    size: '25 lidí',
    problem: 'Stavbyvedoucí ztráceli přehled o termínech, dodavatelích a stavu zakázek napříč 8 projekty.',
    solution: 'AI hlídá termíny, hlásí skluzy, ráno připraví přehled. Schvalovací workflow pro objednávky.',
    metrics: [
      { v: '0', l: 'zapomenutých termínů' },
      { v: '~25 %', l: 'rychlejší fakturace' },
      { v: '8', l: 'projektů pod kontrolou' },
    ],
    quote: 'Konečně vím, co mi zítra spadne na hlavu, než to spadne.',
    role: 'stavbyvedoucí',
  },
];

function Cases() {
  const [active, setActive] = useStateCases(0);
  const c = CASES[active];

  return (
    <section className="section section--soft" id="reference">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Reference</span>
          <h2>Co se povedlo<br />u jiných firem.</h2>
          <p>
            Konkrétní příklady z nasazených systémů. Jména klientů jsou anonymizovaná —
            číslo zaměstnanců a obor sedí. Po dohodě rád spojím s referencí.
          </p>
        </div>

        <div className="cases">
          <div className="cases__tabs" role="tablist">
            {CASES.map((cc, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                className={"cases__tab" + (i === active ? " is-active" : "")}
                onClick={() => setActive(i)}
              >
                <span className="cases__tab-num mono">0{i + 1}</span>
                <span className="cases__tab-name">{cc.industry}</span>
                <span className="cases__tab-size">{cc.size}</span>
              </button>
            ))}
          </div>

          <div className="cases__panel" key={active}>
            <div className="cases__panel-head">
              <div>
                <div className="cases__industry">{c.industry} · {c.size}</div>
                <h3 className="cases__problem">{c.problem}</h3>
              </div>
            </div>

            <div className="cases__solution">
              <span className="cases__label">Co jsme udělali</span>
              <p>{c.solution}</p>
            </div>

            <div className="cases__metrics">
              {c.metrics.map((m, i) => (
                <div key={i} className="cases__metric">
                  <strong>{m.v}</strong>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>

            <blockquote className="cases__quote">
              <p>{c.quote}</p>
              <cite>— {c.role}</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Cases = Cases;
