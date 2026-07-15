// CTAStrip.jsx — mid-page mini-CTA bands
function CTAStrip({ title, sub, btn = 'Domluvit hovor (20 min)', href = '#kontakt', variant = 'light' }) {
  return (
    <section className={"cta-strip cta-strip--" + variant}>
      <div className="container">
        <div className="cta-strip__inner">
          <div>
            <h3 className="cta-strip__title">{title}</h3>
            {sub && <p className="cta-strip__sub">{sub}</p>}
          </div>
          <a href={href} className="btn btn--blue btn--lg cta-strip__btn">
            {btn}
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

window.CTAStrip = CTAStrip;
