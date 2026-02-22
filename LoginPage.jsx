import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --navy: #1a2244; --navy-dk: #151c38; --sky: #d4e5f5; --white: #fff; --gray: #f0f2f5; --border: #d8dde8; --muted: #6b7a90; }
  body { font-family: 'DM Sans', sans-serif; background: #111; min-height: 100vh; display: flex; align-items: center; justify-content: center; }

  .page-bg {
    width: 100vw; min-height: 100vh;
    background: #111;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .deco { position: absolute; background: var(--sky); transform: skewY(-8deg); }
  .deco-main  { width: 70%; height: 55%; top: 5%; left: -5%; background: #d4e5f5; }
  .deco-mid   { width: 20%; height: 16%; bottom: 22%; left: 2%; background: #b8d2ec; opacity: .7; }
  .deco-bot   { width: 25%; height: 10%; bottom: 12%; left: 0; background: #8fa8c8; opacity: .5; }
  .deco-right { width: 18%; height: 12%; top: 38%; right: 3%; background: #b8d2ec; opacity: .6; }

  .card {
    position: relative; z-index: 10;
    background: var(--white); border-radius: 10px;
    padding: 2.4rem 2rem; width: 340px;
    box-shadow: 0 8px 40px rgba(0,0,0,.35);
  }
  .card-title { font-size: 1.1rem; font-weight: 500; color: var(--navy); margin-bottom: 1.4rem; }

  .input-field {
    width: 100%; border: 1.5px solid var(--border);
    border-radius: 6px; padding: .65rem .9rem;
    font: 400 .88rem/1 'DM Sans',sans-serif;
    color: var(--navy); background: var(--gray);
    outline: none; margin-bottom: .75rem;
    transition: border-color .18s;
  }
  .input-field:focus { border-color: var(--navy); background: #fff; }
  .input-field::placeholder { color: var(--muted); }

  .password-wrap {
    position: relative; margin-bottom: 1.4rem;
  }
  .password-wrap .input-field { margin-bottom: 0; padding-right: 3.5rem; }
  .show-btn {
    position: absolute; right: .75rem; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    font: 600 .82rem/1 'DM Sans',sans-serif;
    color: var(--navy); cursor: pointer;
  }

  .btn-continue {
    width: 100%; background: var(--navy); border: none;
    border-radius: 24px; padding: .82rem;
    font: 600 .95rem/1 'DM Sans',sans-serif;
    color: var(--white); cursor: pointer;
    transition: background .18s, transform .14s;
  }
  .btn-continue:hover { background: var(--navy-dk); transform: translateY(-1px); }

  .error-msg { color: #c0392b; font-size: .8rem; margin-bottom: .75rem; }
`;

export default function LoginPage({ onNavigate, onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    // TODO: call POST /auth/login, then:
    onLogin?.();
  };

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

          <input
            className="input-field"
            placeholder="Username"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="password-wrap">
            <input
              className="input-field"
              placeholder="Password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="show-btn" onClick={() => setShowPw(p => !p)}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-continue" onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </>
  );
}
