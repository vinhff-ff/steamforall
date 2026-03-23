import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

  .auth-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: url('/bg.png') center center / cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .auth-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background: linear-gradient(160deg, #c8a96e 0%, #8b6914 40%, #3d2000 100%);
    z-index: -1;
  }

  .auth-container {
    display: flex;
    gap: 36px;
    align-items: flex-start;
    padding: 40px 20px;
    position: relative;
    z-index: 1;
  }

  /* ======== PANEL CHUNG – gỗ tối + bánh răng (giống contact) ======== */
  .panel {
    position: relative;
    border-radius: 14px;
    padding: 30px 28px 32px;
    min-width: 300px;
    background: linear-gradient(160deg, #6b4017 0%, #4a2b0a 50%, #3a2008 100%);
    border: 5px solid #2a1505;
    box-shadow:
      0 0 0 2px #a0621a inset,
      0 10px 40px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,200,80,0.1);
    animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both;
  }

  .panel::before {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 10px;
    border: 2px solid rgba(160,98,26,0.35);
    pointer-events: none;
  }

  .panel:nth-child(1) { animation-delay: 0.05s; }
  .panel:nth-child(2) { animation-delay: 0.18s; }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.85) translateY(24px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Bánh răng góc */
  .gear-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    color: #5a3a10;
  }
  .gear-tl { top: -14px; left: -14px; }
  .gear-tr { top: -14px; right: -14px; }
  .gear-bl { bottom: -14px; left: -14px; }
  .gear-br { bottom: -14px; right: -14px; }

  /* ======== TIÊU ĐỀ ======== */
  .panel-title {
    text-align: center;
    font-size: 1.65rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    margin-bottom: 22px;
    color: #f5d68a;
    text-shadow: 0 2px 6px rgba(0,0,0,0.6), 0 1px 0 rgba(255,200,50,0.2);
  }

  /* ======== INPUT ======== */
  .input-group {
    margin-bottom: 12px;
  }

  .input-group input {
    width: 100%;
    padding: 11px 16px;
    border-radius: 8px;
    border: 2px solid rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.92);
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    color: #333;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }

  .input-group input::placeholder { color: #888; }

  .input-group input:focus {
    border-color: #7b5ea7;
    box-shadow: 0 0 0 3px rgba(123,94,167,0.25), 0 2px 6px rgba(0,0,0,0.15);
  }

  /* ======== NÚT ======== */
  .btn {
    width: 100%;
    padding: 13px;
    margin-top: 8px;
    border: none;
    border-radius: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(180deg, #7b5ee8 0%, #5a3dc8 100%);
    box-shadow: 0 4px 0 #3d28a0, 0 6px 16px rgba(90,61,200,0.4);
    letter-spacing: 0.3px;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
    transition: transform 0.1s, box-shadow 0.1s, filter 0.15s;
  }

  .btn:hover { filter: brightness(1.08); }

  .btn:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0 #3d28a0, 0 2px 8px rgba(90,61,200,0.3);
  }

  /* ======== LINKS ======== */
  .links {
    text-align: center;
    margin-top: 14px;
  }

  .links a {
    display: block;
    color: #d4af5a;
    font-size: 0.88rem;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
    margin-top: 5px;
    cursor: pointer;
    transition: color 0.2s;
  }

  .links a:hover { color: #ffe090; }

  /* ======== CHAT BUBBLE ======== */
  .chat-btn {
    position: fixed;
    bottom: 20px; right: 20px;
    width: 48px; height: 48px;
    background: linear-gradient(135deg, #7b5ee8, #5a3dc8);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(90,61,200,0.5);
    cursor: pointer;
    z-index: 99;
    transition: transform 0.2s;
    border: none;
  }
  .chat-btn:hover { transform: scale(1.1); }

  /* ======== RESPONSIVE ======== */
  @media (max-width: 680px) {
    .auth-container { flex-direction: column; gap: 24px; align-items: center; }
    .panel { min-width: 280px; width: 90vw; }
  }
`;

const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z"/>
  </svg>
);

function RegisterPanel({ form, onChange, onSubmit }) {
  return (
    <div className="panel panel-register">
      <GearSVG className="gear-icon gear-tl" />
      <GearSVG className="gear-icon gear-tr" />
      <GearSVG className="gear-icon gear-bl" />
      <GearSVG className="gear-icon gear-br" />
      <h2 className="panel-title">Đăng ký</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Họ và tên"
          autoComplete="name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Mật khẩu"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
        />
      </div>

      <button className="btn" onClick={onSubmit}>Đăng ký</button>
    </div>
  );
}

function LoginPanel({ form, onChange, onSubmit, onForgotPassword, onCreateAccount }) {
  return (
    <div className="panel panel-login">
      <GearSVG className="gear-icon gear-tl" />
      <GearSVG className="gear-icon gear-tr" />
      <GearSVG className="gear-icon gear-bl" />
      <GearSVG className="gear-icon gear-br" />

      <h2 className="panel-title">Đăng nhập</h2>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Mật khẩu"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>

      <button className="btn" onClick={onSubmit}>Đăng nhập</button>

      <div className="links">
        <a onClick={onForgotPassword}>Quên mật khẩu?</a>
        <a onClick={onCreateAccount}>Tạo tài khoản mới?</a>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (field, value) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegisterSubmit = () => {
    console.log("Đăng ký:", registerForm);
    // TODO: gọi API đăng ký
  };

  const handleLoginSubmit = () => {
    console.log("Đăng nhập:", loginForm);
    // TODO: gọi API đăng nhập
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-container">
          <RegisterPanel
            form={registerForm}
            onChange={handleRegisterChange}
            onSubmit={handleRegisterSubmit}
          />
          <LoginPanel
            form={loginForm}
            onChange={handleLoginChange}
            onSubmit={handleLoginSubmit}
            onForgotPassword={() => console.log("Quên mật khẩu")}
            onCreateAccount={() => console.log("Tạo tài khoản mới")}
          />
        </div>

        {/* Chat bubble */}
        <button className="chat-btn" onClick={() => console.log("Mở chat")}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white" width={22} height={22}>
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        </button>
      </div>
    </>
  );
}