// DayWith.jsx — interactive timeline "Den s Jarvisem"
const { useState: useStateDay } = React;

const DAY_EVENTS = [
  {
    time: '07:30',
    title: 'Ráno: shrnutí přes noc',
    body: 'Než dorazíte do kanceláře, AI prošla přes noc 47 emailů. Prioritní 3 jsou nahoře, návrhy odpovědí připravené, zbytek odmazán nebo odložen.',
    output: '3 emaily čekají na vás · 8 vyřešeno automaticky · 36 archiv',
  },
  {
    time: '09:15',
    title: 'Klient volá',
    body: 'Volá pan Novák. Ptáte se Jarvise: „Co je s jeho zakázkou?" Za 2 vteřiny máte stav, poslední emaily i platby — během hovoru.',
    output: 'Termín 12. 5. · čeká schválení doložky · poslední platba 22. 4.',
  },
  {
    time: '11:00',
    title: 'Schůzka s týmem',
    body: 'Před schůzkou: „Připrav mi přehled za tento týden." AI shrne, co se hnulo, kde jsou skluzy, kde je třeba rozhodnutí. Žádné rozkopávání tabulek.',
    output: '2 zakázky v termínu · 1 skluz 3 dny · 4 čekají na vaše rozhodnutí',
  },
  {
    time: '14:30',
    title: 'Hledání smlouvy',
    body: 'Potřebujete dodatek smlouvy s ABC z minulého roku. „Najdi mi dodatek 2 ke smlouvě ABC." AI to najde dřív, než byste otevřeli složku.',
    output: 'Dodatek_ABC_2.pdf · podepsán 14. 3. 2025 · stále platný',
  },
  {
    time: '16:45',
    title: 'Faktury na zítra',
    body: '„Co musím zítra zaplatit?" AI vyjede splatnost, částky a přiloží návrh příkazu. Vy jen mrknete a schválíte v bance.',
    output: '4 faktury · 187 340 Kč · příkaz připraven',
  },
  {
    time: '17:30',
    title: 'Konec dne',
    body: 'Před odchodem: „Připrav co mám nejdřív zítra." Krátký itinerář na ráno. Žádné překvapení.',
    output: '8:30 hovor s Petrou · 10:00 schůzka Novák · 13:00 oběd s ABC',
  },
];

function DayWith() {
  const [active, setActive] = useStateDay(0);
  const e = DAY_EVENTS[active];

  return (
    <section className="section" id="den">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Den s Jarvisem</span>
          <h2>Jeden běžný den<br />s AI po ruce.</h2>
          <p>
            Klikněte na hodiny a uvidíte, co Jarvis dělá v tu chvíli za vás.
            Nic abstraktního — konkrétní situace, které u vás ve firmě nastávají denně.
          </p>
        </div>

        <div className="day">
          <div className="day__rail" role="tablist" aria-label="Časová osa dne">
            {DAY_EVENTS.map((ev, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                className={"day__tick" + (i === active ? " is-active" : "") + (i < active ? " is-past" : "")}
                onClick={() => setActive(i)}
              >
                <span className="day__time">{ev.time}</span>
                <span className="day__title-mini">{ev.title.split(':')[0]}</span>
              </button>
            ))}
            <div className="day__progress" style={{ '--pct': ((active) / (DAY_EVENTS.length - 1)) * 100 + '%' }}></div>
          </div>

          <div className="day__panel" key={active}>
            <div className="day__panel-time">{e.time}</div>
            <h3 className="day__panel-title">{e.title}</h3>
            <p className="day__panel-body">{e.body}</p>

            <div className="day__output">
              <span className="day__output-label">Co dostanete</span>
              <code>{e.output}</code>
            </div>

            <div className="day__nav">
              <button
                type="button" className="btn btn--ghost btn--sm"
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
              >← Dřív</button>
              <span className="day__counter mono">{active + 1} / {DAY_EVENTS.length}</span>
              <button
                type="button" className="btn btn--ghost btn--sm"
                onClick={() => setActive((a) => Math.min(DAY_EVENTS.length - 1, a + 1))}
                disabled={active === DAY_EVENTS.length - 1}
              >Později →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.DayWith = DayWith;
