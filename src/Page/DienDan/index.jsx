import dienDan from "../../assets/dienDan.png";
import biaMo from "../../assets/biaMo.png";
import mapNotfound from "../../assets/mapNotfound.png";
import bgWhite from '../../assets/bgWhite.png';
import { useNavigate } from "react-router-dom";
export default function DienDanPage() {
  const navigate = useNavigate()
  return (
    <div className="forum-page" style={{ backgroundImage: `url(${bgWhite})` }}>
      <button class="btn-back" onClick={() => navigate('/')}>
        <span></span>
      </button>

      <img src={dienDan} alt="dien dan banner" className="forum-banner" />


      <div className="forum-content" >

        <div
          className="forum-tomb"
          style={{ backgroundImage: `url(${biaMo})` }}
        >
          <div className="forum-form">
            <button className="s">+ &nbsp; &nbsp; Tạo bài viết mới</button>
            <input placeholder="Tiêu đề bài viết..." />
            <input placeholder="Danh mục..." />
            <input placeholder="Từ khóa..." />

            <button className="btn-customs">Tìm kiếm</button>
          </div>
        </div>

        <div className="forum-map">
          <img src={mapNotfound} alt="map not found" />
        </div>

      </div>
    </div>
  );
}