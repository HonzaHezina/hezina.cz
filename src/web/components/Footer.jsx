// Footer.jsx
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>© {year} Jan Hezina · hezina.cz · <a href="https://janagi.org" target="_blank" rel="noopener" style={{borderBottom: '1px solid currentColor'}}>postaveno na janAGI</a></div>
        <div className="footer__links">
          <a href="#sluzby">Co nabízím</a>
          <a href="#cena">Cena</a>
          <a href="#kontakt">Kontakt</a>
          <a href="https://www.linkedin.com/in/jan-hezina/" target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
