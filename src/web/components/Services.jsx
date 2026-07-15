// Services.jsx — three offerings (implementation, training, consulting)
const { useState: useStateSvc } = React;

const SERVICES = [
  {
    id: 'implementace',
    tag: 'Hlavní služba',
    title: 'Implementace AI asistenta',
    lead: 'Postavím vám AI asistenta na míru. Napojený na vaše emaily, dokumenty a zakázky. Od prvního hovoru po běžící systém za 2–4 týdny.',
    bullets: [
      'Analýza, kde AI ušetří nejvíc času',
      'Nastavení a napojení na vaše systémy',
      'Zaškolení vás i vašeho týmu',
      'Průběžný rozvoj a podpora',
    ],
    price: 'od 50 000 Kč',
    priceNote: '+ měsíční paušál',
    cta: 'Vidět cenu →',
    href: '#cena',
  },
  {
    id: 'skoleni',
    tag: 'Pro celý tým',
    title: 'Školení AI pro firmy',
    lead: 'Praktický kurz, jak AI reálně používat ve firmě. Žádné teoretické přednášky — píšeme prompty na vašich případech, řešíme vaše problémy.',
    bullets: [
      'Půldenní nebo celodenní workshop',
      'Až 12 lidí v jedné skupině',
      'Vlastní firemní příklady, ne hraní si',
      'U vás v kanceláři nebo online',
    ],
    price: '15 000 Kč',
    priceNote: 'půlden / skupina',
    cta: 'Domluvit termín →',
    href: '#kontakt',
  },
  {
    id: 'konzultace',
    tag: 'Než se rozhodnete',
    title: 'AI audit & konzultace',
    lead: 'Než investujete do AI, podívám se, jestli to u vás dává smysl. Co automatizovat, co ne. Konkrétní doporučení do týdne.',
    bullets: [
      'Mapování vašich procesů',
      'Co AI zvládne dnes vs. za rok',
      'Konkrétní odhad úspory času',
      'Návrh prvního kroku (i bez mé další účasti)',
    ],
    price: '20 000 Kč',
    priceNote: 'jednorázově · 1 týden',
    cta: 'Mám zájem →',
    href: '#kontakt',
  },
];

function Services() {
  const [active, setActive] = useStateSvc('implementace');
  const svc = SERVICES.find((s) => s.id === active);

  return (
    <section className="section" id="sluzby">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Co nabízím</span>
          <h2>Tři způsoby,<br />jak vám můžu pomoct.</h2>
          <p>
            Nemusíte hned skočit do plné implementace. Můžeme začít školením
            nebo auditem — podle toho, kde jste teď. Vyberte si.
          </p>
        </div>

        <div className="svc">
          <div className="svc__tabs" role="tablist">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={s.id === active}
                className={"svc__tab" + (s.id === active ? " is-active" : "")}
                onClick={() => setActive(s.id)}
              >
                <span className="svc__tab-tag mono">{s.tag}</span>
                <span className="svc__tab-title">{s.title}</span>
                <span className="svc__tab-price">{s.price}</span>
              </button>
            ))}
          </div>

          <div className="svc__panel" key={active}>
            <div className="svc__panel-grid">
              <div>
                <span className="svc__panel-tag mono">{svc.tag}</span>
                <h3>{svc.title}</h3>
                <p className="svc__lead">{svc.lead}</p>

                <ul className="svc__list">
                  {svc.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div className="svc__price-card">
                <div className="svc__price-tag mono">Cena</div>
                <div className="svc__price-amount">{svc.price}</div>
                <div className="svc__price-note">{svc.priceNote}</div>
                <a href={svc.href} className="btn btn--blue btn--lg svc__cta">
                  {svc.cta}
                </a>
                <p className="svc__price-foot">
                  Nevíte, co si vybrat? <a href="#kontakt">Napište mi</a> — poradím.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Services = Services;
