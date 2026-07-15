// Stack.jsx — single client-friendly paragraph about janAGI (no tech jargon)
function Stack() {
  return (
    <section className="section" id="janagi">
      <div className="container">
        <div className="stack-simple">
          <span className="eyebrow"><span className="dot"></span>Bez vendor lock-inu</span>
          <h2>Postaveno na otevřené<br />platformě <a href="https://janagi.org" target="_blank" rel="noopener" className="janagi-link">janAGI</a>.</h2>
          <p>
            Váš systém běží na mé open-source platformě. Vaše data zůstávají vaše.
            Žádná závislost na jednom dodavateli — když zítra zmizím, runbook a přístupy
            přebíráte vy a systém běží dál.
          </p>
          <a href="https://janagi.org" target="_blank" rel="noopener" className="btn btn--ghost">
            Více o janAGI ↗
          </a>
        </div>
      </div>
    </section>
  );
}

window.Stack = Stack;
