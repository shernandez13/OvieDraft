import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #1a2244; --navy-dk: #151c38;
    --sky: #c8def0; --sky-pale: #ddeaf8;
    --white: #fff; --gray: #f0f2f5;
    --border: #d0d8e8; --muted: #6b7a90;
    --accent: #4a6fa8;
  }
  body { font-family: 'DM Sans', sans-serif; background: #111; min-height: 100vh; }

  /* PAGE */
  .page {
    background: var(--sky); min-height: calc(100vh - 58px);
    padding: 1.5rem 2rem; display: flex; align-items: flex-start; justify-content: center;
  }
  .layout {
    display: grid; grid-template-columns: 1fr 360px;
    gap: 1.5rem; width: 100%; max-width: 980px;
  }

  /* CALENDAR CARD */
  .cal-card {
    background: var(--white); border-radius: 14px;
    padding: 1.5rem 1.8rem;
    box-shadow: 0 2px 20px rgba(26,34,68,.09);
  }
  .cal-header {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.3rem;
  }
  .cal-nav-btn {
    background: none; border: none; cursor: pointer;
    font-size: 1.3rem; color: var(--navy); padding: .2rem .4rem;
    border-radius: 4px; transition: background .15s;
    line-height: 1;
  }
  .cal-nav-btn:hover { background: var(--gray); }
  .cal-month {
    font-weight: 700; font-size: 1.05rem; color: var(--navy);
    flex: 1; text-align: center; letter-spacing: .08em;
  }
  .cal-grid {
    display: grid; grid-template-columns: repeat(7,1fr);
    gap: .3rem;
  }
  .cal-day-name {
    text-align: center; font-size: .78rem; font-weight: 600;
    color: var(--muted); padding-bottom: .5rem;
  }
  .cal-day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    font-size: .88rem; color: var(--navy); border-radius: 50%;
    cursor: pointer; transition: background .15s;
    position: relative;
  }
  .cal-day:hover:not(.empty) { background: var(--sky-pale); }
  .cal-day.empty { cursor: default; }
  .cal-day.today {
    background: var(--navy); color: #fff; font-weight: 600;
  }
  .cal-day.selected {
    background: var(--sky); outline: 2px solid var(--accent);
  }
  .cal-day.period-day::after {
    content: ''; position: absolute; bottom: 3px;
    width: 5px; height: 5px; border-radius: 50%;
    background: #c0392b;
  }
  .cal-day.period-range { background: #fde8e8; color: var(--navy); }
  .cal-day.period-range.today { background: var(--navy); color: #fff; }

  .cal-range-label {
    display: flex; align-items: center; gap: .4rem;
    margin-top: 1rem; padding: .5rem .8rem;
    background: var(--sky-pale); border-radius: 8px;
    font-size: .82rem; color: var(--navy);
  }
  .range-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  .cal-actions {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1rem; margin-top: 1.4rem;
  }
  .btn-log {
    background: var(--navy); color: #fff; border: none;
    border-radius: 8px; padding: .8rem;
    font: 600 .9rem/1 'DM Sans',sans-serif; cursor: pointer;
    transition: background .18s, transform .14s;
  }
  .btn-log:hover { background: var(--navy-dk); transform: translateY(-1px); }
  .btn-edit {
    background: var(--navy); color: #fff; border: none;
    border-radius: 8px; padding: .8rem;
    font: 600 .9rem/1 'DM Sans',sans-serif; cursor: pointer;
    transition: background .18s, transform .14s;
  }
  .btn-edit:hover { background: var(--navy-dk); transform: translateY(-1px); }

  /* RIGHT PANEL */
  .right-panel { display: flex; flex-direction: column; gap: 1.2rem; }

  /* CONTRACEPTION REMINDER */
  .reminder-card { background: var(--white); border-radius: 14px; overflow: hidden; box-shadow: 0 2px 20px rgba(26,34,68,.09); }
  .reminder-header {
    background: var(--navy); padding: .85rem 1.3rem;
    font: 600 .95rem/1 'DM Sans',sans-serif; color: #fff; text-align: center;
  }
  .reminder-body { padding: 1rem 1.3rem; }
  .reminder-pill-row {
    display: flex; align-items: center; justify-content: space-between;
    background: #fff; border: 1.5px solid var(--border);
    border-radius: 10px; padding: .8rem 1rem;
    margin-bottom: .7rem;
  }
  .pill-info p { font-weight: 600; font-size: .9rem; color: var(--navy); margin-bottom: .15rem; }
  .pill-info span { font-size: .78rem; color: var(--accent); }
  .pill-dot {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--navy); display: flex; align-items: center; justify-content: center;
  }
  .pill-dot svg { width: 14px; height: 14px; }
  .last-period-txt { font-size: .8rem; color: var(--muted); }

  /* MY CALENDAR blurb */
  .my-cal-info { background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: .9rem 1rem; }
  .my-cal-info h4 { font-size: .9rem; font-weight: 700; color: var(--navy); margin-bottom: .35rem; }
  .my-cal-info p  { font-size: .78rem; color: var(--muted); line-height: 1.55; }

  /* SYMPTOMS */
  .symptoms-card { background: var(--white); border-radius: 14px; overflow: hidden; box-shadow: 0 2px 20px rgba(26,34,68,.09); }
  .symptoms-header {
    background: var(--navy); padding: .85rem 1.3rem;
    font: 600 .95rem/1 'DM Sans',sans-serif; color: #fff; text-align: center;
  }
  .symptoms-body { padding: 1rem 1.3rem; }
  .symptoms-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: .5rem;
  }
  .symptom-pill {
    border: none; border-radius: 20px;
    padding: .45rem .5rem; font: 500 .75rem/1 'DM Sans',sans-serif;
    cursor: pointer; transition: all .18s; text-align: center;
  }
  .symptom-pill.off  { background: var(--sky-pale); color: var(--navy); }
  .symptom-pill.on   { background: var(--navy); color: #fff; }
  .symptom-pill:hover { transform: scale(1.04); }
`;

const DAYS   = ["M","T","W","T","F","S","S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SYMPTOMS = ["Headache","Cramps","Heavy Bleeding","Fatigue","Back Ache","Medium Bleeding","Insomnia","Nausea","Light Bleeding","Bloating","Cravings","Acne"];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // convert Sun=0 to Mon=0
  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const UterusNav = () => (
  <svg width="30" height="24" viewBox="0 0 34 28" fill="none">
    <circle cx="3.5" cy="11" r="3.5" fill="white"/>
    <circle cx="30.5" cy="11" r="3.5" fill="white"/>
    <path d="M7 11 Q10 4 17 4 Q24 4 27 11" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M17 4 L17 24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 21 Q17 27 22 21" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

export default function CalendarPage({ onNavigate }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState(today.getDate());
  // period range: 29-31 May example
  const [periodDays] = useState([29, 30, 31]);
  const [activeSymptoms, setActiveSymptoms] = useState(new Set(["Cramps","Fatigue"]));

  const cells = buildCalendar(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const toggleSymptom = s => setActiveSymptoms(prev => {
    const next = new Set(prev);
    next.has(s) ? next.delete(s) : next.add(s);
    return next;
  });

  const isToday = d => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <>
      <style>{css}</style>

      <div className="page">
        <div className="layout">

          {/* CALENDAR CARD */}
          <div className="cal-card">
            <div className="cal-header">
              <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
              <span className="cal-month">{MONTHS[viewMonth].toUpperCase()}</span>
              <button className="cal-nav-btn" onClick={nextMonth}>›</button>
            </div>

            <div className="cal-grid">
              {DAYS.map((d,i) => <div key={i} className="cal-day-name">{d}</div>)}
              {cells.map((day, i) => {
                if (!day) return <div key={i} className="cal-day empty"/>;
                const classes = [
                  "cal-day",
                  isToday(day) ? "today" : "",
                  day === selected && !isToday(day) ? "selected" : "",
                  periodDays.includes(day) ? "period-range" : "",
                ].filter(Boolean).join(" ");
                return (
                  <div key={i} className={classes} onClick={() => setSelected(day)}>
                    {day}
                  </div>
                );
              })}
            </div>

            {periodDays.length > 0 && (
              <div className="cal-range-label">
                <div className="range-dot"/>
                Period days: {MONTHS[viewMonth]} {Math.min(...periodDays)}–{Math.max(...periodDays)}
              </div>
            )}

            <div className="cal-actions">
              <button className="btn-log">Log  Period</button>
              <button className="btn-edit">Edit Period</button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel">

            {/* Contraception Reminder */}
            <div className="reminder-card">
              <div className="reminder-header">Contraception Reminder</div>
              <div className="reminder-body">
                <div className="reminder-pill-row">
                  <div className="pill-info">
                    <p>Next Pill</p>
                    <span>May 30th</span>
                  </div>
                  <div className="pill-dot">
                    <svg viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" fill="white" opacity=".3"/>
                      <circle cx="7" cy="7" r="3" fill="white"/>
                    </svg>
                  </div>
                </div>
                <p className="last-period-txt">Your last period lasted 5 days</p>

                <div className="my-cal-info" style={{marginTop: ".9rem"}}>
                  <h4>My Calendar</h4>
                  <p>Log your period and set a contraceptive reminder and log symptoms. if your synced only your period days are shared</p>
                </div>
              </div>
            </div>

            {/* Log Symptoms */}
            <div className="symptoms-card">
              <div className="symptoms-header">Log Symptoms</div>
              <div className="symptoms-body">
                <div className="symptoms-grid">
                  {SYMPTOMS.map(s => (
                    <button
                      key={s}
                      className={`symptom-pill ${activeSymptoms.has(s) ? "on" : "off"}`}
                      onClick={() => toggleSymptom(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
