import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #1a2244; --navy-dk: #151c38;
    --sky: #d4e5f5; --white: #fff;
    --gray: #f0f2f5; --border: #d8dde8;
    --teal: #4a90b8; --muted: #6b7a90;
  }
  body { font-family: 'DM Sans', sans-serif; background: #111; min-height: 100vh; display: flex; align-items: center; justify-content: center; }

  .page-bg {
    width: 100vw; min-height: 100vh;
    background: #111;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  /* diagonal decorative blocks */
  .deco {
    position: absolute;
    background: var(--sky);
    transform: skewY(-8deg);
  }
  .deco-main { width: 70%; height: 55%; top: 5%; left: -5%; background: #d4e5f5; }
  .deco-mid  { width: 20%; height: 16%; bottom: 22%; left: 2%; background: #b8d2ec; opacity: .7; }
  .deco-bot  { width: 25%; height: 10%; bottom: 12%; left: 0; background: #8fa8c8; opacity: .5; }
  .deco-right{ width: 18%; height: 12%; top: 38%; right: 3%; background: #b8d2ec; opacity: .6; }

  .card {
    position: relative; z-index: 10;
    background: var(--white);
    border-radius: 10px;
    padding: 2.4rem 2rem;
    width: 340px;
    box-shadow: 0 8px 40px rgba(0,0,0,.35);
  }
  .card-title {
    font-size: 1.1rem; font-weight: 500;
    color: var(--navy); margin-bottom: 1.4rem;
  }

  .btn-google {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: .75rem;
    background: var(--gray); border: 1.5px solid var(--border);
    border-radius: 6px; padding: .7rem 1rem;
    font: 600 .8rem/1 'DM Sans',sans-serif;
    letter-spacing: .08em; color: var(--navy);
    cursor: pointer; margin-bottom: .75rem;
    transition: background .18s;
  }
  .btn-google:hover { background: #e6eaf2; }

  .btn-email {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: .75rem;
    background: var(--teal); border: none;
    border-radius: 6px; padding: .7rem 1rem;
    font: 600 .8rem/1 'DM Sans',sans-serif;
    letter-spacing: .08em; color: var(--white);
    cursor: pointer; margin-bottom: 1.2rem;
    transition: background .18s;
  }
  .btn-email:hover { background: #3a7fa8; }

  .divider { height: 1px; background: var(--border); margin-bottom: 1.2rem; }

  .btn-create {
    width: 100%; background: var(--navy);
    border: none; border-radius: 24px;
    padding: .82rem;
    font: 600 .95rem/1 'DM Sans',sans-serif;
    color: var(--white); cursor: pointer;
    margin-bottom: 1.2rem;
    transition: background .18s, transform .14s;
  }
  .btn-create:hover { background: var(--navy-dk); transform: translateY(-1px); }

  .login-text { font-size: .82rem; color: var(--muted); }
  .login-text a { color: var(--navy); font-weight: 600; text-decoration: none; }
  .login-text a:hover { text-decoration: underline; }

  /* Google icon SVG inline */
  .g-icon { width: 20px; height: 20px; flex-shrink: 0; }
  .mail-icon { width: 20px; height: 16px; flex-shrink: 0; }

  /* Google OAuth modal overlay */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,.55);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
  }
  .modal {
    background: var(--white); border-radius: 10px;
    padding: 2rem; width: 480px;
    box-shadow: 0 12px 48px rgba(0,0,0,.3);
  }
  .modal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .modal-header-left { display: flex; align-items: center; gap: .7rem; }
  .modal-title { font-size: .95rem; color: #222; font-weight: 500; }
  .modal-close {
    background: none; border: none; font-size: 1.2rem;
    cursor: pointer; color: #666; padding: .2rem;
    line-height: 1;
  }
  .modal-user {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.4rem;
  }
  .modal-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: #c5d9ee; display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 600; color: var(--navy);
    overflow: hidden;
  }
  .modal-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .modal-user-info p { font-size: .9rem; font-weight: 500; color: #222; }
  .modal-user-info span { font-size: .82rem; color: var(--muted); }
  .btn-continue {
    width: 100%; background: #4285f4; border: none;
    border-radius: 6px; padding: .8rem;
    font: 500 .9rem/1 'DM Sans',sans-serif;
    color: var(--white); cursor: pointer;
    margin-bottom: 1rem;
    transition: background .18s;
  }
  .btn-continue:hover { background: #3367d6; }
  .modal-legal { font-size: .76rem; color: var(--muted); line-height: 1.55; }
  .modal-legal a { color: #4285f4; text-decoration: none; }
`;

const GoogleIcon = () => (
  <svg className="g-icon" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="mail-icon" viewBox="0 0 20 16" fill="none">
    <rect x="1" y="1" width="18" height="14" rx="2" stroke="white" strokeWidth="1.8"/>
    <path d="M1 4l9 6 9-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export default function RegisterPage({ onNavigate, onLogin }) {
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <>
      <style>{css}</style>
      <div className="page-bg">
        <div className="deco deco-main"/>
        <div className="deco deco-mid"/>
        <div className="deco deco-bot"/>
        <div className="deco deco-right"/>

        <div className="card">
          <p className="card-title">Sign in to your account</p>

          <button className="btn-google" onClick={() => setShowGoogleModal(true)}>
            <GoogleIcon /> SIGN UP WITH GOOGLE
          </button>

          <button className="btn-email" onClick={() => setShowEmailForm(true)}>
            <MailIcon /> SIGN UP WITH EMAIL
          </button>

          <div className="divider"/>

          <button className="btn-create" onClick={() => onLogin?.()}>
            Create Account
          </button>

          <p className="login-text">
            Already have an account? <a href="#" onClick={e => { e.preventDefault(); onNavigate?.("login"); }}>Login</a>
          </p>
        </div>

        {/* Google OAuth Modal */}
        {showGoogleModal && (
          <div className="modal-overlay" onClick={() => setShowGoogleModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-header-left">
                  <GoogleIcon />
                  <span className="modal-title">Sign in to Ovie with Google</span>
                </div>
                <button className="modal-close" onClick={() => setShowGoogleModal(false)}>✕</button>
              </div>
              <div className="modal-user">
                <div className="modal-avatar">A</div>
                <div className="modal-user-info">
                  <p>Alice Smith</p>
                  <span>alicesmith101@gmail.com</span>
                </div>
              </div>
              <button className="btn-continue" onClick={() => { setShowGoogleModal(false); onLogin?.(); }}>
                Continue as Alice
              </button>
              <p className="modal-legal">
                To create your account, Google will share your name, email address, and profile picture with MyApp. See MyApp's <a href="#">privacy policy</a> and <a href="#">terms of services</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
