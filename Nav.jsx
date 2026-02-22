const navCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

  .app-nav {
    background: #1a2244;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 200;
  }
  .nav-logo {
    display: flex; align-items: center; gap: .55rem;
    color: #fff; text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.2rem; font-weight: 700; letter-spacing: .05em;
  }
  .nav-links {
    display: flex; align-items: center;
    gap: .4rem; list-style: none;
  }
  .nav-links a, .nav-links button {
    color: rgba(255,255,255,.78);
    text-decoration: none;
    font: 400 .88rem/1 'DM Sans', sans-serif;
    padding: .38rem .85rem;
    border-radius: 6px;
    background: none; border: none;
    cursor: pointer;
    transition: color .18s, background .18s;
    display: block;
  }
  .nav-links a:hover, .nav-links button:hover {
    color: #fff;
    background: rgba(255,255,255,.1);
  }
  .nav-active {
    background: rgba(255,255,255,.18) !important;
    color: #fff !important;
    font-weight: 500;
  }
  .nav-sep {
    color: rgba(255,255,255,.25);
    font-size: 1.1rem;
    padding: 0 .2rem;
    user-select: none;
  }
  .nav-register {
    border: 1.5px solid rgba(255,255,255,.45) !important;
    color: #fff !important;
    font-weight: 500 !important;
  }
  .nav-register:hover {
    background: rgba(255,255,255,.15) !important;
    border-color: rgba(255,255,255,.7) !important;
  }
`;

const UterusNav = () => (
  <svg width="30" height="24" viewBox="0 0 34 28" fill="none">
    <circle cx="3.5"  cy="11" r="3.5" fill="white"/>
    <circle cx="30.5" cy="11" r="3.5" fill="white"/>
    <path d="M7 11 Q10 4 17 4 Q24 4 27 11" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M17 4 L17 24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 21 Q17 27 22 21" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

/**
 * Shared Nav component
 *
 * Props:
 *   isLoggedIn  {boolean}  - shows guest vs auth tabs
 *   currentPage {string}   - highlights the active tab
 *   onNavigate  {function} - (pageName) => void
 *   onLogout    {function} - called when user clicks Log Out
 */
export default function Nav({ isLoggedIn, currentPage, onNavigate, onLogout }) {
  const go = (page) => (e) => { e.preventDefault(); onNavigate?.(page); };
  const active = (page) => currentPage === page ? "nav-active" : "";

  return (
    <>
      <style>{navCss}</style>
      <nav className="app-nav">
        {/* Logo — always goes home */}
        <a href="#" className="nav-logo" onClick={go("home")}>
          <UterusNav />
          OVIE
        </a>

        <ul className="nav-links">
          {isLoggedIn ? (
            /* ── AUTHENTICATED TABS ────────────────────── */
            <>
              <li>
                <a href="#" className={active("home")} onClick={go("home")}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={active("groups")} onClick={go("groups")}>
                  Groups
                </a>
              </li>
              <li>
                <a href="#" className={active("calendar")} onClick={go("calendar")}>
                  Calendar
                </a>
              </li>
              <li>
                <a href="#" className={active("account")} onClick={go("account")}>
                  Account
                </a>
              </li>
              <li><span className="nav-sep">|</span></li>
              <li>
                <button
                  onClick={() => onLogout?.()}
                  style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem" }}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            /* ── GUEST TABS ────────────────────────────── */
            <>
              <li>
                <a href="#" className={active("home")} onClick={go("home")}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={active("how")} onClick={go("how")}>
                  How it Works
                </a>
              </li>
              <li><span className="nav-sep">|</span></li>
              <li>
                <a href="#" className={active("login")} onClick={go("login")}>
                  Log In
                </a>
              </li>
              <li>
                <a href="#" className={`nav-register ${active("register")}`} onClick={go("register")}>
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
