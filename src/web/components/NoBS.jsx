// NoBS.jsx — anti-buzzword strip
function NoBS() {
  const rejected = [
    'transformace', 'disrupce', 'revoluce', 'paradigm shift',
    '10× zrychlení', 'AI-first', 'next-gen', 'synergie',
    'inovativní řešení', 'industry 4.0',
  ];
  const kept = [
    'konkrétní ceny', 'konkrétní hodiny', 'konkrétní reference',
    'co AI umí', 'co neumí', 'kdy to nedává smysl',
  ];

  return (
    <section className="nobs">
      <div className="container">
        <div className="nobs__grid">
          <div className="nobs__col nobs__col--out">
            <div className="nobs__label">Tady nenajdete</div>
            <ul className="nobs__list nobs__list--strike">
              {rejected.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
          <div className="nobs__col nobs__col--in">
            <div className="nobs__label">Najdete</div>
            <ul className="nobs__list">
              {kept.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

window.NoBS = NoBS;
