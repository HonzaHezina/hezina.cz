// Calculator.jsx — interactive savings calculator
const { useState: useStateCalc, useMemo: useMemoCalc } = React;

function Calculator() {
  const [emailHours, setEmailHours] = useStateCalc(8);
  const [docHours, setDocHours] = useStateCalc(5);
  const [people, setPeople] = useStateCalc(8);
  const [hourlyRate, setHourlyRate] = useStateCalc(800);

  const stats = useMemoCalc(() => {
    const totalHoursPerWeek = (emailHours + docHours) * people;
    // AI saves ~60% of email time, ~40% of doc time
    const savedPerWeek = (emailHours * 0.6 + docHours * 0.4) * people;
    const savedPerMonth = savedPerWeek * 4.33;
    const savedPerYear = savedPerWeek * 52;
    const moneyPerMonth = Math.round(savedPerMonth * hourlyRate);
    const moneyPerYear = Math.round(savedPerYear * hourlyRate);
    const monthlyROIWeeks = Math.round((15000 / (savedPerWeek * hourlyRate)) * 10) / 10;
    return {
      totalHoursPerWeek: Math.round(totalHoursPerWeek),
      savedPerWeek: Math.round(savedPerWeek),
      savedPerMonth: Math.round(savedPerMonth),
      savedPerYear: Math.round(savedPerYear),
      moneyPerMonth,
      moneyPerYear,
      monthlyROIWeeks: isFinite(monthlyROIWeeks) ? monthlyROIWeeks : 0,
    };
  }, [emailHours, docHours, people, hourlyRate]);

  return (
    <section className="section section--soft" id="kalkulacka">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Kalkulačka</span>
          <h2>Kolik vám AI<br />reálně ušetří?</h2>
          <p>
            Nastavte vlastní firmu. Spočítáme, kolik hodin a peněz vám AI asistent
            vrátí za týden, měsíc i rok. Bez registrace, jen pohnete posuvníky.
          </p>
        </div>

        <div className="calc">
          <div className="calc__inputs">
            <CalcSlider
              label="Hodin týdně na emailech"
              hint="Kolik hodin průměrný člověk u vás stráví v inboxu?"
              value={emailHours} setValue={setEmailHours}
              min={1} max={25} step={1} unit="h"
            />
            <CalcSlider
              label="Hodin týdně v dokumentech"
              hint="Hledání ve smlouvách, fakturách, nabídkách."
              value={docHours} setValue={setDocHours}
              min={0} max={20} step={1} unit="h"
            />
            <CalcSlider
              label="Kolik lidí u vás má tuhle rutinu"
              hint="Kdo opakovaně řeší podobné úkoly."
              value={people} setValue={setPeople}
              min={1} max={50} step={1} unit=""
            />
            <CalcSlider
              label="Hodinová sazba (Kč)"
              hint="Hrubá cena hodiny zaměstnance vč. odvodů."
              value={hourlyRate} setValue={setHourlyRate}
              min={300} max={2500} step={50} unit="Kč"
            />
          </div>

          <div className="calc__output">
            <div className="calc__big">
              <div className="calc__big-label">AI vám vrátí ročně</div>
              <div className="calc__big-num">
                {fmt(stats.savedPerYear)}
                <span className="calc__big-unit">hodin</span>
              </div>
              <div className="calc__big-sub">
                ≈ {fmt(stats.moneyPerYear)} Kč úspory za rok
              </div>
            </div>

            <div className="calc__rows">
              <div className="calc__row">
                <span>Týdně</span>
                <strong>{fmt(stats.savedPerWeek)} h</strong>
              </div>
              <div className="calc__row">
                <span>Měsíčně</span>
                <strong>{fmt(stats.savedPerMonth)} h · {fmt(stats.moneyPerMonth)} Kč</strong>
              </div>
              <div className="calc__row calc__row--accent">
                <span>Měsíční paušál se zaplatí za</span>
                <strong>{stats.monthlyROIWeeks} {pluralWeeks(stats.monthlyROIWeeks)}</strong>
              </div>
            </div>

            <a href="#kontakt" className="btn btn--blue btn--lg" style={{ width: '100%' }}>
              Domluvit hovor o vašem případu
              <span className="arrow">→</span>
            </a>
            <p className="calc__disclaimer">
              Výpočet je orientační. AI obvykle ušetří 40–60 % času na rutinních úkolech.
              Skutečnou úsporu spočítáme na 20min hovoru z vašich konkrétních procesů.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcSlider({ label, hint, value, setValue, min, max, step, unit }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="calc-slider">
      <div className="calc-slider__top">
        <label>{label}</label>
        <span className="calc-slider__value">
          {fmt(value)} <span>{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ '--pct': pct + '%' }}
      />
      <div className="calc-slider__hint">{hint}</div>
    </div>
  );
}

function fmt(n) {
  return new Intl.NumberFormat('cs-CZ').format(Math.round(n));
}
function pluralWeeks(n) {
  if (n < 1.5) return 'týden';
  if (n < 5) return 'týdny';
  return 'týdnů';
}

window.Calculator = Calculator;
