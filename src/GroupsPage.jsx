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
    --purple: #9b59b6; --maroon: #7b2d5e; --green: #27ae60;
  }
  body { font-family: 'DM Sans', sans-serif; background: #111; min-height: 100vh; }

  /* PAGE */
  .page {
    background: var(--sky); min-height: calc(100vh - 58px);
    display: flex;
  }

  /* SIDEBAR */
  .sidebar {
    width: 110px; background: var(--sky);
    padding: 1rem .6rem;
    display: flex; flex-direction: column; gap: .8rem;
    border-right: 1px solid rgba(26,34,68,.1);
    flex-shrink: 0;
  }
  .group-thumb {
    display: flex; flex-direction: column; align-items: center; gap: .3rem;
    cursor: pointer; padding: .4rem; border-radius: 10px;
    transition: background .18s;
  }
  .group-thumb:hover { background: rgba(255,255,255,.5); }
  .group-thumb.active { background: rgba(255,255,255,.7); }
  .group-avatar {
    width: 62px; height: 62px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; font-size: .7rem; font-weight: 600; color: #fff;
    position: relative;
  }
  .group-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .group-thumb span { font-size: .72rem; color: var(--navy); font-weight: 500; text-align: center; }
  .group-thumb .members { font-size: .65rem; color: var(--muted); }

  .create-btn {
    width: 62px; height: 62px; border-radius: 10px;
    background: rgba(26,34,68,.12); border: 2px dashed rgba(26,34,68,.25);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1.6rem; color: var(--navy);
    transition: background .18s;
  }
  .create-btn:hover { background: rgba(26,34,68,.2); }

  /* MAIN */
  .main {
    flex: 1; padding: 1.5rem 1.8rem;
  }
  .page-title { font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-bottom: .3rem; }
  .page-sub   { font-size: .82rem; color: var(--muted); margin-bottom: 1.3rem; }

  .content-grid {
    display: grid; grid-template-columns: 1fr 340px;
    gap: 1.5rem; align-items: start;
  }

  /* CALENDAR CARD */
  .cal-card {
    background: var(--white); border-radius: 14px;
    padding: 1.2rem 1.4rem;
    box-shadow: 0 2px 16px rgba(26,34,68,.08);
  }
  .cal-header {
    display: flex; align-items: center; margin-bottom: 1rem;
  }
  .cal-nav-btn {
    background: none; border: none; cursor: pointer;
    font-size: 1.2rem; color: var(--navy); padding: .15rem .35rem;
    border-radius: 4px; transition: background .15s; line-height: 1;
  }
  .cal-nav-btn:hover { background: var(--gray); }
  .cal-month {
    flex: 1; text-align: center;
    font-weight: 700; font-size: .95rem; color: var(--navy);
    letter-spacing: .06em;
  }
  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: .25rem; }
  .cal-day-name { text-align: center; font-size: .72rem; font-weight: 600; color: var(--muted); padding-bottom: .4rem; }
  .cal-day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    font-size: .82rem; color: var(--navy); border-radius: 50%;
    position: relative; cursor: default;
  }
  .cal-day.empty {}

  /* colored dots for each member */
  .dot-row {
    display: flex; gap: 2px; justify-content: center;
    position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%);
  }
  .dot {
    width: 5px; height: 5px; border-radius: 50%;
  }

  .cal-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 1rem; padding-top: .8rem; border-top: 1px solid var(--border);
    font-size: .82rem; color: var(--muted);
  }
  .btn-edit-sm {
    background: none; border: none; color: var(--accent);
    font: 600 .82rem/1 'DM Sans',sans-serif; cursor: pointer;
    text-decoration: underline; text-underline-offset: 2px;
  }

  .group-actions {
    display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; margin-top: 1rem;
  }
  .btn-pause {
    background: var(--navy); color: #fff; border: none;
    border-radius: 8px; padding: .75rem;
    font: 600 .88rem/1 'DM Sans',sans-serif; cursor: pointer;
    transition: background .18s;
  }
  .btn-pause:hover { background: var(--navy-dk); }
  .btn-leave {
    background: var(--accent); color: #fff; border: none;
    border-radius: 8px; padding: .75rem;
    font: 600 .88rem/1 'DM Sans',sans-serif; cursor: pointer;
    transition: background .18s;
  }
  .btn-leave:hover { background: #3a5f98; }

  /* MEMBER CARDS */
  .members-col { display: flex; flex-direction: column; gap: .8rem; }
  .member-card {
    border-radius: 12px; padding: 1rem 1.2rem;
    display: flex; align-items: center; gap: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,.08);
  }
  .member-card.purple { background: #c9a8e0; }
  .member-card.maroon { background: #a8607a; }
  .member-card.green  { background: #7ec99a; }
  .member-initial {
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,.35);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .member-info p { font-size: .88rem; font-weight: 600; color: var(--navy-dk); }
  .member-info span { font-size: .78rem; color: rgba(26,34,68,.7); }
  .member-status {
    font-size: .78rem; font-weight: 600;
    color: rgba(26,34,68,.8); margin-top: .15rem;
  }
`;

const DAYS   = ["M","T","W","T","F","S","S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Example period data per member for May
// K=purple, B=maroon, C=green
const MEMBER_DOTS = {
  4:  ["#9b59b6"],
  5:  ["#9b59b6","#27ae60"],
  6:  ["#27ae60"],
  7:  ["#27ae60"],
  8:  ["#7b2d5e"],
  9:  ["#9b59b6","#7b2d5e"],
  10: ["#9b59b6","#7b2d5e"],
  11: ["#7b2d5e"],
  12: ["#7b2d5e"],
  13: ["#9b59b6"],
  14: ["#9b59b6","#7b2d5e"],
  15: ["#9b59b6"],
  16: ["#9b59b6"],
};

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
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

const GROUPS = [
  { id: 1, name: "Swimming",  members: 5, color: "#4a7fb5" },
  { id: 2, name: "Roommates", members: 4, color: "#7b5ea7" },
  { id: 3, name: "Sisters",   members: 3, color: "#c04a8a", active: true },
  { id: 4, name: "partner",   members: 1, color: "#3a8a5c" },
];

const MEMBERS = [
  { id: "K", label: "K", username: "id_327648oy32o",    lastLogged: "May 13", status: "Synced",       style: "purple" },
  { id: "B", label: "B", username: "id_5890909809890",  lastLogged: "May 16", status: "Synced",       style: "maroon" },
  { id: "C", label: "C", username: "id_538749823847028",lastLogged: "May 110",status: "Needs Update", style: "green"  },
];

export default function GroupsPage({ onNavigate }) {
  const [activeGroup, setActiveGroup] = useState(3);
  const [viewYear,  setViewYear]  = useState(2024);
  const [viewMonth, setViewMonth] = useState(4); // May

  const cells = buildCalendar(viewYear, viewMonth);

  const prevMonth = () => { if (viewMonth===0){setViewYear(y=>y-1);setViewMonth(11);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth===11){setViewYear(y=>y+1);setViewMonth(0);}else setViewMonth(m=>m+1); };

  return (
    <>
      <style>{css}</style>

      <div className="page">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:".3rem"}}>
            <button className="create-btn" title="Create Group">+</button>
            <span style={{fontSize:".7rem",color:"var(--navy)",fontWeight:500}}>Create Group</span>
          </div>
          {GROUPS.map(g => (
            <div
              key={g.id}
              className={`group-thumb ${activeGroup === g.id ? "active" : ""}`}
              onClick={() => setActiveGroup(g.id)}
            >
              <div className="group-avatar" style={{background: g.color}}>
                {g.name.slice(0,2).toUpperCase()}
              </div>
              <span>{g.name}</span>
              <span className="members">{g.members} members</span>
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="main">
          <h1 className="page-title">My Groups</h1>
          <p className="page-sub">Create shared calendar groups to track period dates with trusted people, while keeping personal details private.</p>

          <div className="content-grid">
            {/* SHARED CALENDAR */}
            <div>
              <div className="cal-card">
                <div className="cal-header">
                  <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                  <span className="cal-month">{MONTHS[viewMonth].toUpperCase()}</span>
                  <button className="cal-nav-btn" onClick={nextMonth}>›</button>
                </div>
                <div className="cal-grid">
                  {DAYS.map((d,i) => <div key={i} className="cal-day-name">{d}</div>)}
                  {cells.map((day,i) => {
                    if (!day) return <div key={i} className="cal-day empty"/>;
                    const dots = MEMBER_DOTS[day] || [];
                    return (
                      <div key={i} className="cal-day">
                        {day}
                        {dots.length > 0 && (
                          <div className="dot-row">
                            {dots.map((c,di) => <div key={di} className="dot" style={{background:c}}/>)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="cal-footer">
                  <span>3 Members</span>
                  <button className="btn-edit-sm">Edit</button>
                </div>
              </div>

              <div className="group-actions">
                <button className="btn-pause">Pause Sync</button>
                <button className="btn-leave">Leave</button>
              </div>
            </div>

            {/* MEMBER STATUS CARDS */}
            <div className="members-col">
              {MEMBERS.map(m => (
                <div key={m.id} className={`member-card ${m.style}`}>
                  <div className="member-initial">{m.label}</div>
                  <div className="member-info">
                    <p>Username: {m.username}</p>
                    <span>Last Logged: {m.lastLogged}</span>
                    <p className="member-status">Status: {m.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
