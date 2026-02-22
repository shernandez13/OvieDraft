import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --navy: #1a2244; --navy-dk: #151c38; --sky: #c8def2; --sky-pale: #e8f3fb; --white: #fff; --gray: #f0f2f5; --border: #d8dde8; --muted: #6b7a90; }
  body { font-family: 'DM Sans', sans-serif; background: #111; min-height: 100vh; }



  .page {
    background: var(--sky); min-height: calc(100vh - 60px);
    display: flex; align-items: center; justify-content: center;
    padding: 2rem;
  }
  .card {
    background: var(--white); border-radius: 16px;
    padding: 2.5rem 2.5rem;
    width: 100%; max-width: 780px;
    box-shadow: 0 4px 32px rgba(26,34,68,.1);
    display: grid; grid-template-columns: 220px 1fr;
    gap: 2.5rem; align-items: start;
  }
  .card-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem; font-weight: 700; color: var(--navy); margin-bottom: .3rem;
  }
  .card-left p { font-size: .85rem; color: var(--muted); margin-bottom: 1.5rem; }

  .avatar-wrap {
    width: 120px; height: 120px; border-radius: 50%;
    background: var(--gray); display: flex; align-items: center; justify-content: center;
    position: relative; cursor: pointer; margin-bottom: 1.2rem;
    border: 2px dashed var(--border);
    transition: border-color .18s;
  }
  .avatar-wrap:hover { border-color: var(--navy); }
  .avatar-wrap svg { color: var(--border); }
  .avatar-plus {
    position: absolute; bottom: 6px; right: 6px;
    width: 24px; height: 24px; background: var(--navy);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1rem; line-height: 1;
  }

  .cycle-label { font-size: .82rem; color: var(--muted); margin-bottom: .4rem; }
  .select-wrap { position: relative; }
  .select-wrap select {
    width: 100%; appearance: none;
    background: var(--gray); border: 1.5px solid var(--border);
    border-radius: 6px; padding: .6rem .9rem;
    font: 400 .88rem/1 'DM Sans',sans-serif; color: var(--navy);
    cursor: pointer; outline: none;
  }
  .select-wrap::after {
    content: '▾'; position: absolute; right: .8rem; top: 50%;
    transform: translateY(-50%); pointer-events: none; color: var(--muted);
  }

  .card-right { display: flex; flex-direction: column; gap: 1.1rem; }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .field-group label { font-size: .82rem; color: var(--navy); font-weight: 500; margin-bottom: .35rem; display: block; }
  .input-field {
    width: 100%; border: 1.5px solid var(--border);
    border-radius: 6px; padding: .6rem .9rem;
    font: 400 .88rem/1 'DM Sans',sans-serif; color: var(--navy);
    background: var(--gray); outline: none;
    transition: border-color .18s;
  }
  .input-field:focus { border-color: var(--navy); background: #fff; }
  .input-field::placeholder { color: var(--muted); }

  .privacy-group label { font-size: .82rem; color: var(--navy); font-weight: 500; margin-bottom: .35rem; display: block; }

  /* Toggle */
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: .5rem 0;
  }
  .toggle-row span { font-size: .88rem; color: var(--navy); }
  .toggle {
    width: 46px; height: 26px; background: #ccc;
    border-radius: 13px; cursor: pointer;
    position: relative; transition: background .2s; border: none;
    flex-shrink: 0;
  }
  .toggle.on { background: #4a90b8; }
  .toggle::after {
    content: ''; position: absolute;
    width: 20px; height: 20px; background: #fff;
    border-radius: 50%; top: 3px; left: 3px;
    transition: left .2s;
    box-shadow: 0 1px 4px rgba(0,0,0,.2);
  }
  .toggle.on::after { left: 23px; }

  .btn-create {
    width: 100%; background: var(--navy); border: none;
    border-radius: 6px; padding: .82rem;
    font: 600 .95rem/1 'DM Sans',sans-serif;
    color: var(--white); cursor: pointer;
    transition: background .18s, transform .14s;
    margin-top: .3rem;
  }
  .btn-create:hover { background: var(--navy-dk); transform: translateY(-1px); }
  .skip-link {
    text-align: center; font-size: .82rem; color: var(--muted);
    cursor: pointer; background: none; border: none;
    font-family: 'DM Sans',sans-serif;
    text-decoration: underline; text-underline-offset: 2px;
  }
  .skip-link:hover { color: var(--navy); }
`;

const UterusNav = () => (
  <svg width="30" height="24" viewBox="0 0 34 28" fill="none">
    <circle cx="3.5" cy="11" r="3.5" fill="white"/>
    <circle cx="30.5" cy="11" r="3.5" fill="white"/>
    <path d="M7 11 Q10 4 17 4 Q24 4 27 11" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M17 4 L17 24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 21 Q17 27 22 21" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

const AvatarIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="22" r="12" stroke="#c8d5e8" strokeWidth="3"/>
    <path d="M8 50c0-11 9-18 20-18s20 7 20 18" stroke="#c8d5e8" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function ProfilePage({ onNavigate }) {
  const [firstName,    setFirstName]    = useState("");
  const [lastName,     setLastName]     = useState("");
  const [cycleLen,     setCycleLen]     = useState("28 days");
  const [skipPrivacy,  setSkipPrivacy]  = useState("Privacy Settings");
  const [privacySetting, setPrivacySetting] = useState("Default Settings");
  const [allowInvites, setAllowInvites] = useState(true);

  const handleCreate = () => {
    // TODO: POST /api/user/profile
    onNavigate?.("calendar");
  };

  return (
    <>
      <style>{css}</style>
      <div className="page">
        <div className="card">
          {/* LEFT */}
          <div className="card-left">
            <h2>Create Your Profile</h2>
            <p>Personalize your tracking setup</p>

            <div className="avatar-wrap">
              <AvatarIcon />
              <div className="avatar-plus">+</div>
            </div>

            <p className="cycle-label">Average Cycle Length</p>
            <div className="select-wrap">
              <select value={cycleLen} onChange={e => setCycleLen(e.target.value)}>
                {[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].map(n => (
                  <option key={n}>{n} days</option>
                ))}
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="card-right">
            <div className="field-row">
              <div className="field-group">
                <label>First Name</label>
                <input className="input-field" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
              </div>
              <div className="field-group">
                <label>Last Name</label>
                <input className="input-field" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
              </div>
            </div>

            <div className="privacy-group">
              <label>Skip for now</label>
              <div className="select-wrap">
                <select value={skipPrivacy} onChange={e => setSkipPrivacy(e.target.value)}>
                  <option>Privacy Settings</option>
                  <option>Skip</option>
                </select>
              </div>
            </div>

            <div className="privacy-group">
              <label>Privacy Settings</label>
              <div className="select-wrap">
                <select value={privacySetting} onChange={e => setPrivacySetting(e.target.value)}>
                  <option>Default Settings</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
            </div>

            <div className="toggle-row">
              <span>Allow Group Invites</span>
              <button
                className={`toggle ${allowInvites ? "on" : ""}`}
                onClick={() => setAllowInvites(v => !v)}
                aria-label="Toggle group invites"
              />
            </div>

            <button className="btn-create" onClick={handleCreate}>Create Profile</button>
            <button className="skip-link" onClick={() => onNavigate?.("calendar")}>Skip for now</button>
          </div>
        </div>
      </div>
    </>
  );
}
