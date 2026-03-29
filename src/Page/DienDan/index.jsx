import { useState } from "react";
import dienDan from "../../assets/dienDan.png";
import biaMo from "../../assets/biaMo.png";
import mapNotfound from "../../assets/mapNotfound.png";
import { useNavigate } from "react-router-dom";

/* ─── CSS ───────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .fd-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    background: #120800;
  }

  .fd-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 30% 40%, rgba(120,55,10,0.35) 0%, transparent 65%),
      radial-gradient(ellipse 60% 50% at 75% 70%, rgba(80,30,5,0.3)  0%, transparent 60%),
      linear-gradient(180deg, #0d0500 0%, #1a0c03 50%, #0d0500 100%);
    z-index: 0;
    pointer-events: none;
  }

  .fd-root::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.14;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  }

  .fd-vignette {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.72) 100%);
  }

  .fd-wrap {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px 72px;
  }

  /* BACK BTN */
  .fd-back {
    position: fixed;
    top: 18px; left: 18px;
    z-index: 50;
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 2px solid rgba(200,150,60,0.45);
    background: rgba(18,8,0,0.88);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #f5d68a;
    font-size: 1.15rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    transition: all 0.22s cubic-bezier(.34,1.2,.64,1);
    box-shadow: 0 4px 18px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,150,60,0.1) inset;
  }
  .fd-back:hover {
    border-color: #c9a455;
    background: rgba(50,22,4,0.95);
    transform: scale(1.1);
    box-shadow: 0 0 22px rgba(200,150,60,0.3), 0 6px 20px rgba(0,0,0,0.55);
  }

  /* BANNER */
  .fd-banner {
    width: 100%;
    max-width: 820px;
    margin-top: 30px;
    animation: fadeDown 0.65s ease both;
  }
  .fd-banner img {
    width: 100%; height: auto; display: block;
    filter: drop-shadow(0 10px 40px rgba(0,0,0,0.75));
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ORNAMENT */
  .fd-ornament {
    display: flex; align-items: center; gap: 12px;
    margin: 6px 0 30px;
    width: 100%; max-width: 820px;
    animation: fadeDown 0.65s ease 0.08s both;
  }
  .fd-orn-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, #a0621a66, transparent);
  }
  .fd-orn-icon { font-size: 1rem; color: #c9a455; }

  /* LAYOUT */
  .fd-layout {
    width: 100%; max-width: 1060px;
    display: grid;
    grid-template-columns: 370px 1fr;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 800px) { .fd-layout { grid-template-columns: 1fr; } }

  /* PANEL */
  .fd-panel {
    border-radius: 16px;
    border: 2px solid #5a3510;
    background: linear-gradient(155deg, rgba(55,27,6,0.94) 0%, rgba(20,10,2,0.97) 100%);
    box-shadow:
      0 0 0 1px rgba(180,110,30,0.18) inset,
      0 14px 50px rgba(0,0,0,0.65);
    position: relative;
    overflow: hidden;
    animation: riseUp 0.6s cubic-bezier(.34,1.2,.64,1) both;
  }
  .fd-panel:nth-child(2) { animation-delay: 0.13s; }

  @keyframes riseUp {
    from { opacity: 0; transform: translateY(28px) scale(0.975); }
    to   { opacity: 1; transform: none; }
  }

  .fd-panel::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(130deg, rgba(255,190,60,0.05) 0%, transparent 50%);
    pointer-events: none; border-radius: 14px; z-index: 0;
  }

  .fd-panel::after {
    content: '';
    position: absolute;
    top: 0; left: 16px; right: 16px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(200,140,40,0.45), transparent);
  }

  .p-gear {
    position: absolute;
    width: 18px; height: 18px;
    color: rgba(90,53,15,0.55);
    pointer-events: none; z-index: 1;
  }
  .p-gear.tl { top: -7px; left: -7px; }
  .p-gear.tr { top: -7px; right: -7px; }
  .p-gear.bl { bottom: -7px; left: -7px; }
  .p-gear.br { bottom: -7px; right: -7px; }

  /* PANEL HEAD */
  .fd-phead {
    position: relative; z-index: 1;
    padding: 18px 22px 14px;
    border-bottom: 1px solid rgba(160,98,26,0.28);
    display: flex; align-items: center; gap: 12px;
  }
  .fd-phead-icon {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #6b4017, #3a1c04);
    border: 1.5px solid rgba(200,150,60,0.35);
    box-shadow: 0 4px 14px rgba(0,0,0,0.45);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.05rem; flex-shrink: 0;
  }
  .fd-phead-title {
    font-family: 'Cinzel', serif;
    font-size: 0.92rem; font-weight: 700;
    color: #f5d68a; letter-spacing: 0.8px;
    text-shadow: 0 1px 6px rgba(0,0,0,0.5);
  }
  .fd-phead-sub {
    font-size: 0.65rem; font-weight: 800;
    letter-spacing: 0.8px; text-transform: uppercase;
    color: #7a5520; margin-top: 2px;
  }

  /* FORM */
  .fd-form {
    position: relative; z-index: 1;
    padding: 20px 22px 26px;
    display: flex; flex-direction: column; gap: 16px;
  }

  .fd-btn-new {
    width: 100%; padding: 14px;
    border-radius: 10px;
    border: 2px dashed rgba(200,150,60,0.4);
    background: rgba(200,130,20,0.07);
    color: #ffe066;
    font-family: 'Nunito', sans-serif;
    font-size: 0.88rem; font-weight: 800; letter-spacing: 0.4px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: all 0.22s;
    position: relative; overflow: hidden;
  }
  .fd-btn-new::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,200,60,0.06) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.55s;
  }
  .fd-btn-new:hover {
    border-color: rgba(200,150,60,0.75);
    background: rgba(200,130,20,0.14);
    box-shadow: 0 0 24px rgba(200,150,40,0.18);
  }
  .fd-btn-new:hover::before { transform: translateX(100%); }

  .fd-sep { display: flex; align-items: center; gap: 10px; }
  .fd-sep-line { flex: 1; height: 1px; background: rgba(140,80,20,0.3); }
  .fd-sep-txt {
    font-size: 0.63rem; font-weight: 800;
    letter-spacing: 1px; text-transform: uppercase; color: #5a3a10;
  }

  .fd-field { display: flex; flex-direction: column; gap: 5px; }
  .fd-field label {
    font-size: 0.65rem; font-weight: 800;
    letter-spacing: 0.8px; text-transform: uppercase; color: #9a6828;
  }

  .fd-input {
    width: 100%; padding: 10px 14px;
    border-radius: 8px;
    border: 1.5px solid rgba(140,80,20,0.35);
    background: rgba(0,0,0,0.32);
    color: #eec870;
    font-family: 'Nunito', sans-serif;
    font-size: 0.83rem; font-weight: 600;
    outline: none; transition: all 0.2s;
  }
  .fd-input::placeholder { color: #5a3a10; }
  .fd-input:focus {
    border-color: rgba(200,150,60,0.65);
    background: rgba(0,0,0,0.42);
    box-shadow: 0 0 0 3px rgba(200,150,40,0.1), 0 0 16px rgba(200,140,30,0.1);
  }

  .fd-tags { display: flex; flex-wrap: wrap; gap: 7px; }
  .fd-tag {
    padding: 5px 12px; border-radius: 20px;
    font-size: 0.7rem; font-weight: 800;
    cursor: pointer; border: 1.5px solid;
    transition: all 0.18s; user-select: none;
  }
  .fd-tag.active {
    background: rgba(200,150,40,0.22);
    border-color: rgba(200,150,40,0.65);
    color: #ffe066;
    box-shadow: 0 0 10px rgba(200,150,40,0.15);
  }
  .fd-tag:not(.active) {
    background: rgba(0,0,0,0.22);
    border-color: rgba(90,58,16,0.4);
    color: #7a5a22;
  }
  .fd-tag:not(.active):hover { border-color: rgba(160,100,30,0.6); color: #c9a455; }

  .fd-btn-search {
    width: 100%; padding: 14px;
    border-radius: 10px;
    border: 2px solid #7a4f10;
    background: linear-gradient(155deg, #6b4017 0%, #3a1c04 100%);
    color: #f5d68a;
    font-family: 'Cinzel', serif;
    font-size: 0.88rem; font-weight: 700; letter-spacing: 1.5px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: all 0.22s;
    box-shadow: 0 4px 18px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,150,60,0.12) inset;
    position: relative; overflow: hidden;
  }
  .fd-btn-search::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(155deg, rgba(255,200,80,0.08) 0%, transparent 55%);
    pointer-events: none;
  }
  .fd-btn-search:hover {
    border-color: #c9a455;
    background: linear-gradient(155deg, #8b5520 0%, #4a2408 100%);
    box-shadow: 0 6px 28px rgba(0,0,0,0.5), 0 0 32px rgba(200,150,40,0.22);
    transform: translateY(-1px);
  }
  .fd-btn-search:active { transform: none; }

  .fd-tomb {
    display: flex; justify-content: center;
    padding: 4px 0 14px; pointer-events: none;
  }
  .fd-tomb img {
    max-width: 150px; opacity: 0.5;
    filter: drop-shadow(0 6px 18px rgba(0,0,0,0.55)) sepia(20%);
  }

  /* MAP */
  .fd-map-body { position: relative; z-index: 1; padding: 16px; }

  .fd-map-frame {
    border-radius: 10px; overflow: hidden;
    border: 1.5px solid rgba(140,80,20,0.3);
    background: #0a0500; position: relative;
  }
  .fd-map-frame img {
    width: 100%; height: auto; display: block;
    opacity: 0.88;
    filter: sepia(25%) contrast(1.06);
    transition: all 0.4s;
  }
  .fd-map-frame:hover img { opacity: 1; transform: scale(1.014); }

  .fd-map-label {
    position: absolute; bottom: 12px; left: 12px;
    background: rgba(8,4,1,0.84);
    border: 1px solid rgba(140,80,20,0.45);
    border-radius: 8px; padding: 7px 13px;
    backdrop-filter: blur(6px);
  }
  .fd-map-label-title {
    font-family: 'Cinzel', serif;
    font-size: 0.72rem; font-weight: 700;
    color: #f5d68a; letter-spacing: 0.4px;
  }
  .fd-map-label-sub {
    font-size: 0.6rem; font-weight: 700;
    color: #7a5520; margin-top: 2px;
  }

  .fd-stats { display: flex; gap: 10px; margin-top: 14px; }
  .fd-stat {
    flex: 1;
    background: rgba(0,0,0,0.28);
    border: 1.5px solid rgba(140,80,20,0.25);
    border-radius: 10px; padding: 12px 8px; text-align: center;
    transition: border-color 0.2s;
  }
  .fd-stat:hover { border-color: rgba(180,110,30,0.5); }
  .fd-stat-num {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: 1.25rem; font-weight: 700;
    color: #f5d68a;
    text-shadow: 0 0 14px rgba(245,214,138,0.35);
  }
  .fd-stat-lbl {
    display: block;
    font-size: 0.6rem; font-weight: 800;
    letter-spacing: 0.6px; text-transform: uppercase;
    color: #6b4a18; margin-top: 3px;
  }

  /* SPARKS */
  @keyframes sparkUp {
    0%   { opacity: 0;   transform: translateY(0) scale(1); }
    15%  { opacity: 0.8; }
    85%  { opacity: 0.2; }
    100% { opacity: 0;   transform: translateY(-90px) scale(0.3); }
  }
  .fd-spark {
    position: fixed;
    width: 3px; height: 3px;
    border-radius: 50%;
    background: #f5a800;
    box-shadow: 0 0 6px 2px rgba(245,168,0,0.6);
    pointer-events: none; z-index: 3;
    animation: sparkUp linear infinite;
  }
`;

const GearSVG = ({ cls }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z" />
  </svg>
);

const CATEGORIES = ["📜 Thảo luận", "❓ Hỏi đáp", "🏆 Thành tích", "💡 Ý tưởng", "📣 Thông báo"];
const STATS = [
  { num: "1.2K", lbl: "Bài viết" },
  { num: "348",  lbl: "Thành viên" },
  { num: "89",   lbl: "Hôm nay" },
];
const SPARKS = [
  { l: "8%",  t: "72%", delay: "0s",   dur: "3.4s" },
  { l: "22%", t: "80%", delay: "1.2s", dur: "4.0s" },
  { l: "60%", t: "75%", delay: "0.6s", dur: "3.1s" },
  { l: "82%", t: "68%", delay: "2.1s", dur: "3.7s" },
  { l: "48%", t: "85%", delay: "1.8s", dur: "2.8s" },
];

export default function DienDanPage() {
  const navigate = useNavigate();
  const [activeTags, setActiveTags] = useState([]);
  const [title, setTitle]           = useState("");
  const [keyword, setKeyword]       = useState("");

  const toggleTag = (t) =>
    setActiveTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <>
      <style>{css}</style>

      {SPARKS.map((s, i) => (
        <div key={i} className="fd-spark"
          style={{ left: s.l, top: s.t, animationDelay: s.delay, animationDuration: s.dur }} />
      ))}

      <div className="fd-root">
        <div className="fd-vignette" />
        <button className="fd-back" onClick={() => navigate("/")}>←</button>

        <div className="fd-wrap">

          {/* BANNER */}
 

          {/* ornament divider */}
          <div className="fd-ornament">
            <div className="fd-orn-line" />
            <span className="fd-orn-icon">✦</span>
            <span className="fd-orn-icon">⚜</span>
            <span className="fd-orn-icon">✦</span>
            <div className="fd-orn-line" />
          </div>

          <div className="fd-layout">

            {/* ── LEFT: FORM PANEL ── */}
            <div className="fd-panel">
              <GearSVG cls="p-gear tl" /><GearSVG cls="p-gear tr" />
              <GearSVG cls="p-gear bl" /><GearSVG cls="p-gear br" />

              <div className="fd-phead">
                <div className="fd-phead-icon">📋</div>
                <div>
                  <div className="fd-phead-title">Bảng Tin Hội Quán</div>
                  <div className="fd-phead-sub">Tìm kiếm &amp; Đăng bài</div>
                </div>
              </div>

              <div className="fd-form">
                <button className="fd-btn-new">
                  <span>✦</span> Tạo bài viết mới
                </button>

                <div className="fd-sep">
                  <div className="fd-sep-line" />
                  <span className="fd-sep-txt">hoặc tìm kiếm</span>
                  <div className="fd-sep-line" />
                </div>

                <div className="fd-field">
                  <label>📜 Tiêu đề bài viết</label>
                  <input className="fd-input" placeholder="Nhập tiêu đề..."
                    value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="fd-field">
                  <label>🏷 Danh mục</label>
                  <div className="fd-tags">
                    {CATEGORIES.map(t => (
                      <span key={t}
                        className={`fd-tag${activeTags.includes(t) ? " active" : ""}`}
                        onClick={() => toggleTag(t)}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="fd-field">
                  <label>🔍 Từ khóa</label>
                  <input className="fd-input" placeholder="Nhập từ khóa..."
                    value={keyword} onChange={e => setKeyword(e.target.value)} />
                </div>

                <button className="fd-btn-search">
                  <span>🔍</span> Tìm Kiếm
                </button>
              </div>

     
            </div>

            {/* ── RIGHT: MAP PANEL ── */}
            <div className="fd-panel">
              <GearSVG cls="p-gear tl" /><GearSVG cls="p-gear tr" />
              <GearSVG cls="p-gear bl" /><GearSVG cls="p-gear br" />

              <div className="fd-phead">
                <div className="fd-phead-icon">🗺</div>
                <div>
                  <div className="fd-phead-title">Bản Đồ Thám Hiểm</div>
                  <div className="fd-phead-sub">Khu vực Diễn Đàn</div>
                </div>
              </div>

              <div className="fd-map-body">
                <div className="fd-map-frame">
                  <img src={mapNotfound} alt="Bản đồ diễn đàn" />
                  <div className="fd-map-label">
                    <div className="fd-map-label-title">🧭 Vùng đất Tri Thức</div>
                    <div className="fd-map-label-sub">Đang khám phá...</div>
                  </div>
                </div>

                <div className="fd-stats">
                  {STATS.map(s => (
                    <div key={s.lbl} className="fd-stat">
                      <span className="fd-stat-num">{s.num}</span>
                      <span className="fd-stat-lbl">{s.lbl}</span>
                    </div>
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