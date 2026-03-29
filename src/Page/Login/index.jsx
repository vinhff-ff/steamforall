import { useState } from "react";

const styles = `
  /* GIỮ NGUYÊN TOÀN BỘ CSS CỦA MÀY */
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

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.85) translateY(24px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

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

  .panel-title {
    text-align: center;
    font-size: 1.65rem;
    font-weight: 900;
    margin-bottom: 22px;
    color: #f5d68a;
  }

  .input-group {
    margin-bottom: 12px;
  }

  .input-group input {
    width: 100%;
    padding: 11px 16px;
    border-radius: 8px;
    border: 2px solid rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.92);
  }

  .btn {
    width: 100%;
    padding: 13px;
    margin-top: 8px;
    border: none;
    border-radius: 10px;
    font-weight: 800;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(180deg, #7b5ee8 0%, #5a3dc8 100%);
  }

  .links {
    text-align: center;
    margin-top: 14px;
  }

  .links a {
    display: block;
    color: #d4af5a;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5"/>
  </svg>
);

/* REGISTER */
function RegisterPanel({ form, onChange, onSubmit, onBackToLogin }) {
  return (
    <div className="panel">
      <h2 className="panel-title">Đăng ký</h2>

      <div className="input-group">
        <input
          placeholder="Họ và tên"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>

      <button className="btn" onClick={onSubmit}>Đăng ký</button>

      <div className="links">
        <a href="#" onClick={onBackToLogin}>
          Bạn đã có tài khoản? Đăng nhập
        </a>
      </div>
    </div>
  );
}

/* LOGIN */
function LoginPanel({ form, onChange, onSubmit, onCreateAccount }) {
  return (
    <div className="panel">
      <h2 className="panel-title">Đăng nhập</h2>

      <div className="input-group">
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>

      <button className="btn" onClick={onSubmit}>Đăng nhập</button>

      <div className="links">
        <a href="#" onClick={onCreateAccount}>
          Chưa có tài khoản? Đăng ký
        </a>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
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

  return (
    <>
      <style>{styles}</style>

      <div className="auth-root">
        <div className="auth-container">
          
          {/* REGISTER */}
          <div style={{ display: isLogin ? "none" : "block" }}>
            <RegisterPanel
              form={registerForm}
              onChange={handleRegisterChange}
              onSubmit={() => console.log("register")}
              onBackToLogin={(e) => {
                e.preventDefault();
                setIsLogin(true);
              }}
            />
          </div>

          {/* LOGIN */}
          <div style={{ display: isLogin ? "block" : "none" }}>
            <LoginPanel
              form={loginForm}
              onChange={handleLoginChange}
              onSubmit={() => console.log("login")}
              onCreateAccount={(e) => {
                e.preventDefault();
                setIsLogin(false);
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}