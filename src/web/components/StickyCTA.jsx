// StickyCTA.jsx — floating "Domluvit hovor" button after hero scroll
const { useState: useStateSticky, useEffect: useEffectSticky } = React;

function StickyCTA() {
  const [show, setShow] = useStateSticky(false);

  useEffectSticky(() => {
    const onScroll = () => {
      // show after 600px scroll, hide near footer
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > 700 && y < max - 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#kontakt"
      className={"sticky-cta" + (show ? " is-visible" : "")}
      aria-label="Domluvit hovor"
    >
      <span className="sticky-cta__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
        </svg>
      </span>
      <span className="sticky-cta__label">Domluvit hovor</span>
      <span className="sticky-cta__arrow">→</span>
    </a>
  );
}

window.StickyCTA = StickyCTA;
