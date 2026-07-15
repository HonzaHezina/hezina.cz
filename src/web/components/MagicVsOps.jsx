// MagicVsOps.jsx — manifest with client-language flow log
function MagicVsOps() {
  const demo = ['Méně klikání', 'Rychlý výsledek', 'Kouzelný pocit', 'Pěkné demo'];
  const ops  = ['Vidíte, co AI dělá', 'Vy schvalujete, ne AI', 'Můžete to kdykoli zkontrolovat', 'Když je problém, víte proč'];

  return (
    <section className="section section--soft" id="magie">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Manifest</span>
          <h2>Magie je skvělá.<br /><span className="serif">Do první chyby.</span></h2>
          <p>
            Většina AI nástrojů prodává kouzlo. Funguje to do prvního selhání —
            pak nikdo neví, co se stalo, kdo za to může, a jak to opravit.
            Já stavím systém, ne kouzlo.
          </p>
        </div>

        <div className="mvo">
          <div className="mvo__col mvo__col--demo">
            <div className="mvo__head">
              <span className="mvo__tag">V demu vítězí</span>
              <h3>Kouzlo</h3>
            </div>
            <ul>{demo.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <p className="mvo__note">Funguje, dokud nespadne. Pak začne hledání viníka.</p>
          </div>

          <div className="mvo__divider"><span className="serif">vs.</span></div>

          <div className="mvo__col mvo__col--ops">
            <div className="mvo__head">
              <span className="mvo__tag">V provozu vítězí</span>
              <h3>Systém</h3>
            </div>
            <ul>{ops.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <p className="mvo__note">
              U každé akce vidíte, kdo ji spustil, kdo schválil a co se stalo.
            </p>
          </div>
        </div>

        <div className="flow-log" aria-hidden="true">
          <div className="flow-log__head">
            <span>Příklad jedné akce</span>
            <span className="flow-log__ok"><span className="dot-pulse"></span> Hotovo</span>
          </div>
          <div className="flow-log__steps">
            <div className="flow-log__step">
              <span className="flow-log__time">14:02</span>
              <span className="flow-log__what">Přišel email od klienta</span>
            </div>
            <div className="flow-log__arrow">→</div>
            <div className="flow-log__step">
              <span className="flow-log__time">14:02</span>
              <span className="flow-log__what">AI připravila odpověď</span>
            </div>
            <div className="flow-log__arrow">→</div>
            <div className="flow-log__step flow-log__step--human">
              <span className="flow-log__time">14:02</span>
              <span className="flow-log__what">Vy jste schválili</span>
            </div>
            <div className="flow-log__arrow">→</div>
            <div className="flow-log__step flow-log__step--done">
              <span className="flow-log__time">14:02</span>
              <span className="flow-log__what">Odesláno klientovi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.MagicVsOps = MagicVsOps;
