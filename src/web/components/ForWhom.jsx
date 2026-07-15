// ForWhom.jsx — pro koho ano / ne
function ForWhom() {
  const yes = [
    'Firmy s 5–50 lidmi, kde lidi tráví hodiny rutinou',
    'Majitelé, kteří chtějí AI, ale ne chaos',
    'Firmy, které chtějí mít svá data pod kontrolou',
    'Lidi, kteří už něco zkusili a chtějí to dotáhnout',
  ];
  const no = [
    'Kdo hledá nejlevnějšího chatbota',
    'Kdo chce „AI za 5 minut" bez přemýšlení',
    'Kdo nemá čas ani na 20minutový hovor',
    'Kdo nechce, aby to ve firmě někdo schvaloval',
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Pro koho to je</span>
          <h2>Buďme upřímní.<br />Není to pro každého.</h2>
          <p>
            Raději hned řeknu, kdy spolupráce nedává smysl, než abychom si oba
            zbytečně brali čas. Tady je můj filtr.
          </p>
        </div>

        <div className="fw-grid">
          <div className="fw fw--yes">
            <h3>
              <span className="fw__badge">Pro koho ano</span>
            </h3>
            <ul className="fw__list">
              {yes.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="fw fw--no">
            <h3>
              <span className="fw__badge">Pro koho ne</span>
            </h3>
            <ul className="fw__list">
              {no.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ForWhom = ForWhom;
