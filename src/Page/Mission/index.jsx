import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .wq-root {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: url('/bg.png') center/cover no-repeat;
    position: relative;
    padding: 40px 20px 60px;
  }

  .wq-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background: linear-gradient(160deg, #f5e6c8 0%, #e2c98a 35%, #c9a455 65%, #8b5e1a 100%);
    z-index: -1;
  }

  /* grain */
  .wq-root::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  }

  .wq-content {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ===== HEADER ===== */
  .wq-header {
    text-align: center;
    margin-bottom: 36px;
    animation: fadeDown 0.6s ease both;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .wq-header h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 900;
    color: #3d1a00;
    text-shadow: 0 1px 0 rgba(255,220,100,0.5), 0 3px 10px rgba(0,0,0,0.25);
    letter-spacing: 2px;
  }

  .wq-header .sub {
    margin-top: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #7a4e10;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .week-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 12px;
    padding: 6px 22px;
    background: linear-gradient(160deg, #6b4017, #3a2008);
    border: 2px solid #a0621a;
    border-radius: 20px;
    color: #f5d68a;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  /* ===== PROGRESS STRIP ===== */
  .wq-progress-wrap {
    margin-bottom: 32px;
    background: linear-gradient(160deg, #4a2b0a, #2a1505);
    border: 3px solid #a0621a;
    border-radius: 14px;
    padding: 16px 24px;
    position: relative;
    box-shadow: 0 6px 24px rgba(0,0,0,0.35), 0 0 0 1px #6b4017 inset;
    animation: fadeDown 0.6s ease 0.1s both;
  }

  .wq-progress-wrap::before {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 10px;
    border: 1.5px solid rgba(160,98,26,0.3);
    pointer-events: none;
  }

  /* gear corners on progress */
  .wq-progress-wrap .gc {
    position: absolute;
    width: 26px; height: 26px;
    color: #5a3a10;
  }
  .gc-tl { top: -11px; left: -11px; }
  .gc-tr { top: -11px; right: -11px; }
  .gc-bl { bottom: -11px; left: -11px; }
  .gc-br { bottom: -11px; right: -11px; }

  .progress-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .progress-top-label {
    font-size: 0.85rem;
    font-weight: 800;
    color: #f5d68a;
    letter-spacing: 0.4px;
  }

  .progress-top-count {
    font-size: 0.82rem;
    font-weight: 800;
    color: #c9a455;
  }

  .progress-track {
    height: 14px;
    background: rgba(0,0,0,0.4);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(160,98,26,0.35);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f5a800, #ffe066, #f5a800);
    background-size: 200% 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(245,168,0,0.5);
    animation: progressLoad 1.4s cubic-bezier(0.4,0,0.2,1) 0.4s both, shimmer 2.5s linear 2s infinite;
  }

  @keyframes progressLoad { from { width: 0 !important; } }
  @keyframes shimmer { 0%,100% { background-position: 200% 0; } 50% { background-position: 0% 0; } }

  /* ===== SECTION TITLE ===== */
  .section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .section-label-text {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #3d1a00;
    letter-spacing: 1px;
  }

  .section-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #a0621a, transparent);
    border-radius: 2px;
  }

  /* ===== QUEST GRID ===== */
  .quest-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  /* ===== QUEST CARD ===== */
  .quest-card {
    position: relative;
    background: linear-gradient(160deg, #6b4017 0%, #4a2b0a 50%, #3a2008 100%);
    border: 4px solid #2a1505;
    border-radius: 14px;
    padding: 20px 20px 18px;
    box-shadow:
      0 0 0 1.5px #a0621a inset,
      0 8px 28px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,200,80,0.08);
    cursor: pointer;
    transition: transform 0.22s cubic-bezier(.34,1.2,.64,1), box-shadow 0.2s;
    animation: cardPop 0.5s cubic-bezier(.34,1.56,.64,1) both;
  }

  .quest-card::before {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 10px;
    border: 1.5px solid rgba(160,98,26,0.3);
    pointer-events: none;
  }

  .quest-card:hover {
    transform: translateY(-4px) scale(1.015);
    box-shadow:
      0 0 0 1.5px #c07820 inset,
      0 14px 40px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,200,80,0.12);
  }

  .quest-card.completed {
    border-color: #1a4a1a;
    box-shadow:
      0 0 0 1.5px #22a63a inset,
      0 8px 28px rgba(0,0,0,0.4);
  }

  .quest-card.completed::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: rgba(34,166,58,0.06);
    pointer-events: none;
  }

  /* Gear corners on card */
  .quest-card .gc {
    position: absolute;
    width: 22px; height: 22px;
    color: #5a3a10;
  }
  .quest-card.completed .gc { color: #1e6b1e; }

  /* ===== CARD HEADER ===== */
  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 13px;
  }

  .card-icon-wrap {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
    border: 2px solid rgba(160,98,26,0.5);
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }

  .card-title-wrap {
    flex: 1;
    min-width: 0;
  }

  .card-subject {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #c9a455;
    margin-bottom: 3px;
  }

  .card-title {
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #f5d68a;
    line-height: 1.3;
    text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  }

  /* ===== DIVIDER ===== */
  .card-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(160,98,26,0.5), transparent);
    margin-bottom: 12px;
  }

  /* ===== CARD BODY ===== */
  .card-desc {
    font-size: 0.8rem;
    color: #c9a87a;
    line-height: 1.65;
    font-weight: 600;
    margin-bottom: 14px;
  }

  /* ===== KEY TIPS ===== */
  .card-tips {
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(160,98,26,0.3);
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 14px;
  }

  .card-tips-label {
    font-size: 0.67rem;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #f5d68a;
    margin-bottom: 7px;
  }

  .card-tip-item {
    font-size: 0.76rem;
    font-weight: 600;
    color: #c9a87a;
    line-height: 1.55;
    padding: 4px 0;
    border-bottom: 1px solid rgba(160,98,26,0.15);
  }

  .card-tip-item:last-child { border-bottom: none; }

  .card-tip-item strong {
    color: #ffe066;
    font-weight: 800;
  }

  /* Tasks checklist */
  .task-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 16px;
  }

  .task-item {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #c9a87a;
    cursor: pointer;
    transition: color 0.2s;
    user-select: none;
  }

  .task-item:hover { color: #f5d68a; }
  .task-item.done  { color: #6ee47b; text-decoration: line-through; opacity: 0.75; }

  .task-check {
    width: 17px; height: 17px;
    border-radius: 4px;
    border: 2px solid rgba(160,98,26,0.6);
    background: rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, border-color 0.2s;
    font-size: 0.65rem;
  }

  .task-item.done .task-check {
    background: #22a63a;
    border-color: #22a63a;
    color: white;
  }

  /* ===== CARD FOOTER ===== */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #a0821a;
  }

  .card-reward {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    font-weight: 800;
    color: #ffe066;
    background: rgba(245,168,0,0.15);
    padding: 3px 9px;
    border-radius: 10px;
    border: 1px solid rgba(245,168,0,0.3);
  }

  .card-status-badge {
    font-size: 0.68rem;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 10px;
    letter-spacing: 0.3px;
  }

  .badge-pending  { background: rgba(245,168,0,0.18); color: #ffe066; border: 1px solid rgba(245,168,0,0.4); }
  .badge-done     { background: rgba(34,166,58,0.18); color: #6ee47b; border: 1px solid rgba(34,166,58,0.4); }
  .badge-locked   { background: rgba(107,90,68,0.3);  color: #b0a090; border: 1px solid rgba(107,90,68,0.4); }
  .badge-overdue  { background: rgba(192,57,43,0.2);  color: #ff8c66; border: 1px solid rgba(192,57,43,0.4); }

  /* mini progress inside card */
  .card-mini-progress {
    margin-top: 10px;
  }

  .mini-track {
    height: 6px;
    background: rgba(0,0,0,0.35);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(160,98,26,0.25);
  }

  .mini-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.6s ease;
  }

  /* ===== EMPTY STATE ===== */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #7a4e10;
    font-size: 1rem;
    font-weight: 700;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 680px) {
    .quest-grid { grid-template-columns: 1fr; }
  }
`;

const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z"/>
  </svg>
);

const QUESTS_DATA = [
  {
    id: 1,
    subject: "Tuần 1",
    title: "Mật Mã Cất Cánh & Huy Hiệu Siêu Anh Hùng",
    icon: "🚀",
    iconBg: "linear-gradient(135deg,#4facfe,#0072ff)",
    desc: "Trước khi bay vào không gian, phi hành gia cần một 'bộ nhận diện' cực ngầu và một chiếc phi thuyền vững chãi. Hãy vẽ bản thiết kế tên lửa và tự tay chế tạo một Huy hiệu Đội bay từ nắp chai hoặc giấy màu để Whisker tự tin lên đường!",
    tips: [
      { label: "Sáng tạo", text: "Huy hiệu là gương mặt của đội ta! Nếu muốn đội thật nhanh nhẹn, hãy vẽ thêm một tia chớp. Nếu muốn thật thông minh, hãy vẽ một ngôi sao nhỏ ở giữa nhé!" },
      { label: "Kỹ thuật", text: "Để tên lửa không bị chao đảo khi bay, hãy lắp thêm những chiếc 'vây' ở đuôi. Bạn thử xem lắp 3 hay 4 chiếc vây thì tên lửa sẽ đứng vững hơn trên bệ phóng?" },
    ],
    tasks: [
      { id: "1a", text: "Vẽ bản thiết kế tên lửa của riêng mình", done: false },
      { id: "1b", text: "Chế tạo Huy hiệu Đội bay từ nắp chai / giấy màu", done: false },
      { id: "1c", text: "Thêm vây đuôi và kiểm tra độ cân bằng", done: false },
      { id: "1d", text: "Chia sẻ thiết kế với cả nhóm", done: false },
    ],
    reward: "120 xu",
    deadline: "Tuần 1",
    status: "pending",
    color: "#4facfe",
  },
  {
    id: 2,
    subject: "Tuần 2",
    title: "Kế Hoạch Hạ Cánh An Toàn",
    icon: "🪂",
    iconBg: "linear-gradient(135deg,#f7971e,#ffd200)",
    desc: "Sao Hỏa không có đường băng đâu! Nhà thám hiểm phải hạ cánh bằng thiết bị đặc biệt. Hãy chế tạo một 'Chiếc giỏ an toàn' giúp một quả trứng (đóng vai phi hành gia) không bị nứt vỡ khi rơi từ trên cao xuống đất.",
    tips: [
      { label: "Lực cản", text: "Hãy thử thả một tờ giấy phẳng và một tờ giấy vo tròn xem cái nào rơi chậm hơn? Một chiếc 'dù bay' khổng lồ từ túi nilon sẽ giúp Whisker lướt đi trong không khí cực êm đấy!" },
      { label: "Giảm chấn", text: "Hãy tưởng tượng phi thuyền có những chiếc chân nhún bằng ống hút hoặc một chiếc đệm bông thật êm ở đáy. Nó sẽ giúp quả trứng không bị 'đau' khi chạm đất đâu!" },
    ],
    tasks: [
      { id: "2a", text: "Thử nghiệm thả giấy phẳng vs giấy vo tròn", done: false },
      { id: "2b", text: "Chế tạo dù bay từ túi nilon", done: false },
      { id: "2c", text: "Làm đệm giảm chấn bằng ống hút / bông", done: false },
      { id: "2d", text: "Thử nghiệm thả trứng & ghi nhận kết quả", done: false },
    ],
    reward: "150 xu",
    deadline: "Tuần 2",
    status: "pending",
    color: "#f7971e",
  },
  {
    id: 3,
    subject: "Tuần 3",
    title: "Siêu Xe Rover Vượt Sa Mạc Bụi Đỏ",
    icon: "🛻",
    iconBg: "linear-gradient(135deg,#11998e,#38ef7d)",
    desc: "Chúc mừng bạn đã đáp cánh thành công! Nhưng trước mắt là bề mặt Sao Hỏa đầy đá hộc và cát lún. Hãy dùng dây thun để tạo ra nguồn năng lượng 'thần kỳ' giúp xe tự chạy về phía trước!",
    tips: [
      { label: "Độ bám", text: "Bánh xe bằng nắp chai nhựa thường rất trơn. Hãy thử quấn thêm vài vòng dây thun quanh nắp chai để biến chúng thành 'lốp xe địa hình' siêu bám đường nhé!" },
      { label: "Năng lượng", text: "Dây thun càng xoắn nhiều vòng thì xe càng có nhiều 'thần lực' để chạy xa. Nhưng nhớ đừng dán băng dính quá chặt vào trục xe, coi chừng xe bị 'kẹt chân' không chạy được đó!" },
    ],
    tasks: [
      { id: "3a", text: "Lắp bánh xe từ nắp chai nhựa", done: false },
      { id: "3b", text: "Quấn dây thun quanh bánh tạo lốp địa hình", done: false },
      { id: "3c", text: "Xoắn dây thun vào trục tạo năng lượng", done: false },
      { id: "3d", text: "Thử xe trên nhiều địa hình khác nhau", done: false },
    ],
    reward: "130 xu",
    deadline: "Tuần 3",
    status: "pending",
    color: "#11998e",
  },
  {
    id: 4,
    subject: "Tuần 4",
    title: "Cánh Tay Robot Săn Tìm Đá Báu",
    icon: "🦾",
    iconBg: "linear-gradient(135deg,#667eea,#764ba2)",
    desc: "Kho báu 'Viên đá Năng lượng' đang nằm sâu trong hốc đá hẹp. Không thể chạm tay trực tiếp vì đá rất nóng! Hãy chế tạo một Cánh tay gắp từ xa bằng bìa carton và dây chỉ để thu thập đá báu về trạm điều khiển.",
    tips: [
      { label: "Khớp nối", text: "Hãy nhìn vào ngón tay của mình: khi kéo gân tay, ngón tay sẽ gập lại. Bạn có thể dùng dây chỉ xỏ qua ống hút để làm 'sợi gân' giúp các ngón tay bìa cứng co duỗi khéo léo đấy!" },
      { label: "Mẹo gắp", text: "Để kẹp đá không bị trượt, hãy dán một chút băng dính hai mặt hoặc miếng nhám vào đầu kẹp. Đảm bảo đá báu sẽ dính chặt như có phép thuật!" },
    ],
    tasks: [
      { id: "4a", text: "Cắt bìa carton tạo hình cánh tay và ngón", done: false },
      { id: "4b", text: "Xỏ dây chỉ qua ống hút làm 'sợi gân'", done: false },
      { id: "4c", text: "Dán băng dính hai mặt vào đầu kẹp", done: false },
      { id: "4d", text: "Thử gắp và thu thập 'đá báu' thành công", done: false },
    ],
    reward: "200 xu",
    deadline: "Tuần 4",
    status: "pending",
    color: "#764ba2",
  },
];

const STATUS_CONFIG = {
  pending:  { label: "⏳ Đang làm",    cls: "badge-pending" },
  done:     { label: "✓ Hoàn thành",  cls: "badge-done"    },
  locked:   { label: "🔒 Chưa mở",    cls: "badge-locked"  },
  overdue:  { label: "⚠ Quá hạn",     cls: "badge-overdue" },
};

function QuestCard({ quest, animDelay }) {
  const [tasks, setTasks] = useState(quest.tasks);

  const toggleTask = (taskId) => {
    if (quest.status === "locked") return;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const doneCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const pct = Math.round((doneCount / totalCount) * 100);
  const isCompleted = quest.status === "done" || doneCount === totalCount;

  const fillColor = quest.status === "done"    ? "#22a63a"
                  : quest.status === "overdue" ? "#e74c3c"
                  : quest.color;

  return (
    <div
      className={`quest-card${isCompleted ? " completed" : ""}`}
      style={{ animationDelay: animDelay }}
    >
      {/* Gear corners */}
      <GearSVG className="gc gc-tl" />
      <GearSVG className="gc gc-tr" />
      <GearSVG className="gc gc-bl" />
      <GearSVG className="gc gc-br" />

      {/* Header */}
      <div className="card-header">
        <div className="card-icon-wrap" style={{ background: quest.iconBg }}>
          {quest.icon}
        </div>
        <div className="card-title-wrap">
          <div className="card-subject">{quest.subject}</div>
          <div className="card-title">{quest.title}</div>
        </div>
      </div>

      <div className="card-divider" />

      {/* Description */}
      <p className="card-desc">{quest.desc}</p>

      {/* Whisker Tips */}


      {/* Task checklist */}
      <ul className="task-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`task-item${task.done ? " done" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            <span className="task-check">{task.done ? "✓" : ""}</span>
            {task.text}
          </li>
        ))}
      </ul>

      {/* Mini progress */}
      <div className="card-mini-progress">
        <div className="mini-track">
          <div
            className="mini-fill"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${fillColor}99, ${fillColor})`,
              boxShadow: `0 0 8px ${fillColor}66`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer" style={{ marginTop: 12 }}>
        <div className="card-meta">📅 {quest.deadline}</div>
        <div className="card-reward">🪙 {quest.reward}</div>
        <span className={`card-status-badge ${STATUS_CONFIG[quest.status].cls}`}>
          {STATUS_CONFIG[quest.status].label}
        </span>
      </div>
    </div>
  );
}

export default function WeeklyQuest() {
  const totalTasks = QUESTS_DATA.flatMap(q => q.tasks).length;
  const doneTasks  = QUESTS_DATA.flatMap(q => q.tasks).filter(t => t.done).length;
  const doneQuests = QUESTS_DATA.filter(q => q.status === "done").length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  const pendingQuests = QUESTS_DATA.filter(q => q.status !== "done");
  const doneQuestList = QUESTS_DATA.filter(q => q.status === "done");

  return (
    <>
      <style>{styles}</style>
      <div className="wq-root">
        <div className="wq-content">

          {/* HEADER */}
          <div className="wq-header">
            <h1>🚀 Nhiệm Vụ Thám Hiểm Sao Hỏa</h1>
            <p className="sub">Hành trình cùng Whisker chinh phục vũ trụ</p>
            <span className="week-badge">🌌 4 Tuần · Tháng 1 · 2026</span>
          </div>

          {/* PROGRESS PANEL */}
          <div className="wq-progress-wrap">
            <GearSVG className="gc gc-tl" />
            <GearSVG className="gc gc-tr" />
            <GearSVG className="gc gc-bl" />
            <GearSVG className="gc gc-br" />
            <div className="progress-top">
              <span className="progress-top-label">
                🏆 Tổng tiến độ: {doneTasks}/{totalTasks} nhiệm vụ nhỏ
              </span>
              <span className="progress-top-count">{doneQuests}/{QUESTS_DATA.length} tuần hoàn thành · {pct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* IN PROGRESS SECTION */}
          <div className="section-label">
            <span className="section-label-text">⚔️ Đang thực hiện</span>
            <div className="section-line" />
          </div>
          <div className="quest-grid">
            {pendingQuests.length > 0
              ? pendingQuests.map((q, i) => (
                  <QuestCard key={q.id} quest={q} animDelay={`${0.1 + i * 0.08}s`} />
                ))
              : <div className="empty-state">🎉 Tất cả nhiệm vụ đã hoàn thành!</div>
            }
          </div>

          {/* COMPLETED SECTION */}
          {doneQuestList.length > 0 && (
            <>
              <div className="section-label">
                <span className="section-label-text">✅ Đã hoàn thành</span>
                <div className="section-line" />
              </div>
              <div className="quest-grid">
                {doneQuestList.map((q, i) => (
                  <QuestCard key={q.id} quest={q} animDelay={`${0.05 + i * 0.08}s`} />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}