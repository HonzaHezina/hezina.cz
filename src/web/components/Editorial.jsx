// Editorial.jsx — full-bleed serif typography moment
function Editorial() {
  return (
    <section className="editorial">
      <div className="container">
        <div className="editorial__inner">
          <span className="editorial__kicker mono">Co tady opravdu prodávám</span>
          <blockquote className="editorial__quote">
            <span className="editorial__quote-mark">„</span>
            Klid v hlavě, když&nbsp;přijde&nbsp;email
            <span className="editorial__accent serif"> v&nbsp;pátek odpoledne.</span>
            <span className="editorial__quote-mark editorial__quote-mark--end">"</span>
          </blockquote>
          <div className="editorial__sub">
            <span>Ne AI. Ne automatizaci. Ne efektivitu.</span>
            <span>Klid, který přichází, když víte, že to běží <em className="serif">bez vás</em>.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Editorial = Editorial;
