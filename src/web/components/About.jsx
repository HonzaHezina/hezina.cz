// About.jsx — proč já
function About() {
  return (
    <section className="section section--soft" id="o-mne">
      <div className="container">
        <div className="about-grid">
          <div className="about-portrait" aria-hidden="true">
            <span className="ph">portrét · Jan Hezina</span>
          </div>

          <div>
            <span className="eyebrow"><span className="dot"></span>Proč já</span>
            <p className="about__quote" style={{marginTop: 18}}>
              Nestavím demo pro prezentaci. Stavím systém, který běží.
            </p>
            <p className="about__body">
              Jsem Jan Hezina. 20+ let v IT systémech pro firmy — ERP, CRM, dokumenty, procesy.
              Poslední roky stavím AI asistenty, kteří reálně fungují v provozu, ne jen vypadají dobře na schůzce.
              Nejdřív se s vámi podívám, jestli to vůbec má smysl automatizovat. Pokud ne, řeknu to rovnou.
              Žádný vendor lock-in — vaše data, váš systém, vaše pravidla.
            </p>

            <div className="about__creds">
              <div className="about__cred">
                <strong>20+&nbsp;let</strong>
                <span>v podnikovém IT</span>
              </div>
              <div className="about__cred">
                <strong>~1&nbsp;týden</strong>
                <span>od hovoru k běžícímu asistentovi</span>
              </div>
              <div className="about__cred">
                <strong>0&nbsp;Kč</strong>
                <span>za závislost na dodavateli</span>
              </div>
              <div className="about__cred">
                <strong>100&nbsp;%</strong>
                <span>vaše data zůstávají vaše</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
