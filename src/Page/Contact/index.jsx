import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

  .contact-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: url('/bg.png') center center / cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    position: relative;
    overflow: hidden;
  }

  .contact-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background: linear-gradient(160deg, #f5ede0 0%, #e8d5b0 50%, #c8a96e 100%);
    z-index: -1;
  }

  /* ======== LAYOUT ======== */
  .contact-wrapper {
    display: flex;
    align-items: center;
    gap: 60px;
    max-width: 1000px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* ======== LEFT SIDE ======== */
  .contact-left {
    flex: 1;
    min-width: 280px;
  }

  .contact-left h1 {
    font-size: 1.9rem;
    font-weight: 900;
    color: #1a1a2e;
    margin-bottom: 14px;
    line-height: 1.2;
  }

  .contact-left p {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.7;
    margin-bottom: 28px;
    max-width: 340px;
  }

  /* Info items */
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 32px;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .info-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7b5ee8, #5a3dc8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(90,61,200,0.35);
  }

  .info-icon svg {
    width: 18px;
    height: 18px;
    fill: white;
  }

  .info-text {
    display: flex;
    flex-direction: column;
  }

  .info-label {
    font-size: 0.82rem;
    font-weight: 800;
    color: #333;
    margin-bottom: 2px;
  }

  .info-value {
    font-size: 0.85rem;
    color: #666;
    font-weight: 600;
  }

  /* Support card */
  .support-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: linear-gradient(160deg, #6b4017 0%, #4a2b0a 60%, #3a2008 100%);
    border: 3px solid #2a1505;
    border-radius: 14px;
    padding: 16px 20px;
    max-width: 240px;
    position: relative;
    box-shadow:
      0 0 0 1.5px #a0621a inset,
      0 6px 20px rgba(0,0,0,0.4);
  }

  .support-card::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 10px;
    border: 1.5px solid rgba(160,98,26,0.35);
    pointer-events: none;
  }

  /* Gear on support card */
  .support-card .gear {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 22px;
    height: 22px;
    color: #7a5a18;
  }

  .support-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7b5ee8, #5a3dc8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid #a0621a;
  }

  .support-avatar svg {
    width: 22px;
    height: 22px;
    fill: white;
  }

  .support-text h4 {
    font-size: 0.95rem;
    font-weight: 800;
    color: #f5d68a;
  }

  .support-text p {
    font-size: 0.78rem;
    color: #c9963a;
    margin: 0;
  }

  /* ======== RIGHT SIDE – FORM PANEL ======== */
  .contact-right {
    flex: 1;
    min-width: 300px;
    position: relative;
  }

  .form-panel {
    position: relative;
    background: linear-gradient(160deg, #6b4017 0%, #4a2b0a 50%, #3a2008 100%);
    border: 5px solid #2a1505;
    border-radius: 14px;
    padding: 30px 28px 32px;
    box-shadow:
      0 0 0 2px #a0621a inset,
      0 10px 40px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,200,80,0.1);
    animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both;
  }

  .form-panel::before {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 10px;
    border: 2px solid rgba(160,98,26,0.35);
    pointer-events: none;
  }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Gear corners */
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

  /* ======== FORM FIELDS ======== */
  .field-group {
    margin-bottom: 14px;
  }

  .field-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 800;
    color: #f5d68a;
    margin-bottom: 6px;
    letter-spacing: 0.2px;
  }

  .field-group input,
  .field-group textarea {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    border: 2px solid rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.93);
    font-family: 'Nunito', sans-serif;
    font-size: 0.92rem;
    color: #333;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    resize: none;
  }

  .field-group input::placeholder,
  .field-group textarea::placeholder { color: #aaa; }

  .field-group input:focus,
  .field-group textarea:focus {
    border-color: #7b5ea7;
    box-shadow: 0 0 0 3px rgba(123,94,167,0.25), 0 2px 6px rgba(0,0,0,0.15);
  }

  .field-group textarea {
    height: 90px;
  }

  /* Submit button */
  .submit-btn {
    margin-left: 120px;
    padding: 12px 32px;
    margin-top: 6px;
    border: none;
    border-radius: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 800;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(180deg, #7b5ee8 0%, #5a3dc8 100%);
    box-shadow: 0 4px 0 #3d28a0, 0 6px 16px rgba(90,61,200,0.4);
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
    transition: transform 0.1s, box-shadow 0.1s, filter 0.15s;
    letter-spacing: 0.3px;
  }

  .submit-btn:hover { filter: brightness(1.08); }
  .submit-btn:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0 #3d28a0, 0 2px 8px rgba(90,61,200,0.3);
  }

  /* ======== RESPONSIVE ======== */
  @media (max-width: 750px) {
    .contact-wrapper { flex-direction: column; gap: 36px; }
    .contact-left h1 { font-size: 1.5rem; }
    .form-panel { padding: 24px 20px 28px; }
  }
`;

const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z" />
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Gửi tin nhắn:", form);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="contact-root">
        <div className="contact-wrapper">

          {/* ===== LEFT ===== */}
          <div className="contact-left">
            <h1>Liên hệ với chúng tôi</h1>
            <p>
              Tại Whisker, chúng tôi luôn sẵn sàng một đảo trả đảo cố đấm năng
              sang với vô hen. SB mệnh của những thi in cang các cáo công vụ,
              kiến thức về mọi lợt hợp đt.
            </p>

            <div className="info-list">
              {/* Địa chỉ */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Địa chỉ</span>
                  <span className="info-value">Chưa cập nhật</span>
                </div>
              </div>

              {/* Điện thoại */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Điện thoại</span>
                  <span className="info-value">Chưa cập nhật</span>
                </div>
              </div>

              {/* Email */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">E-mail</span>
                  <span className="info-value">Chưa cập nhật</span>
                </div>
              </div>
            </div>

            {/* Support card */}
            <div className="support-card">
              <GearSVG className="gear" />
              <div className="support-avatar">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <div className="support-text">
                <h4>Hỗ trợ và làm việc</h4>
                <p></p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT – FORM ===== */}
          <div className="contact-right">
            <div className="form-panel">
              <GearSVG className="gear-icon gear-tl" />
              <GearSVG className="gear-icon gear-tr" />
              <GearSVG className="gear-icon gear-bl" />
              <GearSVG className="gear-icon gear-br" />

              <div className="field-group">
                <label className="field-label">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  placeholder="Email@gmail.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Chủ đề</label>
                <input
                  type="text"
                  placeholder="Chủ đề"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Tin nhắn</label>
                <textarea
                  placeholder="Tin nhắn"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div>

              <button className="submit-btn" onClick={handleSubmit}>
                {sent ? "✓ Đã gửi!" : "Gửi tin nhắn"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}