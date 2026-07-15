// Process.jsx — 3 steps
function Process() {
  const steps = [
    {
      n: '1',
      time: '20 minut',
      title: 'Sejdeme se',
      body: 'Online hovor. Podíváme se, kde vám AI ušetří nejvíc času. Pokud to nemá smysl, řeknu vám to rovnou.'
    },
    {
      n: '2',
      time: '~1 týden',
      title: 'Nastavíme',
      body: 'Napojíme AI na vaše emaily a dokumenty. Bezpečně, u vás ve firmě. Začínáme tím, co přinese nejrychlejší výsledek.'
    },
    {
      n: '3',
      time: 'Průběžně',
      title: 'Roste to s vámi',
      body: 'Každý měsíc přidáváme další schopnosti — podle toho, co se osvědčilo. Vy rozhodujete, co má AI dělat dál.'
    },
  ];

  return (
    <section className="section section--soft" id="proces">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Jak to probíhá</span>
          <h2>Tři kroky.<br />Žádné překvapení.</h2>
          <p>
            Spolupráce není projekt na rok dopředu. Začneme malým krokem,
            který se vyplatí, a stavíme dál na výsledcích.
          </p>
        </div>

        <div className="process">
          {steps.map((s) => (
            <div key={s.n} className="step">
              <div className="step__num">{s.n}</div>
              <div className="step__body">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <div className="step__time">{s.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Process = Process;
