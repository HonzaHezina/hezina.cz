// Nav.jsx — sticky top nav with mobile menu
const { useState, useEffect } = React;

function Nav({ tweaks, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menu on link click
  const close = () => setOpen(false);

  // lock body when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    ['#sluzby', 'Co nabízím'],
    ['#den', 'Jak to vypadá'],
    ['#diagnostika', 'Je to pro vás?'],
    ['#cena', 'Cena'],
    ['#kontakt', 'Kontakt'],
  ];

  return (
    <React.Fragment>
      <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
        <div className="container nav__inner">
          <a href="#top" className="brand" onClick={close}>
            <span className="brand__mark">JH</span>
            <span>Jan Hezina</span>
            <span className="brand__sub">— AI pro firmu</span>
          </a>

          <nav className="nav__links" aria-label="Sekce">
            {links.map(([h, l]) => (
              <a key={h} href={h}>{l}</a>
            ))}
          </nav>

          <div className="nav__cta">
            <button
              type="button"
              className="theme-btn"
              aria-label={theme === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
              title={theme === 'dark' ? 'Světlý režim' : 'Tmavý režim'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <a href="#kontakt" className="btn btn--ghost btn--sm">Domluvit hovor</a>
            <a href="#kontakt" className="btn btn--primary btn--sm" style={{display: 'none'}}>Kontakt</a>
            <button
              className="nav__burger"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={"mobile-menu" + (open ? " is-open" : "")}>
        {links.map(([h, l]) => (
          <a key={h} href={h} onClick={close}>{l}</a>
        ))}
        <a href="#kontakt" onClick={close} style={{color: 'var(--blue-deep)', fontWeight: 600}}>
          Domluvit hovor →
        </a>
      </div>
    </React.Fragment>
  );
}

window.Nav = Nav;
