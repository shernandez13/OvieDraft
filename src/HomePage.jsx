import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:      #1a2244;
    --navy-dk:   #151c38;
    --sky-hero:  #d4e5f5;
    --sky-bar:   #b8d2ec;
    --sky-pale:  #eaf3fb;
    --gray-bg:   #f2f4f7;
    --white:     #ffffff;
    --muted:     #6b7a90;
    --footer-bg: #c5daf0;
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    color: var(--navy);
    background: var(--white);
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    background: var(--navy);
    height: 66px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem;
    position: sticky; top: 0; z-index: 200;
  }
  .nav-logo {
    display: flex; align-items: center; gap: .55rem;
    color: #fff; text-decoration: none;
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem; font-weight: 700; letter-spacing: .06em;
  }
  .nav-links { display: flex; align-items: center; gap: 1.6rem; list-style: none; }
  .nav-links a {
    color: rgba(255,255,255,.82); text-decoration: none;
    font-size: .88rem; transition: color .18s;
  }
  .nav-links a:hover { color: #fff; }
  .nav-sep { color: rgba(255,255,255,.28); }
  .nav-register {
    color: #fff !important; font-weight: 500;
    border-bottom: 1px solid rgba(255,255,255,.55); padding-bottom: 1px;
  }

  /* HERO */
  .hero {
    background: var(--sky-hero);
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 3.5rem 3.5rem 0;
    min-height: 500px;
    position: relative;
  }
  .hero-stripe {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 18px; background: var(--sky-bar);
  }
  .hero-left { max-width: 400px; padding-bottom: 3.5rem; }
  .hero-eyebrow { font-size: .82rem; opacity: .72; margin-bottom: .9rem; }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.85rem; font-weight: 900;
    line-height: 1.08; text-transform: uppercase;
    margin-bottom: 1.1rem; letter-spacing: -.01em;
  }
  .hero-body {
    font-size: .9rem; opacity: .68;
    line-height: 1.65; margin-bottom: 2rem;
  }
  .hero-btns { display: flex; gap: .9rem; align-items: center; }
  .btn-make {
    background: #fff; color: var(--navy);
    border: none; padding: .6rem 1.35rem;
    font: 500 .88rem/1 'DM Sans',sans-serif;
    cursor: pointer; border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0,0,0,.08);
    transition: background .18s, transform .14s;
  }
  .btn-make:hover { background: #e8f2fb; transform: translateY(-1px); }
  .btn-learn {
    background: transparent; border: none;
    font: 400 .88rem/1 'DM Sans',sans-serif;
    cursor: pointer; text-decoration: underline;
    text-underline-offset: 3px; opacity: .72; color: var(--navy);
  }
  .hero-right {
    display: flex; justify-content: center; align-items: flex-end;
    padding-bottom: 18px;
  }
  .hero-card {
    background: #fff; border-radius: 18px 18px 0 0;
    width: 100%; max-width: 430px; min-height: 390px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 1rem;
    box-shadow: 0 8px 40px rgba(26,34,68,.1);
  }
  .hero-brand {
    font-family: 'Playfair Display', serif;
    font-size: 3.6rem; font-weight: 700;
    color: var(--navy); letter-spacing: .22em;
  }

  /* FEATURES */
  .features {
    background: var(--gray-bg);
    padding: 3.5rem 3.5rem 2rem; text-align: center;
  }
  .sec-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem; font-weight: 700; margin-bottom: .35rem;
  }
  .sec-sub { font-size: .88rem; color: var(--muted); margin-bottom: 2.4rem; }
  .feat-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1.1rem; max-width: 860px; margin: 0 auto;
  }
  .feat-card {
    background: #fff; border-radius: 12px;
    padding: 2rem 1.4rem 1.6rem; text-align: center;
    box-shadow: 0 2px 14px rgba(26,34,68,.06);
    transition: transform .2s, box-shadow .2s;
  }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(26,34,68,.11); }
  .feat-icon-wrap {
    position: relative; width: 54px; height: 54px;
    margin: 0 auto 1rem;
  }
  .feat-icon-bg {
    position: absolute; bottom: -4px; right: -4px;
    width: 36px; height: 36px;
    background: var(--sky-hero); border-radius: 8px;
  }
  .feat-icon-fg {
    position: absolute; top: 0; left: 0;
    width: 42px; height: 42px;
    background: #fff; border: 1.5px solid #dde8f2;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .feat-icon-fg svg { width: 20px; height: 20px; stroke: var(--navy); }
  .feat-card h3 { font-size: .95rem; font-weight: 600; margin-bottom: .55rem; line-height: 1.3; }
  .feat-card p  { font-size: .82rem; color: var(--muted); line-height: 1.65; }

  /* HOW IT WORKS */
  .how {
    background: var(--gray-bg);
    padding: 1rem 4rem 3.5rem; text-align: center;
  }
  .how h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem; font-weight: 700; margin-bottom: .9rem;
  }
  .how p {
    max-width: 680px; margin: 0 auto;
    font-size: .9rem; color: var(--muted); line-height: 1.85;
  }

  /* IMAGE CARDS */
  .img-cards {
    background: #fff;
    padding: 3.5rem;
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1.4rem; align-items: start;
  }
  .img-card {
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 2px 16px rgba(26,34,68,.08);
    display: flex; flex-direction: column;
  }
  .img-photo {
    height: 200px;
    background-size: cover; background-position: center;
  }
  .ph1 { background-color: #8fb5d6; }
  .ph2 { background-color: #a8c9e3; }
  .ph3 { background-color: #c0d9ee; }
  .img-body {
    background: #fff; padding: 1.2rem 1.3rem 1.4rem;
    text-align: center; flex: 1;
    display: flex; flex-direction: column; align-items: center; gap: .8rem;
  }
  .img-body p { font-size: .83rem; color: var(--muted); line-height: 1.65; }
  .img-link {
    font: 600 .85rem/1 'DM Sans',sans-serif;
    color: var(--navy); background: none; border: none;
    cursor: pointer; text-decoration: underline;
    text-underline-offset: 3px; transition: opacity .17s;
  }
  .img-link:hover { opacity: .6; }

  /* PLAN TOGETHER */
  .plan {
    background: #fff;
    padding: 3.5rem;
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 3.5rem; align-items: center;
  }
  .plan-art {
    background: var(--sky-pale); border-radius: 16px;
    min-height: 320px; display: flex;
    align-items: center; justify-content: center;
  }
  .plan-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem; font-weight: 700;
    margin-bottom: 1.1rem; line-height: 1.25;
  }
  .plan-text p { font-size: .9rem; color: var(--muted); line-height: 1.85; }

  /* TRACK ONCE */
  .track {
    background: var(--gray-bg);
    padding: 3.5rem;
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 3.5rem; align-items: center;
  }
  .track-art {
    background: var(--sky-hero); border-radius: 16px;
    min-height: 280px; display: flex;
    align-items: center; justify-content: center;
  }
  .track-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem; font-weight: 700; margin-bottom: 1.1rem;
  }
  .track-text p { font-size: .9rem; color: var(--muted); line-height: 1.85; }

  /* CTA */
  .cta {
    background: var(--gray-bg);
    padding: 3.5rem 4rem 4.5rem; text-align: center;
  }
  .cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem; font-weight: 700; margin-bottom: 1.6rem;
  }
  .btn-cta {
    background: var(--navy); color: #fff;
    border: none; padding: .82rem 2rem;
    font: 500 .95rem/1 'DM Sans',sans-serif;
    border-radius: 4px; cursor: pointer;
    display: inline-flex; align-items: center; gap: .5rem;
    transition: background .18s, transform .14s;
  }
  .btn-cta:hover { background: var(--navy-dk); transform: translateY(-2px); }

  /* FOOTER */
  .footer {
    background: var(--footer-bg);
    padding: 3rem 3.5rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1.6fr;
    gap: 2rem;
  }
  .f-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700; margin-bottom: .25rem;
  }
  .f-copy {
    font-size: .78rem; opacity: .65;
    line-height: 1.55; margin-bottom: 1.3rem;
  }
  .f-socials { display: flex; gap: .65rem; }
  .f-socials a {
    width: 30px; height: 30px;
    background: rgba(26,34,68,.13); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--navy); text-decoration: none;
    font-size: .68rem; font-weight: 600;
    transition: background .18s;
  }
  .f-socials a:hover { background: rgba(26,34,68,.25); }
  .f-col h4 { font-size: .88rem; font-weight: 600; margin-bottom: .9rem; }
  .f-col ul { list-style: none; }
  .f-col ul li { margin-bottom: .45rem; }
  .f-col ul li a {
    font-size: .82rem; opacity: .72;
    text-decoration: none; color: var(--navy);
    transition: opacity .17s;
  }
  .f-col ul li a:hover { opacity: 1; }
  .f-email h4 { font-size: .88rem; font-weight: 600; margin-bottom: .9rem; }
  .email-row {
    display: flex;
    background: rgba(255,255,255,.65);
    border: 1px solid rgba(26,34,68,.18);
    border-radius: 4px; overflow: hidden;
  }
  .email-row input {
    flex: 1; border: none; background: transparent;
    padding: .52rem .75rem;
    font: .83rem 'DM Sans',sans-serif; color: var(--navy); outline: none;
  }
  .email-row input::placeholder { color: rgba(26,34,68,.4); }
  .email-row button {
    background: none; border: none; padding: 0 .75rem;
    cursor: pointer; color: var(--navy);
    display: flex; align-items: center;
  }

  @media (max-width: 860px) {
    .hero, .plan, .track { grid-template-columns: 1fr; padding: 2rem; }
    .hero-right { display: none; }
    .feat-grid, .img-cards { grid-template-columns: 1fr; }
    .img-cards { padding: 2rem; }
    .footer { grid-template-columns: 1fr 1fr; }
    .how { padding: 1.5rem 2rem 2.5rem; }
  }
