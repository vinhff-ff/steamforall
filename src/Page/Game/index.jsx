import { useState, useEffect, useCallback, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Nunito:wght@600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pg-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: url('/bg.png') center/cover no-repeat;
    position: relative;
    overflow-x: hidden;
    padding: 30px 16px 60px;
  }

  .pg-root::before {
    content: '';
    position: fixed; inset: 0;
    background: linear-gradient(150deg,#1a0a2e 0%,#2d1260 30%,#1a2a50 65%,#0d1a3a 100%);
    z-index: -1;
  }

  /* Stars */
  .stars {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    overflow: hidden;
  }
  .star {
    position: absolute;
    border-radius: 50%;
    background: white;
    animation: twinkle var(--d,3s) ease-in-out infinite var(--delay,0s);
  }
  @keyframes twinkle {
    0%,100% { opacity: var(--min-op, 0.2); transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.4); }
  }

  .pg-content {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* ===== HEADER ===== */
  .pg-header {
    text-align: center;
    margin-bottom: 28px;
    animation: fadeDown .6s ease both;
  }
  @keyframes fadeDown {
    from { opacity:0; transform:translateY(-18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .pg-header h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem,4vw,2.4rem);
    font-weight: 900;
    background: linear-gradient(135deg,#ffe066,#f5a800,#ff6ec7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    letter-spacing: 2px;
    filter: drop-shadow(0 2px 12px rgba(245,168,0,0.4));
  }
  .pg-header .sub {
    margin-top: 7px;
    font-size: .85rem;
    font-weight: 700;
    color: #8899cc;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .week-chip {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 10px;
    padding: 5px 18px;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    color: #aac4ff;
    font-size: .8rem; font-weight: 800;
    backdrop-filter: blur(6px);
  }

  /* ===== TOP ROW ===== */
  .top-row {
    display: flex; gap: 14px; flex-wrap: wrap;
    margin-bottom: 22px;
    animation: fadeDown .6s ease .1s both;
  }

  /* Stat box */
  .stat-box {
    flex: 1; min-width: 110px;
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 16px;
    text-align: center;
    backdrop-filter: blur(8px);
  }
  .stat-val {
    font-family: 'Cinzel', serif;
    font-size: 1.6rem; font-weight: 900;
    background: linear-gradient(135deg,#ffe066,#f5a800);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(245,168,0,.5));
  }
  .stat-label {
    font-size: .7rem; font-weight: 800;
    color: #8899cc; letter-spacing: .5px;
    text-transform: uppercase; margin-top: 3px;
  }

  /* Timer */
  .timer-box {
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 20px;
    display: flex; align-items: center; gap: 10px;
    backdrop-filter: blur(8px);
  }
  .timer-val {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem; font-weight: 900;
    color: #ffe066;
    min-width: 68px;
    filter: drop-shadow(0 0 8px rgba(255,224,102,.4));
    transition: color .3s;
  }
  .timer-val.warning { color: #ff6b6b; filter: drop-shadow(0 0 10px rgba(255,107,107,.6)); }
  .timer-label { font-size: .7rem; font-weight: 800; color: #8899cc; text-transform: uppercase; letter-spacing: .5px; }

  /* ===== MAIN LAYOUT ===== */
  .main-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    align-items: start;
  }
  @media(max-width:768px) { .main-layout { grid-template-columns: 1fr; } }

  /* ===== QUESTION PANEL ===== */
  .question-panel {
    background: linear-gradient(160deg,#1e0a4a,#130838);
    border: 3px solid rgba(123,94,230,0.5);
    border-radius: 18px;
    padding: 24px;
    position: relative;
    box-shadow: 0 0 40px rgba(123,94,230,0.2), 0 8px 32px rgba(0,0,0,0.5);
    animation: fadeDown .6s ease .15s both;
  }
  .question-panel::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 16px;
    background: radial-gradient(ellipse at 30% 0%, rgba(123,94,230,0.12) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Gear corners – purple theme */
  .pg-gear {
    position: absolute;
    width: 28px; height: 28px;
    color: rgba(123,94,230,0.4);
  }
  .pg-gear-tl { top:-12px; left:-12px; }
  .pg-gear-tr { top:-12px; right:-12px; }
  .pg-gear-bl { bottom:-12px; left:-12px; }
  .pg-gear-br { bottom:-12px; right:-12px; }

  /* Question header */
  .q-meta {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .q-subject-badge {
    padding: 3px 12px;
    border-radius: 20px;
    font-size: .72rem; font-weight: 800;
    letter-spacing: .5px;
  }
  .q-num {
    font-size: .78rem; font-weight: 800;
    color: #5566aa;
  }
  .q-progress-dots {
    display: flex; gap: 5px;
  }
  .q-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,0.12);
    transition: background .3s;
  }
  .q-dot.done    { background: #22a63a; }
  .q-dot.current { background: #f5a800; box-shadow: 0 0 8px rgba(245,168,0,.6); }
  .q-dot.wrong   { background: #e74c3c; }

  .q-text {
    font-size: 1.05rem; font-weight: 800;
    color: #e8eaff;
    line-height: 1.6;
    margin-bottom: 18px;
    min-height: 52px;
  }
  .q-hint {
    font-size: .78rem; font-weight: 700;
    color: #5566aa; font-style: italic;
    margin-bottom: 20px;
  }

  /* ===== ANSWER ZONE ===== */
  .answer-zone {
    min-height: 52px;
    border: 2px dashed rgba(123,94,230,0.35);
    border-radius: 12px;
    padding: 10px 12px;
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 16px;
    background: rgba(123,94,230,0.05);
    transition: border-color .2s, background .2s;
    cursor: pointer;
    position: relative;
  }
  .answer-zone:hover { border-color: rgba(123,94,230,0.6); background: rgba(123,94,230,0.08); }
  .answer-zone-placeholder {
    color: rgba(123,94,230,0.4);
    font-size: .82rem; font-weight: 700;
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    white-space: nowrap; pointer-events: none;
  }

  /* ===== LETTER TILES ===== */
  .letter-tile {
    display: inline-flex; align-items: center; justify-content: center;
    width: 40px; height: 40px;
    border-radius: 8px;
    font-family: 'Cinzel', serif;
    font-size: 1rem; font-weight: 900;
    cursor: pointer;
    user-select: none;
    transition: transform .15s cubic-bezier(.34,1.56,.64,1), box-shadow .15s, filter .15s;
    animation: tileIn .25s cubic-bezier(.34,1.56,.64,1) both;
    position: relative;
    letter-spacing: 0;
  }
  @keyframes tileIn {
    from { opacity:0; transform:scale(.5) translateY(6px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  .letter-tile:hover { transform: scale(1.15) translateY(-2px); }
  .letter-tile:active { transform: scale(.92); }

  .tile-pool {
    background: linear-gradient(160deg,#3d2880,#2a1a60);
    border: 2px solid rgba(123,94,230,0.6);
    color: #e8d4ff;
    box-shadow: 0 4px 0 rgba(0,0,0,0.4), 0 6px 14px rgba(123,94,230,0.25);
  }
  .tile-pool:hover { box-shadow: 0 6px 0 rgba(0,0,0,0.4), 0 8px 20px rgba(123,94,230,0.4); }

  .tile-answer {
    background: linear-gradient(160deg,#4a1e7a,#2a0d50);
    border: 2px solid rgba(200,150,255,0.7);
    color: #f0e0ff;
    box-shadow: 0 4px 0 rgba(0,0,0,0.4), 0 6px 14px rgba(180,100,255,0.25);
  }

  .tile-correct {
    background: linear-gradient(160deg,#1a5a2a,#0d3a18) !important;
    border-color: rgba(100,230,130,0.7) !important;
    color: #a0ffb0 !important;
    box-shadow: 0 0 14px rgba(34,166,58,0.4) !important;
    animation: correctBounce .4s cubic-bezier(.34,1.56,.64,1) both !important;
  }
  @keyframes correctBounce {
    0%   { transform:scale(1); }
    40%  { transform:scale(1.25) rotate(-5deg); }
    70%  { transform:scale(0.95) rotate(3deg); }
    100% { transform:scale(1) rotate(0deg); }
  }

  .tile-wrong {
    animation: shake .4s ease both !important;
    border-color: rgba(255,107,107,0.8) !important;
    box-shadow: 0 0 14px rgba(255,107,107,0.5) !important;
  }
  @keyframes shake {
    0%,100% { transform:translateX(0); }
    20%  { transform:translateX(-6px) rotate(-3deg); }
    40%  { transform:translateX(6px) rotate(3deg); }
    60%  { transform:translateX(-4px); }
    80%  { transform:translateX(4px); }
  }

  /* Letter pool */
  .letter-pool {
    display: flex; flex-wrap: wrap; gap: 9px;
    margin-bottom: 20px;
    min-height: 52px;
  }

  /* Action buttons */
  .action-row {
    display: flex; gap: 10px; flex-wrap: wrap;
  }
  .btn-check {
    flex: 1; padding: 11px 20px;
    background: linear-gradient(135deg,#7b5ee8,#5a3dc8);
    border: none; border-radius: 10px;
    font-family: 'Nunito',sans-serif;
    font-size: .95rem; font-weight: 900;
    color: white; cursor: pointer;
    box-shadow: 0 4px 0 #3d28a0, 0 6px 16px rgba(90,61,200,.4);
    letter-spacing: .3px;
    transition: transform .1s, filter .15s;
  }
  .btn-check:hover { filter:brightness(1.1); }
  .btn-check:active { transform:translateY(3px); box-shadow:0 1px 0 #3d28a0; }
  .btn-check:disabled { opacity:.45; cursor:not-allowed; }

  .btn-clear {
    padding: 11px 16px;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 10px;
    font-family: 'Nunito',sans-serif;
    font-size: .9rem; font-weight: 800;
    color: #8899cc; cursor: pointer;
    transition: background .2s, color .2s;
  }
  .btn-clear:hover { background:rgba(255,255,255,0.1); color:#c0d0ff; }

  .btn-hint {
    padding: 11px 16px;
    background: rgba(255,200,50,0.1);
    border: 1.5px solid rgba(255,200,50,0.3);
    border-radius: 10px;
    font-family: 'Nunito',sans-serif;
    font-size: .9rem; font-weight: 800;
    color: #ffe066; cursor: pointer;
    transition: background .2s;
  }
  .btn-hint:hover { background:rgba(255,200,50,0.18); }
  .btn-hint:disabled { opacity:.4; cursor:not-allowed; }

  /* ===== RESULT FEEDBACK ===== */
  .feedback {
    margin-top: 14px;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: .85rem; font-weight: 800;
    display: flex; align-items: center; gap: 8px;
    animation: feedbackIn .3s ease both;
  }
  @keyframes feedbackIn {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .feedback.correct {
    background: rgba(34,166,58,0.15);
    border: 1.5px solid rgba(34,166,58,0.4);
    color: #6ee47b;
  }
  .feedback.wrong {
    background: rgba(231,76,60,0.15);
    border: 1.5px solid rgba(231,76,60,0.4);
    color: #ff8c80;
  }

  /* ===== RIGHT SIDEBAR ===== */
  .sidebar {
    display: flex; flex-direction: column; gap: 16px;
    animation: fadeDown .6s ease .2s both;
  }

  /* Quest list */
  .sidebar-panel {
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 16px;
    backdrop-filter: blur(8px);
  }
  .sidebar-title {
    font-family: 'Cinzel',serif;
    font-size: .82rem; font-weight: 700;
    color: #7b8ec8; letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .q-list-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background .2s;
    border: 1px solid transparent;
  }
  .q-list-item:hover { background: rgba(255,255,255,0.05); }
  .q-list-item.active {
    background: rgba(123,94,230,0.15);
    border-color: rgba(123,94,230,0.3);
  }
  .q-list-icon {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: .9rem; flex-shrink: 0;
  }
  .q-list-text { flex: 1; min-width: 0; }
  .q-list-name { font-size: .78rem; font-weight: 800; color: #c8d4ff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .q-list-sub  { font-size: .68rem; font-weight: 600; color: #5566aa; }
  .q-list-status { font-size: .85rem; }

  /* Reward log */
  .reward-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: .75rem; font-weight: 700;
    color: #8899cc;
  }
  .reward-item:last-child { border-bottom: none; }
  .reward-xu { color: #ffe066; font-weight: 900; margin-left: auto; }

  /* ===== WIN SCREEN ===== */
  .win-screen {
    position: fixed; inset: 0;
    background: rgba(10,5,30,0.92);
    z-index: 100;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(10px);
    animation: fadeIn .4s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .win-card {
    background: linear-gradient(160deg,#2a1060,#1a0a3a);
    border: 3px solid rgba(255,200,50,0.5);
    border-radius: 24px;
    padding: 44px 40px;
    text-align: center;
    max-width: 420px; width: 90%;
    box-shadow: 0 0 80px rgba(255,200,50,0.2), 0 20px 60px rgba(0,0,0,0.6);
    animation: winPop .6s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes winPop {
    from { opacity:0; transform:scale(.6) translateY(30px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  .win-emoji { font-size: 3.5rem; display: block; margin-bottom: 14px; animation: wiggle 1s ease infinite; }
  @keyframes wiggle {
    0%,100% { transform:rotate(-8deg) scale(1); }
    50%      { transform:rotate(8deg) scale(1.1); }
  }
  .win-title {
    font-family: 'Cinzel',serif;
    font-size: 1.8rem; font-weight: 900;
    background: linear-gradient(135deg,#ffe066,#f5a800);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }
  .win-sub { font-size: .88rem; font-weight: 700; color: #8899cc; margin-bottom: 24px; }
  .win-stats {
    display: flex; gap: 16px; justify-content: center;
    margin-bottom: 28px;
  }
  .win-stat-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 20px; text-align: center;
  }
  .win-stat-val { font-family:'Cinzel',serif; font-size:1.4rem; font-weight:900; color:#ffe066; }
  .win-stat-lbl { font-size:.68rem; font-weight:800; color:#5566aa; text-transform:uppercase; letter-spacing:.5px; margin-top:2px; }
  .btn-replay {
    padding: 13px 36px;
    background: linear-gradient(135deg,#7b5ee8,#5a3dc8);
    border: none; border-radius: 12px;
    font-family:'Nunito',sans-serif; font-size:1rem; font-weight:900;
    color:white; cursor:pointer;
    box-shadow: 0 4px 0 #3d28a0, 0 6px 20px rgba(90,61,200,.5);
    transition: filter .15s, transform .1s;
  }
  .btn-replay:hover { filter:brightness(1.1); }
  .btn-replay:active { transform:translateY(3px); }

  /* confetti particles */
  .confetti-wrap {
    position: fixed; inset: 0; pointer-events: none; z-index: 101; overflow: hidden;
  }
  .confetto {
    position: absolute;
    width: 8px; height: 8px;
    border-radius: 2px;
    animation: confettoFall var(--dur,3s) ease-in var(--delay,0s) both;
  }
  @keyframes confettoFall {
    0%   { transform: translateY(-20px) rotate(0deg) translateX(0); opacity:1; }
    100% { transform: translateY(110vh) rotate(720deg) translateX(var(--dx,30px)); opacity:0; }
  }
`;

const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z"/>
  </svg>
);

// ===== DATA =====
const QUESTIONS = [
  {
    id: 1, subject: "Toán", subjectColor: "#4facfe", subjectBg: "rgba(79,172,254,0.15)", icon: "📐",
    question: "Đây là phương trình bậc hai chuẩn, điền vào chỗ trống: ax² + bx + c = ?",
    answer: "KHONG", letters: ["K","H","O","N","G","X","M","A"],
    hint: "Khi f(x) = 0 nghĩa là phương trình...",
    reward: 80,
  },
  {
    id: 2, subject: "Vật lý", subjectColor: "#ffd200", subjectBg: "rgba(255,210,0,0.15)", icon: "⚡",
    question: "Định luật nào nói rằng 'Vật đứng yên thì tiếp tục đứng yên'?",
    answer: "QUAN TINH", letters: ["Q","U","A","N","T","I","N","H","Z","E"],
    hint: "Định luật thứ nhất của Newton còn gọi là định luật...",
    reward: 100,
  },
  {
    id: 3, subject: "Tiếng Anh", subjectColor: "#38ef7d", subjectBg: "rgba(56,239,125,0.15)", icon: "📖",
    question: "Thì hiện tại hoàn thành trong tiếng Anh tên là gì?",
    answer: "PERFECT", letters: ["P","E","R","F","C","T","A","B","I","O"],
    hint: "Have/Has + V3, thường gặp với 'already', 'yet', 'ever'...",
    reward: 90,
  },
  {
    id: 4, subject: "Lập trình", subjectColor: "#c471ed", subjectBg: "rgba(196,113,237,0.15)", icon: "💻",
    question: "Hook nào dùng để lưu trạng thái trong React?",
    answer: "USESTATE", letters: ["U","S","E","T","A","T","E","X","W","B"],
    hint: "const [value, setValue] = ___(...)",
    reward: 120,
  },
  {
    id: 5, subject: "Hóa học", subjectColor: "#f953c6", subjectBg: "rgba(249,83,198,0.15)", icon: "🧪",
    question: "Phản ứng trong đó chất khử nhường electron gọi là phản ứng gì?",
    answer: "OXI HOA", letters: ["O","X","I","H","O","A","B","C","K","L"],
    hint: "Ngược với phản ứng khử, liên quan đến việc mất electron...",
    reward: 110,
  },
  {
    id: 6, subject: "Lịch sử", subjectColor: "#f5a800", subjectBg: "rgba(245,168,0,0.15)", icon: "🏛️",
    question: "Cách mạng Tháng Tám 1945 diễn ra vào tháng mấy?",
    answer: "TAM", letters: ["T","A","M","N","I","L","H","K","O","E"],
    hint: "Tên đã nói lên tất cả – số thứ tự trong năm...",
    reward: 70,
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const COLORS = ["#ff6b6b","#ffe066","#6ee47b","#4facfe","#c471ed","#f953c6","#38ef7d","#ffd200"];

// Star component
function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: (Math.random() * 3 + 2).toFixed(1),
    delay: (Math.random() * 4).toFixed(1),
    minOp: (Math.random() * 0.15 + 0.05).toFixed(2),
  }));
  return (
    <div className="stars">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size,
          "--d": `${s.dur}s`, "--delay": `-${s.delay}s`,
          "--min-op": s.minOp,
        }} />
      ))}
    </div>
  );
}

// Confetti
function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    dur: (Math.random() * 2 + 2).toFixed(1),
    delay: (Math.random() * 1.5).toFixed(1),
    dx: ((Math.random() - 0.5) * 200).toFixed(0),
  }));
  return (
    <div className="confetti-wrap">
      {pieces.map(p => (
        <div key={p.id} className="confetto" style={{
          left: `${p.left}%`, top: 0,
          background: p.color,
          "--dur": `${p.dur}s`,
          "--delay": `${p.delay}s`,
          "--dx": `${p.dx}px`,
        }} />
      ))}
    </div>
  );
}

export default function PuzzleGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [pool, setPool] = useState(() => shuffle(QUESTIONS[0].letters).map((l, i) => ({ id: `p${i}`, char: l, used: false })));
  const [answer, setAnswer] = useState([]);
  const [feedback, setFeedback] = useState(null); // null | "correct" | "wrong"
  const [tileAnim, setTileAnim] = useState({}); // tileId -> "correct"|"wrong"
  const [scores, setScores] = useState(QUESTIONS.map(() => null)); // null|true|false
  const [totalXu, setTotalXu] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hints, setHints] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const [rewardLog, setRewardLog] = useState([]);
  const timerRef = useRef(null);

  const q = QUESTIONS[currentIdx];

  // Reset on question change
  useEffect(() => {
    setPool(shuffle(q.letters).map((l, i) => ({ id: `p${i}_${currentIdx}`, char: l, used: false })));
    setAnswer([]);
    setFeedback(null);
    setTileAnim({});
    setShowHint(false);
    setTimeLeft(60);
    setTimerActive(true);
  }, [currentIdx]);

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimerActive(false);
          setFeedback("wrong");
          setScores(s => { const n=[...s]; n[currentIdx]=false; return n; });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerActive, currentIdx]);

  const fmt = (t) => `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;

  // Move tile from pool to answer
  const pickTile = (tile) => {
    if (tile.used || feedback) return;
    const newTile = { ...tile, id: `a${tile.id}` };
    setPool(p => p.map(t => t.id === tile.id ? { ...t, used: true } : t));
    setAnswer(a => [...a, newTile]);
  };

  // Move tile from answer back to pool
  const returnTile = (tile) => {
    if (feedback) return;
    setAnswer(a => a.filter(t => t.id !== tile.id));
    setPool(p => p.map(t => t.id === tile.id.replace('a','') ? { ...t, used: false } : t));
  };

  const clearAnswer = () => {
    if (feedback) return;
    setAnswer([]);
    setPool(p => p.map(t => ({ ...t, used: false })));
  };

  const checkAnswer = () => {
    if (answer.length === 0 || feedback) return;
    clearInterval(timerRef.current);
    setTimerActive(false);
    const userAns = answer.map(t => t.char).join("").replace(/\s/g, "").toUpperCase();
    const correct = q.answer.replace(/\s/g, "").toUpperCase();
    const isRight = userAns === correct;

    const animMap = {};
    answer.forEach(t => { animMap[t.id] = isRight ? "correct" : "wrong"; });
    setTileAnim(animMap);
    setFeedback(isRight ? "correct" : "wrong");
    setScores(s => { const n = [...s]; n[currentIdx] = isRight; return n; });

    if (isRight) {
      const bonus = streak >= 2 ? Math.round(q.reward * 1.5) : q.reward;
      setTotalXu(x => x + bonus);
      setStreak(s => s + 1);
      setRewardLog(r => [{ subject: q.subject, xu: bonus, streak: streak + 1 }, ...r.slice(0, 4)]);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setShowWin(true);
    }
  };

  const useHint = () => {
    if (hints <= 0 || showHint || feedback) return;
    setHints(h => h - 1);
    setShowHint(true);
  };

  const restart = () => {
    setCurrentIdx(0);
    setScores(QUESTIONS.map(() => null));
    setTotalXu(0);
    setStreak(0);
    setHints(3);
    setRewardLog([]);
    setShowWin(false);
    setFeedback(null);
    setAnswer([]);
  };

  const correctCount = scores.filter(s => s === true).length;

  return (
    <>
      <style>{styles}</style>
      <Stars />

      <div className="pg-root">
        <div className="pg-content">

          {/* HEADER */}
          <div className="pg-header">
            <h1>🧩 Ghép Chữ Tri Thức</h1>
            <p className="sub">Trò chơi học tập hàng tuần</p>
            <span className="week-chip">📅 Tuần 4 · Tháng 3 · 2026</span>
          </div>

          {/* TOP ROW */}
          <div className="top-row">
            <div className="stat-box">
              <div className="stat-val">{totalXu}</div>
              <div className="stat-label">🪙 Xu tích lũy</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{correctCount}/{QUESTIONS.length}</div>
              <div className="stat-label">✅ Đúng</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{streak}</div>
              <div className="stat-label">🔥 Streak</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{hints}</div>
              <div className="stat-label">💡 Gợi ý</div>
            </div>
            <div className="timer-box">
              <div>
                <div className="timer-val" style={timeLeft <= 10 ? { color: '#ff6b6b', filter: 'drop-shadow(0 0 10px rgba(255,107,107,.6))' } : {}}>
                  {fmt(timeLeft)}
                </div>
                <div className="timer-label">⏱ Còn lại</div>
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="main-layout">

            {/* QUESTION PANEL */}
            <div className="question-panel">
              <GearSVG className="pg-gear pg-gear-tl" />
              <GearSVG className="pg-gear pg-gear-tr" />
              <GearSVG className="pg-gear pg-gear-bl" />
              <GearSVG className="pg-gear pg-gear-br" />

              {/* Meta row */}
              <div className="q-meta">
                <span className="q-subject-badge" style={{ background: q.subjectBg, color: q.subjectColor, border: `1px solid ${q.subjectColor}44` }}>
                  {q.icon} {q.subject}
                </span>
                <div className="q-progress-dots">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`q-dot ${
                      scores[i] === true ? "done" :
                      scores[i] === false ? "wrong" :
                      i === currentIdx ? "current" : ""
                    }`} />
                  ))}
                </div>
                <span className="q-num">Câu {currentIdx + 1}/{QUESTIONS.length}</span>
              </div>

              {/* Question text */}
              <div className="q-text">{q.question}</div>

              {/* Hint */}
              {showHint && <div className="q-hint">💡 {q.hint}</div>}

              {/* Answer zone */}
              <div className="answer-zone" onClick={() => answer.length > 0 && returnTile(answer[answer.length - 1])}>
                {answer.length === 0 && (
                  <span className="answer-zone-placeholder">Click chữ bên dưới để điền vào đây...</span>
                )}
                {answer.map(tile => (
                  <div
                    key={tile.id}
                    className={`letter-tile tile-answer ${tileAnim[tile.id] === "correct" ? "tile-correct" : tileAnim[tile.id] === "wrong" ? "tile-wrong" : ""}`}
                    onClick={e => { e.stopPropagation(); returnTile(tile); }}
                    style={{ animationDelay: "0s" }}
                  >
                    {tile.char}
                  </div>
                ))}
              </div>

              {/* Letter pool */}
              <div className="letter-pool">
                {pool.map((tile, idx) => (
                  !tile.used && (
                    <div
                      key={tile.id}
                      className="letter-tile tile-pool"
                      onClick={() => pickTile(tile)}
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      {tile.char}
                    </div>
                  )
                ))}
              </div>

              {/* Action buttons */}
              <div className="action-row">
                <button className="btn-check" onClick={checkAnswer} disabled={answer.length === 0 || !!feedback}>
                  ⚔️ Kiểm tra
                </button>
                <button className="btn-clear" onClick={clearAnswer} disabled={!!feedback}>🗑</button>
                <button className="btn-hint" onClick={useHint} disabled={hints === 0 || showHint || !!feedback}>
                  💡 {hints}
                </button>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className={`feedback ${feedback}`}>
                  {feedback === "correct"
                    ? `🎉 Chính xác! +${streak >= 2 ? Math.round(q.reward * 1.5) : q.reward} xu${streak >= 2 ? " (Streak bonus!)" : ""}`
                    : `😢 Sai rồi! Đáp án là: ${q.answer}`}
                  <button
                    onClick={nextQuestion}
                    style={{ marginLeft: "auto", background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: ".85rem", fontWeight: 800, textDecoration: "underline" }}
                  >
                    {currentIdx < QUESTIONS.length - 1 ? "Câu tiếp →" : "Xem kết quả →"}
                  </button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="sidebar">
              {/* Quest list */}
              <div className="sidebar-panel">
                <div className="sidebar-title">📋 Danh sách câu hỏi</div>
                {QUESTIONS.map((question, i) => (
                  <div
                    key={question.id}
                    className={`q-list-item ${i === currentIdx ? "active" : ""}`}
                    onClick={() => scores[i] !== null || i <= currentIdx ? setCurrentIdx(i) : null}
                  >
                    <div className="q-list-icon" style={{ background: question.subjectBg }}>
                      {question.icon}
                    </div>
                    <div className="q-list-text">
                      <div className="q-list-name">{question.subject}</div>
                      <div className="q-list-sub">+{question.reward} xu</div>
                    </div>
                    <span className="q-list-status">
                      {scores[i] === true ? "✅" : scores[i] === false ? "❌" : i === currentIdx ? "▶️" : "⏳"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reward log */}
              {rewardLog.length > 0 && (
                <div className="sidebar-panel">
                  <div className="sidebar-title">🪙 Phần thưởng gần đây</div>
                  {rewardLog.map((r, i) => (
                    <div key={i} className="reward-item">
                      <span>{r.subject}</span>
                      {r.streak >= 2 && <span style={{ fontSize: ".68rem", color: "#f5a800" }}>🔥x{r.streak}</span>}
                      <span className="reward-xu">+{r.xu} xu</span>
                    </div>
                  ))}
                  <div className="reward-item" style={{ marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 8 }}>
                    <span style={{ fontWeight: 900, color: "#c8d4ff" }}>Tổng cộng</span>
                    <span className="reward-xu">{totalXu} xu</span>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="sidebar-panel" style={{ fontSize: ".75rem", color: "#5566aa", fontWeight: 700, lineHeight: 1.7 }}>
                <div className="sidebar-title">📖 Hướng dẫn</div>
                <p>• Click chữ để thêm vào ô trả lời</p>
                <p>• Click chữ trong ô để bỏ ra</p>
                <p>• 🔥 Streak x2 thưởng thêm xu</p>
                <p>• 💡 Gợi ý: {hints} lần còn lại</p>
                <p>• ⏱ Mỗi câu 60 giây</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* WIN SCREEN */}
      {showWin && (
        <>
          <Confetti />
          <div className="win-screen">
            <div className="win-card">
              <span className="win-emoji">🏆</span>
              <div className="win-title">Hoàn Thành!</div>
              <div className="win-sub">Bạn đã chinh phục bài tập tuần này</div>
              <div className="win-stats">
                <div className="win-stat-box">
                  <div className="win-stat-val">{correctCount}/{QUESTIONS.length}</div>
                  <div className="win-stat-lbl">Câu đúng</div>
                </div>
                <div className="win-stat-box">
                  <div className="win-stat-val">{totalXu}</div>
                  <div className="win-stat-lbl">🪙 Xu</div>
                </div>
                <div className="win-stat-box">
                  <div className="win-stat-val">{Math.round((correctCount / QUESTIONS.length) * 100)}%</div>
                  <div className="win-stat-lbl">Điểm số</div>
                </div>
              </div>
              <button className="btn-replay" onClick={restart}>🔄 Chơi lại</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}