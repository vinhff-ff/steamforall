import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tm-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: url('/bg.png') center/cover no-repeat;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* parchment fallback */
  .tm-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 20%, #d4a85a33 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, #8b4513 22 0%, transparent 60%),
      linear-gradient(160deg, #f5e6c8 0%, #e2c98a 35%, #c9a455 65%, #8b5e1a 100%);
    z-index: -1;
  }

  /* grain overlay */
  .tm-root::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* ===== HEADER ===== */
  .tm-header {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 36px 20px 10px;
  }

  .tm-header h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.8rem);
    font-weight: 900;
    color: #3d1a00;
    text-shadow:
      0 1px 0 rgba(255,220,100,0.6),
      0 3px 12px rgba(0,0,0,0.3);
    letter-spacing: 2px;
  }

  .tm-header .subtitle {
    font-size: 0.9rem;
    font-weight: 700;
    color: #7a4e10;
    margin-top: 6px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* month badge */
  .month-badge {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 22px;
    background: linear-gradient(160deg, #6b4017, #3a2008);
    border: 2px solid #a0621a;
    border-radius: 20px;
    color: #f5d68a;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 1px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  /* ===== MAP CANVAS ===== */
  .tm-map {
    position: relative;
    z-index: 2;
    width: min(960px, 96vw);
    margin: 30px auto 40px;
  }

  .tm-svg {
    width: 100%;
    height: auto;
    overflow: visible;
    filter: drop-shadow(0 8px 32px rgba(0,0,0,0.25));
  }

  /* ===== PATH ===== */
  .map-path-bg {
    fill: none;
    stroke: #7a4e10;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.3;
  }

  .map-path {
    fill: none;
    stroke: url(#pathGrad);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: drawPath 2.4s cubic-bezier(0.4,0,0.2,1) 0.3s forwards;
  }

  .map-path-dots {
    fill: none;
    stroke: rgba(255,220,120,0.35);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 1 18;
    stroke-linejoin: round;
  }

  @keyframes drawPath {
    to { stroke-dashoffset: 0; }
  }

  /* ===== NODE WRAPPER ===== */
  .node-wrap {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  /* ===== NODE BTN ===== */
  .node-btn {
    position: relative;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
    animation: nodePop 0.5s cubic-bezier(.34,1.56,.64,1) both;
    outline: none;
  }

  .node-btn:hover {
    transform: scale(1.22);
    z-index: 20;
  }

  .node-btn:hover .node-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-4px);
    pointer-events: auto;
  }

  @keyframes nodePop {
    from { opacity: 0; transform: scale(0.4); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* node states */
  .node-done {
    background: radial-gradient(circle at 35% 30%, #6ee47b, #22a63a);
    box-shadow: 0 0 0 4px #fff, 0 0 0 7px #22a63a, 0 6px 20px rgba(34,166,58,0.45);
  }

  .node-active {
    background: radial-gradient(circle at 35% 30%, #ffe066, #f5a800);
    box-shadow: 0 0 0 4px #fff, 0 0 0 7px #f5a800, 0 6px 20px rgba(245,168,0,0.55);
    animation: nodePop 0.5s cubic-bezier(.34,1.56,.64,1) both, pulse 1.8s ease-in-out infinite 1s;
  }

  .node-locked {
    background: radial-gradient(circle at 35% 30%, #b0a090, #6b5a44);
    box-shadow: 0 0 0 4px #fff8, 0 0 0 7px #6b5a44, 0 6px 20px rgba(0,0,0,0.3);
    filter: saturate(0.4);
    cursor: not-allowed;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 4px #fff, 0 0 0 7px #f5a800, 0 6px 20px rgba(245,168,0,0.55); }
    50%       { box-shadow: 0 0 0 4px #fff, 0 0 0 12px #f5a800aa, 0 8px 28px rgba(245,168,0,0.7); }
  }

  /* boss node */
  .node-boss {
    width: 72px;
    height: 72px;
    font-size: 1.7rem;
    background: radial-gradient(circle at 35% 30%, #ff8c66, #c0392b);
    box-shadow: 0 0 0 5px #fff, 0 0 0 9px #c0392b, 0 8px 28px rgba(192,57,43,0.6);
    animation: nodePop 0.5s cubic-bezier(.34,1.56,.64,1) both, bossGlow 2s ease-in-out infinite 1s;
  }

  @keyframes bossGlow {
    0%, 100% { box-shadow: 0 0 0 5px #fff, 0 0 0 9px #c0392b, 0 8px 28px rgba(192,57,43,0.6); }
    50%       { box-shadow: 0 0 0 5px #fff, 0 0 0 14px #c0392baa, 0 12px 40px rgba(192,57,43,0.85); }
  }

  /* node number badge */
  .node-num {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3d1a00;
    color: #f5d68a;
    font-size: 0.62rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #a0621a;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  }

  /* ===== TOOLTIP ===== */
  .node-tooltip {
    position: absolute;
    bottom: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    width: 200px;
    background: linear-gradient(160deg, #4a2b0a, #2a1505);
    border: 2px solid #a0621a;
    border-radius: 12px;
    padding: 12px 14px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 6px 24px rgba(0,0,0,0.5);
    z-index: 30;
  }

  .node-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 7px solid transparent;
    border-top-color: #a0621a;
  }

  .node-tooltip::before {
    content: '';
    position: absolute;
    top: calc(100% + 2px);
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #2a1505;
    z-index: 1;
  }

  .tooltip-title {
    font-size: 0.82rem;
    font-weight: 900;
    color: #f5d68a;
    margin-bottom: 5px;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.4px;
  }

  .tooltip-desc {
    font-size: 0.75rem;
    color: #c9a87a;
    line-height: 1.5;
    font-weight: 600;
  }

  .tooltip-reward {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 800;
    color: #ffe066;
  }

  .tooltip-status {
    margin-top: 6px;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 8px;
    display: inline-block;
  }
  .status-done    { background: #22a63a33; color: #6ee47b; border: 1px solid #22a63a66; }
  .status-active  { background: #f5a80033; color: #ffe066; border: 1px solid #f5a80066; }
  .status-locked  { background: #6b5a4433; color: #b0a090; border: 1px solid #6b5a4466; }

  /* ===== LEGEND ===== */
  .tm-legend {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 40px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(58,32,8,0.6);
    border: 1.5px solid #a0621a55;
    border-radius: 20px;
    padding: 6px 14px;
    backdrop-filter: blur(4px);
  }

  .legend-dot {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.5);
    flex-shrink: 0;
  }

  .legend-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #e8c87a;
  }

  /* ===== PROGRESS BAR ===== */
  .tm-progress {
    position: relative;
    z-index: 2;
    width: min(400px, 90vw);
    margin: 0 auto 28px;
    background: rgba(58,32,8,0.55);
    border: 2px solid #a0621a55;
    border-radius: 20px;
    padding: 12px 20px;
    backdrop-filter: blur(4px);
    text-align: center;
  }

  .progress-label {
    font-size: 0.8rem;
    font-weight: 800;
    color: #f5d68a;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  .progress-track {
    height: 12px;
    background: rgba(0,0,0,0.35);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(160,98,26,0.4);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f5a800, #ffe066);
    border-radius: 8px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 0 10px rgba(245,168,0,0.6);
    animation: progressLoad 1.5s cubic-bezier(0.4,0,0.2,1) 0.5s both;
  }

  @keyframes progressLoad {
    from { width: 0 !important; }
  }

  /* decorative map elements */
  .deco-compass {
    position: absolute;
    bottom: 60px;
    left: 30px;
    width: 80px;
    opacity: 0.18;
    z-index: 1;
    animation: spin 40s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

const NODES = [
  {
    id: 1, x: 9, y: 72,
    icon: "🏕️", status: "done",
    title: "Khởi hành",
    desc: "Hoàn thành bài học đầu tiên của tháng. Mở khóa hành trình kho báu.",
    reward: "50 xu + 1 chìa khóa",
    delay: "0.4s",
  },
  {
    id: 2, x: 22, y: 52,
    icon: "📜", status: "done",
    title: "Cuộn Bí Ẩn",
    desc: "Giải mã 3 câu đố logic trong vòng 10 phút.",
    reward: "80 xu + kinh nghiệm x2",
    delay: "0.55s",
  },
  {
    id: 3, x: 35, y: 68,
    icon: "⚔️", status: "done",
    title: "Thử Thách Kiếm",
    desc: "Vượt qua 5 bài kiểm tra kỹ năng liên tiếp không sai.",
    reward: "120 xu + huy hiệu Dũng Sĩ",
    delay: "0.7s",
  },
  {
    id: 4, x: 47, y: 40,
    icon: "🔥", status: "active",
    title: "Hang Lửa",
    desc: "Hoàn thành dự án nhóm và nộp báo cáo trước ngày 15.",
    reward: "200 xu + skin hiếm",
    delay: "0.85s",
  },
  {
    id: 5, x: 60, y: 60,
    icon: "🌊", status: "locked",
    title: "Vực Sâu Đại Dương",
    desc: "Đạt điểm tuyệt đối trong 2 bài kiểm tra liên tiếp.",
    reward: "150 xu + mảnh bản đồ",
    delay: "1s",
  },
  {
    id: 6, x: 72, y: 38,
    icon: "🗝️", status: "locked",
    title: "Cổng Bí Mật",
    desc: "Thu thập đủ 3 mảnh chìa khóa từ các nhiệm vụ trước.",
    reward: "180 xu + vật phẩm đặc biệt",
    delay: "1.15s",
  },
  {
    id: 7, x: 85, y: 55,
    icon: "💀", status: "locked",
    title: "Thủ Lĩnh Bóng Tối",
    desc: "Boss tháng này! Hoàn thành tất cả nhiệm vụ trước và đạt 90% điểm tổng.",
    reward: "500 xu + danh hiệu Huyền Thoại",
    delay: "1.3s",
    isBoss: true,
  },
  {
    id: 8, x: 93, y: 30,
    icon: "🏆", status: "locked",
    title: "Kho Báu Tháng",
    desc: "Phần thưởng cuối cùng của hành trình. Chỉ những người xuất sắc nhất mới đến được đây!",
    reward: "1000 xu + thẻ quà tặng",
    delay: "1.45s",
    isBoss: false,
  },
];

// SVG path through all nodes (cubic bezier curves)
const PATH_D = `
  M 86 648
  C 140 520, 180 480, 211 472
  C 250 460, 270 490, 336 612
  C 380 680, 410 660, 452 360
  C 470 240, 510 280, 580 540
  C 620 640, 660 620, 692 342
  C 710 220, 740 200, 820 496
  C 850 580, 870 560, 898 270
`;

const doneCount = NODES.filter(n => n.status === "done").length;
const progress = Math.round((doneCount / NODES.length) * 100);

const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z" />
  </svg>
);

function MapNode({ node, svgWidth, svgHeight }) {
  const [hovered, setHovered] = useState(false);

  const px = (node.x / 100) * svgWidth;
  const py = (node.y / 100) * svgHeight;

  const nodeClass = [
    "node-btn",
    node.status === "done" ? "node-done" :
      node.status === "active" ? "node-active" : "node-locked",
    node.isBoss ? "node-boss" : ""
  ].join(" ");

  const statusLabel = node.status === "done" ? "✓ Hoàn thành" :
    node.status === "active" ? "▶ Đang thực hiện" : "🔒 Chưa mở khóa";
  const statusClass = `tooltip-status status-${node.status}`;

  return (
    <div
      className="node-wrap"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        animationDelay: node.delay,
      }}
    >
      <button
        className={nodeClass}
        style={{ animationDelay: node.delay }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={node.status === "locked"}
      >
        {node.icon}
        <span className="node-num">{node.id}</span>

        {/* Tooltip */}
        <div className="node-tooltip">
          <div className="tooltip-title">{node.title}</div>
          <div className="tooltip-desc">{node.desc}</div>
          <div className="tooltip-reward">🪙 {node.reward}</div>
          <span className={statusClass}>{statusLabel}</span>
        </div>
      </button>
    </div>
  );
}

export default function TreasureMap() {
  // SVG viewBox size
  const VW = 960, VH = 720;

  return (
    <>
      <style>{styles}</style>

      {/* Decorative rotating gear bg */}
      <div style={{
        position: "fixed", bottom: 40, left: 20,
        opacity: 0.07, zIndex: 1, pointerEvents: "none",
        animation: "spin 50s linear infinite",
        fontSize: "120px"
      }}>⚙️</div>
      <div style={{
        position: "fixed", top: 60, right: 30,
        opacity: 0.05, zIndex: 1, pointerEvents: "none",
        animation: "spin 70s linear infinite reverse",
        fontSize: "90px"
      }}>⚙️</div>

      <div className="tm-root">
        {/* HEADER */}
        <div className="tm-header">
          <h1>⚔️ Hành Trình Kho Báu ⚔️</h1>
          <p className="subtitle">Bản đồ nhiệm vụ tháng này của bạn</p>
          <span className="month-badge">📅 Tháng 1 · 2026</span>
        </div>

        {/* PROGRESS */}
        <div className="tm-progress">
          <div className="progress-label">Tiến độ hành trình: {doneCount}/{NODES.length} nhiệm vụ hoàn thành</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* MAP */}
        <div className="tm-map">
          {/* SVG path layer */}
          <svg
            className="tm-svg"
            viewBox={`0 0 ${VW} ${VH}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22a63a" />
                <stop offset="40%" stopColor="#f5a800" />
                <stop offset="60%" stopColor="#f5a800" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6b5a44" stopOpacity="0.4" />
              </linearGradient>

              {/* parchment texture for map bg */}
              <filter id="paper">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
                <feComponentTransfer in="blend">
                  <feFuncA type="linear" slope="1" />
                </feComponentTransfer>
              </filter>
            </defs>

            {/* Map background parchment */}
            <rect x="10" y="10" width={VW - 20} height={VH - 20} rx="18"
              fill="rgba(240,220,170,0.22)"
              stroke="rgba(120,80,20,0.25)"
              strokeWidth="3"
            />

            {/* Subtle grid lines */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line key={`v${i}`}
                x1={i * VW / 8} y1="10" x2={i * VW / 8} y2={VH - 10}
                stroke="rgba(120,80,20,0.06)" strokeWidth="1"
              />
            ))}
            {[1, 2, 3, 4, 5].map(i => (
              <line key={`h${i}`}
                x1="10" y1={i * VH / 5} x2={VW - 10} y2={i * VH / 5}
                stroke="rgba(120,80,20,0.06)" strokeWidth="1"
              />
            ))}

            {/* Path shadow */}
            <path className="map-path-bg" d={PATH_D} strokeWidth="14" opacity="0.2" />

            {/* Dotted decoration path */}
            <path className="map-path-dots" d={PATH_D} />

            {/* Animated main path */}
            <path className="map-path" d={PATH_D} />

            {/* Footprint dots along path */}
            {[0.05, 0.12, 0.19, 0.26, 0.33].map((t, i) => (
              <circle key={i} r="3" fill="rgba(245,168,0,0.4)"
                style={{
                  offsetPath: `path('${PATH_D}')`,
                  offsetDistance: `${t * 100}%`
                }}
              />
            ))}

            {/* Map label decorations */}
            <text x="50" y="40" fill="rgba(100,60,10,0.3)"
              fontSize="13" fontFamily="Cinzel,serif" fontWeight="700"
              letterSpacing="2">TERRA INCOGNITA</text>
            <text x={VW - 160} y={VH - 20} fill="rgba(100,60,10,0.25)"
              fontSize="11" fontFamily="Cinzel,serif" fontStyle="italic">
              Steamedu · 2026
            </text>

            {/* Compass rose */}
            <g transform={`translate(${VW - 80}, ${VH - 80})`} opacity="0.18">
              <circle r="28" fill="none" stroke="#7a4e10" strokeWidth="1.5" />
              <path d="M0,-26 L4,-4 L0,-10 L-4,-4 Z" fill="#7a4e10" />
              <path d="M0,26 L4,4 L0,10 L-4,4 Z" fill="#7a4e1088" />
              <path d="M-26,0 L-4,4 L-10,0 L-4,-4 Z" fill="#7a4e1088" />
              <path d="M26,0 L4,4 L10,0 L4,-4 Z" fill="#7a4e1088" />
              <text y="5" textAnchor="middle" fill="#7a4e10" fontSize="9" fontFamily="Cinzel,serif" fontWeight="700">N</text>
            </g>
          </svg>

          {/* Node buttons overlay */}
          {NODES.map(node => (
            <MapNode
              key={node.id}
              node={node}
              svgWidth={VW}
              svgHeight={VH}
            />
          ))}
        </div>

        {/* LEGEND */}
        <div className="tm-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "radial-gradient(circle at 35% 30%, #6ee47b, #22a63a)" }} />
            <span className="legend-label">Hoàn thành</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "radial-gradient(circle at 35% 30%, #ffe066, #f5a800)" }} />
            <span className="legend-label">Đang thực hiện</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "radial-gradient(circle at 35% 30%, #b0a090, #6b5a44)" }} />
            <span className="legend-label">Chưa mở khóa</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "radial-gradient(circle at 35% 30%, #ff8c66, #c0392b)", width: 20, height: 20 }} />
            <span className="legend-label">Boss tháng</span>
          </div>
        </div>
      </div>
    </>
  );
}