`;

/* ── SVG Assets ─────────────────────────────────────── */
const UterusNav = () => (
  <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
    <circle cx="3.5" cy="11" r="3.5" fill="white"/>
    <circle cx="30.5" cy="11" r="3.5" fill="white"/>
    <path d="M7 11 Q10 4 17 4 Q24 4 27 11" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M17 4 L17 24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 21 Q17 27 22 21" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

const UterusHero = () => (
  <svg width="210" height="175" viewBox="0 0 210 175" fill="none">
    <circle cx="18" cy="72" r="18" fill="#1a2244"/>
    <circle cx="192" cy="72" r="18" fill="#1a2244"/>
    <path d="M36 72 Q58 18 105 18 Q152 18 174 72" stroke="#1a2244" strokeWidth="14" fill="none" strokeLinecap="round"/>
    <path d="M105 18 L105 155" stroke="#1a2244" strokeWidth="13" strokeLinecap="round"/>
    <path d="M74 142 Q105 170 136 142" stroke="#1a2244" strokeWidth="13" fill="none" strokeLinecap="round"/>
    <rect x="97" y="32" width="16" height="60" rx="6" fill="white" opacity=".55"/>
    <rect x="88" y="45" width="8" height="38" rx="4" fill="white" opacity=".3"/>
    <rect x="114" y="45" width="8" height="38" rx="4" fill="white" opacity=".3"/>
  </svg>
);

const PhonePerson = () => (
  <svg width="190" height="240" viewBox="0 0 190 240" fill="none">
    <rect x="52" y="18" width="88" height="148" rx="12" fill="#b8d2ec" stroke="#1a2244" strokeWidth="2.5"/>
    <rect x="62" y="30" width="68" height="118" rx="5" fill="white"/>
    <circle cx="96" cy="50" r="14" fill="#dce9f5"/>
    <circle cx="96" cy="50" r="7" fill="#1a2244" opacity=".15"/>
    <rect x="70" y="72" width="52" height="7" rx="3.5" fill="#1a2244" opacity=".18"/>
    <rect x="70" y="85" width="38" height="7" rx="3.5" fill="#1a2244" opacity=".12"/>
    <rect x="70" y="104" width="52" height="7" rx="3.5" fill="#1a2244" opacity=".09"/>
    <rect x="70" y="120" width="52" height="18" rx="5" fill="#1a2244"/>
    <text x="96" y="133" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="DM Sans,sans-serif" fontWeight="500">SIGN UP</text>
    <rect x="130" y="14" width="28" height="22" rx="4" fill="#1a2244" opacity=".65"/>
    <path d="M137 14 Q137 6 144 6 Q151 6 151 14" stroke="#1a2244" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
    <circle cx="144" cy="25" r="3.5" fill="white"/>
    <circle cx="46" cy="172" r="13" fill="#f3c4a0"/>
    <ellipse cx="46" cy="210" rx="18" ry="28" fill="#1a2244"/>
    <path d="M56 190 Q72 176 72 156" stroke="#1a2244" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <circle cx="22" cy="200" r="13" fill="#b8d2ec"/>
    <text x="22" y="205" textAnchor="middle" fontSize="12">👍</text>
    <ellipse cx="162" cy="195" rx="13" ry="22" fill="#7bbf8a" opacity=".65" transform="rotate(-30 162 195)"/>
    <ellipse cx="170" cy="208" rx="10" ry="16" fill="#5fa870" opacity=".5" transform="rotate(-15 170 208)"/>
  </svg>
);

const LoginPerson = () => (
  <svg width="175" height="210" viewBox="0 0 175 210" fill="none">
    <rect x="48" y="14" width="96" height="138" rx="10" fill="#c5d9ee" stroke="#1a2244" strokeWidth="2.5"/>
    <rect x="58" y="26" width="76" height="112" rx="4" fill="white"/>
    <circle cx="96" cy="50" r="16" fill="#dce9f5"/>
    <circle cx="96" cy="50" r="8" fill="#1a2244" opacity=".18"/>
    <rect x="65" y="74" width="62" height="7" rx="3.5" fill="#1a2244" opacity=".16"/>
    <rect x="65" y="87" width="62" height="7" rx="3.5" fill="#1a2244" opacity=".11"/>
    <rect x="65" y="100" width="62" height="7" rx="3.5" fill="#1a2244" opacity=".08"/>
    <rect x="65" y="115" width="62" height="16" rx="4" fill="#1a2244" opacity=".12"/>
    <circle cx="36" cy="165" r="13" fill="#f3c4a0"/>
    <ellipse cx="36" cy="196" rx="17" ry="14" fill="#1a2244"/>
    <path d="M44 178 Q60 164 70 148" stroke="#1a2244" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <rect x="18" y="202" width="36" height="5" rx="2.5" fill="#8fa8c0"/>
    <rect x="22" y="207" width="5" height="14" rx="2" fill="#8fa8c0"/>
    <rect x="44" y="207" width="5" height="14" rx="2" fill="#8fa8c0"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8h12M10 4l4 4-4 4" stroke="#1a2244" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Main Component ─────────────────────────────────── */
export default function HomePage() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <UterusNav />
          OVIE
        </a>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#how">How it Works</a></li>
          <li><span className="nav-sep">|</span></li>
          <li><a href="#" className="nav-register">Register</a></li>
          <li><a href="#">Log In</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Ovie the friend syncing period app</p>
          <h1 className="hero-title">YOU CHOOSE WHO YOU SYNC WITH</h1>
          <p className="hero-body">
            Keep your data private and choose who you share with. Keep track of your daily contraceptives and track your cycle.
          </p>
          <div className="hero-btns">
            <button className="btn-make">Make account</button>
            <button className="btn-learn">Learn more</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <UterusHero />
            <span className="hero-brand">OVIE</span>
          </div>
        </div>
        <div className="hero-stripe" />
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="sec-title">Our main Features</h2>
        <p className="sec-sub">Sync on your terms</p>
        <div className="feat-grid">
          <div className="feat-card">
            <div className="feat-icon-wrap">
              <div className="feat-icon-bg"/>
              <div className="feat-icon-fg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
            </div>
            <h3>contraception tracker</h3>
            <p>Keep track of when and how often you want to take your contraception pill</p>
          </div>

          <div className="feat-card">
            <div className="feat-icon-wrap">
              <div className="feat-icon-bg"/>
              <div className="feat-icon-fg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/>
                  <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/>
                  <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </div>
            </div>
            <h3>Calendar</h3>
            <p>Keep track of when you start and finish menstrual cycle</p>
          </div>

          <div className="feat-card">
            <div className="feat-icon-wrap">
              <div className="feat-icon-bg"/>
              <div className="feat-icon-fg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="3"/>
                  <path d="M3 21v-1a5 5 0 0 1 5-5h2"/>
                  <circle cx="17" cy="7" r="3"/>
                  <path d="M13 21v-1a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v1"/>
                </svg>
              </div>
            </div>
            <h3>Sync with friends</h3>
            <p>Make groups based on who you share with. Make plans accordingly and see who you sync with</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <h2>How it works</h2>
        <p>
          Designed to make managing your cycle simple, organized, and private. You can log period dates in your personal calendar, keep a consistent history that stays saved to your account, and set reminders for contraception. When you want to coordinate plans, you can invite trusted people to a shared calendar that shows only your period dates — never your personal notes or entries. Your information stays protected, accessible across devices, and always under your control, while still giving you the option to make planning with others easier and more considerate.
        </p>
      </section>

      {/* IMAGE CARDS */}
      <section className="img-cards">
        {[
          {
            cls: "ph1",
            url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
            text: "Make multiple shared calendar groups for friends, partners, roommates, etc. Only you can see and manage your groups.",
            link: "Create Groups"
          },
          {
            cls: "ph2",
            url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
            text: "Everyone's cycle days appear in a unique color so everyone can understand timing at a glance without showing any personal details.",
            link: "View Together"
          },
          {
            cls: "ph3",
            url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
            text: "The shared calendar is separate from your private tracker. You can stop syncing, leave groups whenever you choose.",
            link: "Control Sharing"
          }
        ].map(({ cls, url, text, link }) => (
          <div className="img-card" key={link}>
            <div
              className={`img-photo ${cls}`}
              style={{ backgroundImage: `url('${url}')` }}
            />
            <div className="img-body">
              <p>{text}</p>
              <button className="img-link">{link}</button>
            </div>
          </div>
        ))}
      </section>

      {/* PLAN TOGETHER */}
      <section className="plan">
        <div className="plan-art"><PhonePerson /></div>
        <div className="plan-text">
          <h2>Plan together while staying private</h2>
          <p>
            Your personal health information stays private by default. Symptoms, notes, and contraception tracking are visible only to you. If you enable syncing, the app shares period dates only with people you invite through a group calendar — never personal details. This helps friends or partners coordinate trips, activities, or plans comfortably, while protecting sensitive information. Because planning together shouldn't require revealing everything.
          </p>
        </div>
      </section>

      {/* TRACK ONCE */}
      <section className="track">
        <div className="track-art"><LoginPerson /></div>
        <div className="track-text">
          <h2>Track once, keep it forever.</h2>
          <p>
            Signing up securely saves your cycle history, keeps your reminders active, and lets you access your calendar from any device. You'll also unlock the optional shared calendar feature to coordinate plans with trusted people.
          </p>
          <p style={{ marginTop: "1rem" }}>
            No lost logs. No restarting every time you switch phones.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Sync on your terms</h2>
        <button className="btn-cta">
          Create Account <ArrowRight />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <p className="f-brand-name">OVIE</p>
          <p className="f-copy">Copyright © 2020 OVIE.<br/>All rights reserved</p>
          <div className="f-socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Dribbble">Dr</a>
            <a href="#" aria-label="Twitter">Tw</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>

        <div className="f-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>

        <div className="f-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help center</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div className="f-email">
          <h4>Stay up to date</h4>
          <div className="email-row">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button aria-label="Subscribe"><SendIcon /></button>
          </div>
        </div>
      </footer>
    </>
  );
}
