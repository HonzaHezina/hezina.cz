// FAQ.jsx — accordion of typical client concerns
const { useState: useStateFaq } = React;

const FAQ_ITEMS = [
  {
    q: 'Kde budou naše data? Neutečou někam ven?',
    a: 'Data zůstávají u vás — buď přímo na vašem serveru, nebo v cloudu, který vám patří. AI model k nim přistupuje, ale nic neukládá ven. Můžeme nasadit i variantu, kde model běží lokálně, bez internetu. Smlouva o ochraně dat je samozřejmostí.',
  },
  {
    q: 'Co když AI udělá chybu nebo pošle něco, co neměla?',
    a: 'AI nikdy nic neodesílá sama. Citlivé kroky — emaily klientům, schvalování faktur, změny smluv — vždy projdou vámi nebo pověřenou osobou. AI navrhne, vy schválíte. Žádné překvapení.',
  },
  {
    q: 'Co když přestaneme spolupracovat?',
    a: 'Žádný vendor lock-in. Předám vám runbook, přístupy, dokumentaci. Systém běží dál, i kdybych zítra zmizel. Můžete najmout jiného konzultanta, převzít to interně, nebo vypnout. Vaše rozhodnutí.',
  },
  {
    q: 'Splňuje to GDPR a české zákony?',
    a: 'Ano. Pracujeme jen s tím, co máte legitimně zpracované, audit log zaznamenává všechny operace. U citlivých dat (zdravotní, osobní citlivá data) doporučím lokální nasazení. Smlouva o zpracování osobních údajů je standard.',
  },
  {
    q: 'Kolik to ve skutečnosti stojí dohromady?',
    a: '50 000 Kč jednorázové nastavení + 15 000 Kč měsíčně. Tečka. Žádné skryté poplatky, žádné účtování za dotazy ani uživatele. V měsíčním paušálu je provoz, podpora i průběžný rozvoj. Po roce platíte 230 000 Kč — typická úspora je násobně víc.',
  },
  {
    q: 'Náš tým není technický. Zvládne to používat?',
    a: 'AI ovládáte stejně jako kohokoli jiného — píšete mu (nebo mluvíte) přirozenou češtinou. Zaučení trvá 1–2 hodiny. Pokud někdo umí napsat email, zvládne i Jarvise. Postupně se i AI učí, jak váš tým mluví.',
  },
  {
    q: 'Za jak dlouho uvidíme výsledek?',
    a: 'První funkční verze běží do týdne od podpisu. Reálnou úsporu času začnete měřit od druhého týdne. Plný efekt — kdy AI zná vaši firmu — přichází po ~2 měsících provozu.',
  },
  {
    q: 'Co když chceme přidat další věci později?',
    a: 'O to to celé je. Začínáme malým funkčním kouskem, který se vyplatí, a každý měsíc přidáváme další. V kvartální revizi se rozhodneme, co dává smysl dál. Vy řídíte tempo.',
  },
];

function FAQ() {
  const [open, setOpen] = useStateFaq(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Časté dotazy</span>
          <h2>Co se klienti<br />ptají nejčastěji.</h2>
          <p>
            Otázky, které dostávám na prvním hovoru. Když nenajdete tu vaši,
            napište mi přímo — odpovím obratem.
          </p>
        </div>

        <div className="faq">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="faq__item"
              open={open === i}
              onClick={(e) => { e.preventDefault(); setOpen(open === i ? -1 : i); }}
            >
              <summary className="faq__summary">
                <span className="faq__num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq__q">{item.q}</span>
                <span className="faq__chev" aria-hidden="true">+</span>
              </summary>
              <div className="faq__a">{item.a}</div>
            </details>
          ))}
        </div>

        <div className="faq__cta">
          <p>Vaše otázka tu není?</p>
          <a href="#kontakt" className="btn btn--ghost">Napište mi →</a>
        </div>
      </div>
    </section>
  );
}

window.FAQ = FAQ;
