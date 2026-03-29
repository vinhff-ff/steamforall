import { useState } from "react";
import "./LearningPage.scss";

// ============================================
// DATA
// ============================================
const LEVELS = [
  {
    id: "cap1",
    label: "Cấp 1",
    icon: "🌱",
    grades: [1, 2, 3, 4, 5],
    desc: "Tiểu học · Lớp 1–5",
  },
  {
    id: "cap2",
    label: "Cấp 2",
    icon: "📚",
    grades: [6, 7, 8, 9],
    desc: "THCS · Lớp 6–9",
  },
  {
    id: "cap3",
    label: "Cấp 3",
    icon: "🎓",
    grades: [10, 11, 12],
    desc: "THPT · Lớp 10–12",
  },
];

const WHISKER_DATA_GRADE_1 = [
  {
    week: "Tuần 1",
    content: `Bí kíp 1 (Sáng tạo):
"Huy hiệu là gương mặt của đội ta! Nếu bạn muốn đội mình thật nhanh nhẹn, hãy vẽ thêm một tia chớp. Nếu muốn thật thông minh, hãy vẽ một ngôi sao nhỏ ở giữa nhé!"

Bí kíp 2 (Kỹ thuật):
"Để tên lửa không bị chao đảo khi bay, hãy lắp thêm những chiếc 'vây' ở đuôi. Bạn thử xem lắp 3 hay 4 chiếc vây thì tên lửa sẽ đứng vững hơn trên bệ phóng?"`,
  },
  {
    week: "Tuần 2",
    content: `Bí kíp 1 (Lực cản):
"Bạn hãy thử thả một tờ giấy phẳng và một tờ giấy vo tròn xem cái nào rơi chậm hơn? Một chiếc 'dù bay' khổng lồ từ túi nilon sẽ giúp Whisker lướt đi trong không khí cực êm đấy!"

Bí kíp 2 (Giảm chấn):
"Hãy tưởng tượng phi thuyền có những chiếc chân nhún bằng ống hút hoặc một chiếc đệm bông thật êm ở đáy. Nó sẽ giúp quả trứng không bị 'đau' khi chạm đất đâu!"`,
  },
  {
    week: "Tuần 3",
    content: `Bí kíp 1 (Độ bám):
"Bánh xe bằng nắp chai nhựa thường rất trơn. Bạn hãy thử quấn thêm vài vòng dây thun quanh nắp chai để biến chúng thành 'lốp xe địa hình' siêu bám đường nhé!"

Bí kíp 2 (Năng lượng):
"Dây thun càng xoắn nhiều vòng thì xe càng có nhiều 'thần lực' để chạy xa. Nhưng nhớ đừng dán băng dính quá chặt vào trục xe, coi chừng xe bị 'kẹt chân' không chạy được đó!"`,
  },
  {
    week: "Tuần 4",
    content: `Bí kíp 1 (Khớp nối):
"Hãy nhìn vào ngón tay của mình xem, khi bạn kéo gân tay, ngón tay sẽ gập lại. Bạn có thể dùng dây chỉ xỏ qua ống hút để làm 'sợi gân' giúp các ngón tay bìa cứng co duỗi khéo léo đấy!"

Bí kíp 2 (Mẹo gắp):
"Để kẹp đá không bị trượt, hãy dán một chút băng dính hai mặt hoặc miếng nhám vào đầu kẹp. Đảm bảo đá báu sẽ dính chặt như có phép thuật!"`,
  },
];

// ============================================
// COMPONENTS
// ============================================

// Gear SVG Icon
const GearSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.92A.563.563 0 0 0 13.5 2h-4.4c-.28 0-.52.19-.56.47l-.42 2.92c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.09-.53 0-.66.24l-2.2 3.81c-.14.24-.08.54.13.7l2.32 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L2.1 14.73c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.81 1.85 1.09l.42 2.92c.04.28.28.47.56.47h4.4c.28 0 .52-.19.56-.47l.42-2.92c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.09.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z" />
  </svg>
);

// Grade Card Component
const GradeCard = ({ grade, onClick, delay }) => {
  return (
    <div className="grade-card" onClick={() => onClick(grade)} style={{ animationDelay: delay }}>
      <GearSVG className="gc gc-tl" />
      <GearSVG className="gc gc-tr" />
      <GearSVG className="gc gc-bl" />
      <GearSVG className="gc gc-br" />

      <div className="grade-num">{grade}</div>
      <div className="grade-label">Tháng 1</div>
      <div className="grade-count">Gợi ý</div>
    </div>
  );
};

// Weeks View (for Grade 1 - January)
const WeeksView = ({ onBack }) => {
  return (
    <div className="course-section">
      <div className="section-head">
        <h1>🐱 Bí kíp Whisker - Tháng 1</h1>
        <p>Khám phá những bí kíp sáng tạo cùng Whisker mỗi tuần</p>
      </div>

      <div className="course-grid">
        {WHISKER_DATA_GRADE_1.map((item, i) => (
          <div key={i} className="course-card">
            <GearSVG className="gc gc-tl" />
            <GearSVG className="gc gc-tr" />
            <GearSVG className="gc gc-bl" />
            <GearSVG className="gc gc-br" />
            <div className="course-body">
              <div className="course-title">{item.week}</div>
              <div className="course-desc" style={{ whiteSpace: "pre-line" }}>
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack} style={{ marginTop: "32px" }}>
        ← Quay lại chọn lớp
      </button>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function LearningPage() {
  const [view, setView] = useState("grades");
  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    if (grade === 1) {
      setView("weeks");
    } else {
      // For other grades, show coming soon message
      setView("comingSoon");
    }
  };

  const handleBackToGrades = () => {
    setView("grades");
    setSelectedGrade(null);
  };

  return (
    <div className="lp-root">
      <div className="lp-wrap">
        {/* VIEW 1: GRADE SELECTOR */}
        {view === "grades" && (
          <div className="grade-section">
            <div className="section-head">
              <h1>📚 Học viện Whisker</h1>
              <p>Chọn lớp học để bắt đầu hành trình khám phá tri thức</p>
            </div>

            {LEVELS.map((level, levelIdx) => (
              <div key={level.id} className="level-strip">
                <div className="level-strip-header">
                  <div
                    className="level-badge"
                    style={{
                      background:
                        level.id === "cap1"
                          ? "#43b89c"
                          : level.id === "cap2"
                          ? "#4facfe"
                          : "#c471ed",
                    }}
                  >
                    {level.icon}
                  </div>
                  <div className="level-title">{level.label}</div>
                  <div className="level-sub">{level.desc}</div>
                  <div className="level-line" />
                </div>

                <div className="grade-grid">
                  {level.grades.map((grade, i) => (
                    <GradeCard
                      key={grade}
                      grade={grade}
                      onClick={handleGradeSelect}
                      delay={`${levelIdx * 0.1 + i * 0.03}s`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: WEEKS (Special for Grade 1 - January) */}
        {view === "weeks" && (
          <WeeksView onBack={handleBackToGrades} />
        )}

        {/* VIEW 3: Coming Soon for other grades */}
        {view === "comingSoon" && (
          <div className="coming-soon-section">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">🚀</div>
              <h2>Đang phát triển</h2>
              <p>Gợi ý cho lớp {selectedGrade} sẽ sớm ra mắt!</p>
              <button className="back-btn" onClick={handleBackToGrades}>
                ← Quay lại chọn lớp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}