// Pricing.jsx — two simple cards
function Pricing() {
  return (
    <section className="section" id="cena">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Cena</span>
          <h2>Jednoduchá cena.<br />Bez skrytých poplatků.</h2>
          <p>
            Žádné účtování za každý dotaz. Žádný počet uživatelů. Jedno nastavení a stálý měsíční paušál,
            ve kterém je všechno — provoz, rozvoj i podpora.
          </p>
        </div>

        <div className="pricing">
          <div className="price-card">
            <div className="price-card__tag">Krok 1 · jednorázově</div>
            <h3>Úvodní nastavení</h3>
            <div className="price-amount">
              50 000 Kč
              <span className="unit">jednorázově</span>
            </div>
            <p className="price-card__sub">
              Napojení AI na vaše systémy, nastavení asistenta, bezpečnost a přístupy.
              Hotovo přibližně za týden.
            </p>
            <ul className="price-card__list">
              <li>Napojení na emaily a dokumenty</li>
              <li>Nastavení AI asistenta na míru firmě</li>
              <li>Bezpečné přístupy a oprávnění</li>
              <li>Zaškolení vás i vašeho týmu</li>
            </ul>
          </div>

          <div className="price-card price-card--feature">
            <div className="price-card__tag">Krok 2 · měsíčně</div>
            <h3>Provoz a rozvoj</h3>
            <div className="price-amount">
              15 000 Kč
              <span className="unit">/ měsíc</span>
            </div>
            <p className="price-card__sub">
              Vše v jedné ceně. Žádné dohadování, žádné účtování po hodinách.
              Revize každý kvartál — co funguje, co přidat.
            </p>
            <ul className="price-card__list">
              <li>Provoz a údržba asistenta</li>
              <li>Průběžný rozvoj a nové schopnosti</li>
              <li>Podpora, když něco nejde</li>
              <li>Kvartální revize a směr na další období</li>
            </ul>
          </div>
        </div>

        <p className="price-note">
          Ceny bez DPH. Žádné skryté poplatky. Žádné účtování za každý dotaz.
        </p>
      </div>
    </section>
  );
}

window.Pricing = Pricing;
