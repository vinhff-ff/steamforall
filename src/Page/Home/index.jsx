import imgMain from "../../assets/imgMain.jpg";
import game from "../../assets/game.png";
import map from "../../assets/map.png";
import schedule from "../../assets/schele.png";
import speed from "../../assets/speed.png";
import banner from "../../assets/banner.png";
import BtnCustom from "../../Custom/btn";

const Home = () => {
  const menus = [
    { img: speed, title: "Học tập theo cấp độ" },
    { img: schedule, title: "Bản đồ kho báu hàng tháng" },
    { img: map, title: "Nhiệm vụ hàng tuần" },
    { img: banner, title: "Quán rượu học tập" },
    { img: game, title: "Phòng trò chơi điện tử" },
  ];

  return (
    <div className="home">

      <div className="home-header">
        <div className="home-logo">
          Whisker
        </div>

        <div className="home-actions">
          <BtnCustom className="btn-surtell" text="Đăng kí" />
          <BtnCustom className="btn-surtell" text="Đăng nhập" />
        </div>
      </div>


      <div className="home-banner">
        <img src={imgMain} alt="banner" />
      </div>

      <div className="home-divider"></div>

      <div className="home-bg"></div>

      <div className="home-menu">
        {menus.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;