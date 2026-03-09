import imgMain from "../../assets/imgMain.jpg";
import game from "../../assets/game.png";
import map from "../../assets/map.png";
import schedule from "../../assets/schele.png";
import speed from "../../assets/speed.png";
import banner from "../../assets/banner.png";

const Home = () => {
  const menus = [
    { img: speed, title: "Level-based Learning" },
    { img: schedule, title: "Monthly Treasure Map" },
    { img: map, title: "Weekly Quests" },
    { img: banner, title: "Learning Tavern" },
    { img: game, title: "Arcade Room" },
  ];

  return (
    <div className="home">

      <div className="home-header">
        <div className="home-logo">
          Whisker
        </div>

        <div className="home-actions">
          <button className="btn-contact">Contact</button>
          <button className="btn-surtell">Surtell</button>
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