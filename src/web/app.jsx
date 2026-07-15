// app.jsx — root with reorganized flow for conversion
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "jarvis",
  "showCalculator": true,
  "showDay": true,
  "showCases": true,
  "showFAQ": true
}/*EDITMODE-END*/;

function useTheme() {
  const [theme, setTheme] = useStateApp(() => {
    try {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    } catch (e) { return 'light'; }
  });

  useEffectApp(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('hez_theme', theme); } catch (e) {}
  }, [theme]);

  return [theme, setTheme];
}

function App() {
  const [tweaks, setTweak, tweaksOpen] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useTheme();

  return (
    <React.Fragment>
      <Nav tweaks={tweaks} theme={theme} setTheme={setTheme} />
      <main>
        {/* ── HOOK ── */}
        <Hero tweaks={tweaks} />
        <NoBS />

        {/* ── KILLER DEMO ── */}
        {tweaks.showDay && <DayWith />}

        <CTAStrip
          title="Zní to dobře?"
          sub="20 minut zdarma. Podíváme se, kde u vás AI ušetří nejvíc času."
        />

        {/* ── OFFERINGS ── */}
        <Services />
        <Process />

        {/* ── PROOF ── */}
        {tweaks.showCases && <Cases />}
        {tweaks.showCalculator && <Calculator />}

        <CTAStrip
          title="Spočítali jste. Co dál?"
          sub="Pošlu vám nezávazný odhad pro vaši firmu. Bez prodejního tlaku."
          btn="Domluvit nezávazný hovor →"
        />

        {/* ── QUALIFY ── */}
        <FitCheck />

        {/* ── PHILOSOPHY & TRUST ── */}
        <MagicVsOps />
        <About />
        <ForWhom />
        <Pricing />

        {/* ── ANSWERS ── */}
        {tweaks.showFAQ && <FAQ />}

        {/* ── EMOTIONAL CLOSE ── */}
        <Editorial />

        {/* ── CONVERT ── */}
        <Contact />
      </main>
      <Footer />

      <StickyCTA />

      {tweaksOpen && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Vzhled">
            <TweakRadio
              label="Režim"
              value={theme}
              onChange={setTheme}
              options={[
                { value: 'light', label: 'Světlý' },
                { value: 'dark', label: 'Tmavý' },
              ]}
            />
          </TweakSection>
          <TweakSection title="Hero">
            <TweakRadio
              label="Hlavní nadpis"
              value={tweaks.headline}
              onChange={(v) => setTweak('headline', v)}
              options={[
                { value: 'jarvis', label: 'Jarvis' },
                { value: 'znalost', label: 'Zná firmu' },
                { value: 'rutina', label: 'Dělá rutinu' },
              ]}
            />
          </TweakSection>
          <TweakSection title="Sekce">
            <TweakToggle label="Den s Jarvisem" value={tweaks.showDay} onChange={(v) => setTweak('showDay', v)} />
            <TweakToggle label="Kalkulačka úspory" value={tweaks.showCalculator} onChange={(v) => setTweak('showCalculator', v)} />
            <TweakToggle label="Reference" value={tweaks.showCases} onChange={(v) => setTweak('showCases', v)} />
            <TweakToggle label="FAQ" value={tweaks.showFAQ} onChange={(v) => setTweak('showFAQ', v)} />
          </TweakSection>
        </TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
