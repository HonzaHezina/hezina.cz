// FitCheck.jsx — 5-question self-diagnostic quiz
const { useState: useStateFC } = React;

const QUESTIONS = [
  {
    q: 'Kolik lidí máte ve firmě?',
    options: [
      { label: '1–4', score: { audit: 2, training: 3, implement: 0, wait: 1 } },
      { label: '5–15', score: { audit: 2, training: 2, implement: 3, wait: 0 } },
      { label: '16–50', score: { audit: 1, training: 2, implement: 4, wait: 0 } },
      { label: '50+', score: { audit: 2, training: 1, implement: 4, wait: 0 } },
    ],
  },
  {
    q: 'Trávíte hodně času rutinou (emaily, dokumenty, faktury)?',
    options: [
      { label: 'Ano, denně několik hodin', score: { audit: 1, training: 1, implement: 5, wait: 0 } },
      { label: 'Tu a tam', score: { audit: 3, training: 2, implement: 1, wait: 0 } },
      { label: 'Spíš ne', score: { audit: 1, training: 1, implement: 0, wait: 3 } },
    ],
  },
  {
    q: 'Máte základní pořádek v datech (emaily, složky, systémy)?',
    options: [
      { label: 'Ano, máme to docela srovnané', score: { audit: 1, training: 1, implement: 4, wait: 0 } },
      { label: 'Tak napůl', score: { audit: 3, training: 2, implement: 2, wait: 0 } },
      { label: 'Chaos', score: { audit: 4, training: 1, implement: 0, wait: 1 } },
    ],
  },
  {
    q: 'Co od AI primárně chcete?',
    options: [
      { label: 'Ušetřit konkrétní hodiny týdně', score: { audit: 1, training: 1, implement: 5, wait: 0 } },
      { label: 'Naučit tým AI používat', score: { audit: 1, training: 5, implement: 1, wait: 0 } },
      { label: 'Zjistit, co je vůbec možné', score: { audit: 5, training: 2, implement: 0, wait: 0 } },
      { label: 'Zatím nevím', score: { audit: 4, training: 2, implement: 0, wait: 1 } },
    ],
  },
  {
    q: 'Kdy chcete začít vidět výsledky?',
    options: [
      { label: 'Hned, je to bolavé', score: { audit: 0, training: 1, implement: 5, wait: 0 } },
      { label: 'Do měsíce', score: { audit: 2, training: 3, implement: 3, wait: 0 } },
      { label: 'Spíš si zjišťuji', score: { audit: 4, training: 2, implement: 1, wait: 1 } },
      { label: 'Nemáme spěch', score: { audit: 3, training: 2, implement: 1, wait: 2 } },
    ],
  },
];

const VERDICTS = {
  implement: {
    title: 'Jste připraveni na implementaci.',
    body: 'Vaše firma má jasnou rutinu, data v pořádku a víte, co chcete. Doporučuji rovnou plnou implementaci AI asistenta. Návratnost typicky za 4–8 týdnů.',
    cta: 'Domluvit hovor o implementaci',
    href: '#kontakt',
    accent: 'oklch(0.48 0.14 252)',
  },
  audit: {
    title: 'Začněte auditem.',
    body: 'Než investujete do implementace, vyplatí se zmapovat procesy a najít, kde AI dává smysl. Audit za 20 000 Kč vám dá konkrétní plán — i kdybyste pokračovali bez mě.',
    cta: 'Mám zájem o audit',
    href: '#sluzby',
    accent: 'oklch(0.55 0.16 230)',
  },
  training: {
    title: 'Začněte školením.',
    body: 'Než nasazovat systém, dává smysl, aby tým uměl AI používat denně (ChatGPT, Claude). Půldenní workshop za 15 000 Kč — pak se uvidí, jestli implementace dává smysl.',
    cta: 'Domluvit školení',
    href: '#sluzby',
    accent: 'oklch(0.52 0.16 145)',
  },
  wait: {
    title: 'Možná na to ještě počkejte.',
    body: 'Z odpovědí to vypadá, že AI investice u vás teď nedá smysl. Raději vám to řeknu rovnou, než abychom si oba brali čas. Sledujte to za půl roku — ozvěte se, až bude bolet.',
    cta: 'Stejně se chci ozvat',
    href: '#kontakt',
    accent: 'oklch(0.52 0.06 50)',
  },
};

function FitCheck() {
  const [step, setStep] = useStateFC(0);
  const [answers, setAnswers] = useStateFC([]);
  const [done, setDone] = useStateFC(false);

  function pick(idx) {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0); setAnswers([]); setDone(false);
  }

  function getVerdict() {
    const totals = { audit: 0, training: 0, implement: 0, wait: 0 };
    answers.forEach((aIdx, qIdx) => {
      const s = QUESTIONS[qIdx].options[aIdx].score;
      Object.keys(s).forEach((k) => { totals[k] += s[k]; });
    });
    const winner = Object.keys(totals).reduce((a, b) => totals[a] >= totals[b] ? a : b);
    return { winner, totals };
  }

  const progress = ((step) / QUESTIONS.length) * 100;
  const current = QUESTIONS[step];

  return (
    <section className="section section--soft" id="diagnostika">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}><span className="dot"></span>Diagnostika · 60 vteřin</span>
          <h2 style={{ textAlign: 'center' }}>Je AI pro vaši firmu?<br /><span className="serif">Zjistěte si to.</span></h2>
          <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            5 otázek, žádný email, žádná registrace. Na konci dostanete konkrétní
            doporučení, jestli začít implementací, školením, auditem — nebo počkat.
          </p>
        </div>

        <div className="fc">
          {!done ? (
            <React.Fragment>
              <div className="fc__progress">
                <div className="fc__progress-bar" style={{ width: progress + '%' }}></div>
                <div className="fc__progress-label mono">
                  Otázka {step + 1} z {QUESTIONS.length}
                </div>
              </div>

              <div className="fc__question" key={step}>
                <h3 className="fc__q">{current.q}</h3>
                <div className="fc__options">
                  {current.options.map((o, i) => (
                    <button
                      key={i}
                      type="button"
                      className="fc__option"
                      onClick={() => pick(i)}
                    >
                      <span className="fc__option-key mono">{String.fromCharCode(65 + i)}</span>
                      <span className="fc__option-label">{o.label}</span>
                      <span className="fc__option-arrow">→</span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button type="button" className="fc__back" onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}>
                    ← Zpět
                  </button>
                )}
              </div>
            </React.Fragment>
          ) : (
            <Verdict verdict={VERDICTS[getVerdict().winner]} reset={reset} />
          )}
        </div>
      </div>
    </section>
  );
}

function Verdict({ verdict, reset }) {
  return (
    <div className="fc__verdict" style={{ '--accent': verdict.accent }}>
      <div className="fc__verdict-tag mono">Doporučení pro vás</div>
      <h3 className="fc__verdict-title">{verdict.title}</h3>
      <p className="fc__verdict-body">{verdict.body}</p>
      <div className="fc__verdict-actions">
        <a href={verdict.href} className="btn btn--blue btn--lg">
          {verdict.cta}
          <span className="arrow">→</span>
        </a>
        <button type="button" className="btn btn--ghost" onClick={reset}>
          Spustit znovu
        </button>
      </div>
    </div>
  );
}

window.FitCheck = FitCheck;
