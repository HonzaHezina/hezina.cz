// Contact.jsx — final CTA + form
const { useState: useStateContact } = React;

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    setErrs(e => ({ ...e, [k]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Jak vám mám říkat?';
    if (!form.email.trim()) e.email = 'Bez emailu se vám neozvu.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Tohle nevypadá jako email.';
    if (!form.msg.trim()) e.msg = 'Napište pár slov o tom, co řešíte.';
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  }

  return (
    <section className="section" id="kontakt">
      <div className="container">
        <div className="contact">
          <div>
            <span className="eyebrow" style={{color: 'oklch(0.78 0.12 230)'}}>
              <span className="dot" style={{background: 'oklch(0.78 0.12 230)'}}></span>
              Kontakt
            </span>
            <h2 style={{marginTop: 14}}>
              Zavolejte mi nebo napište.
            </h2>
            <p>
              Během 20 minut zjistíme, jestli vám AI ušetří čas. Pokud ne,
              řeknu vám to rovnou — a oba ušetříme den. Žádný prodejní tlak.
            </p>

            <div className="contact-card" style={{marginTop: 32}}>
              <a className="contact-card__row" href="mailto:info@hezina.cz">
                <span className="label">Email</span>
                <span>info@hezina.cz</span>
                <span className="arrow">→</span>
              </a>
              <a className="contact-card__row" href="tel:+420000000000">
                <span className="label">Telefon</span>
                <span>+420 ___ ___ ___</span>
                <span className="arrow">→</span>
              </a>
              <a className="contact-card__row" href="https://www.linkedin.com/in/jan-hezina/" target="_blank" rel="noopener">
                <span className="label">LinkedIn</span>
                <span>jan-hezina</span>
                <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div style={{position: 'relative', zIndex: 1}}>
            {sent ? (
              <div className="cform">
                <div className="ok">
                  <strong style={{display: 'block', marginBottom: 6}}>Děkuji, mám to.</strong>
                  Ozvu se vám během dneška nebo nejpozději zítra dopoledne.
                  Mezitím můžete v klidu zavřít okno.
                </div>
              </div>
            ) : (
              <form className="cform" onSubmit={submit} noValidate>
                <div>
                  <label htmlFor="cf-name">Jméno</label>
                  <input
                    id="cf-name" type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="Jan Novák"
                    autoComplete="name"
                  />
                  {errs.name && <div className="err">{errs.name}</div>}
                </div>
                <div>
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email" type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="vy@firma.cz"
                    autoComplete="email"
                  />
                  {errs.email && <div className="err">{errs.email}</div>}
                </div>
                <div>
                  <label htmlFor="cf-msg">Co byste chtěli ve firmě zrychlit?</label>
                  <textarea
                    id="cf-msg" rows="3"
                    value={form.msg}
                    onChange={e => update('msg', e.target.value)}
                    placeholder={'Pár vět stačí. Třeba: „Trávíme moc času hledáním v emailech a smlouvách."'}
                  />
                  {errs.msg && <div className="err">{errs.msg}</div>}
                </div>
                <button type="submit" className="btn btn--blue btn--lg" style={{width: '100%', marginTop: 8}}>
                  Domluvit hovor (20 min)
                  <span className="arrow">→</span>
                </button>
                <p style={{fontSize: 12, color: 'oklch(0.66 0.014 250)', marginTop: 4, textAlign: 'center'}}>
                  Odpovídám obvykle do 24 hodin.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Contact = Contact;
