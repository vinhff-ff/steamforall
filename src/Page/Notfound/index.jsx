import React from "react";

const Notfound = () => {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a, #312e81, #000)",
    color: "#fff",
    fontFamily: "sans-serif",
  };

  const boxStyle = {
    textAlign: "center",
    padding: "20px",
  };

  const titleStyle = {
    fontSize: "90px",
    fontWeight: "900",
    letterSpacing: "6px",
    marginBottom: "10px",
    textShadow: "0 5px 20px rgba(0,0,0,0.5)",
  };

  const subtitleStyle = {
    fontSize: "20px",
    marginBottom: "10px",
    opacity: 0.85,
  };

  const descStyle = {
    fontSize: "14px",
    opacity: 0.6,
    marginBottom: "30px",
  };

  const buttonStyle = {
    padding: "12px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
    transition: "0.2s",
  };

  const dotContainer = {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    opacity: 0.4,
  };

  const dot = (delay) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#a78bfa",
    animation: "bounce 1s infinite",
    animationDelay: delay,
  });

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      <div style={boxStyle}>
        <div style={titleStyle}>404</div>

        <div style={subtitleStyle}>
          Trang này chưa được phát triển 🚧
        </div>

        <div style={descStyle}>
          Có vẻ bạn đang đi lạc rồi... quay về trang chính nhé!
        </div>

        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onClick={() => (window.location.href = "/")}
        >
          ⬅ Quay về trang chủ
        </button>

        <div style={dotContainer}>
          <div style={dot("0s")} />
          <div style={dot("0.2s")} />
          <div style={dot("0.4s")} />
        </div>
      </div>
    </div>
  );
};

export default Notfound;