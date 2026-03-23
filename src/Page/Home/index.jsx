import imgMain from "../../assets/imgMain.jpg";
import game from "../../assets/game.png";
import map from "../../assets/map.png";
import schedule from "../../assets/schele.png";
import speed from "../../assets/speed.png";
import banner from "../../assets/banner.png";
import BtnCustom from "../../Custom/btn";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const menus = [
    { img: speed, title: "Học tập theo cấp độ", path: "/level" },
    { img: schedule, title: "Bản đồ kho báu hàng tháng", path: "/treasure" },
    { img: map, title: "Nhiệm vụ hàng tuần", path: "/mission" },
    { img: banner, title: "Diễn đàn học tập", path: "/dien-dan" },
    { img: game, title: "Phòng trò chơi điện tử", path: "/game" },
  ];

  return (
    <div className="home">

      <div className="home-header">
        <div className="home-logo">
          Whisker
        </div>

        <div className="home-actions">
          <BtnCustom className="btn-surtell" text="Đăng nhập" onClick={()=> navigate('/login')}/>
          <BtnCustom className="btn-surtell" text="Liên hệ" onClick={()=> navigate('/contact')}/>
        </div>
      </div>


      <div className="home-banner">
        <img src={imgMain} alt="banner" />
      </div>

      <div className="home-divider"></div>

      <div className="home-bg"></div>

      <div className="home-menu">
        {menus.map((item, index) => (
          <div
            className="menu-card"
            key={index}
            onClick={() => navigate(item.path)}
          >
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;