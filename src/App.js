import './Style/index.scss';
import { Routes, Route } from "react-router-dom";

import Home from "./Page/Home/index.jsx";
import DienDanPage from './Page/DienDan/index.jsx';
import RegisterPanel from './Page/Login/index.jsx';
import LoginPanel from './Page/Login/index.jsx';
import Contact from './Page/Contact/index.jsx';
import Map from './Page/Map/index.jsx';
import Mission from './Page/Mission/index.jsx';
import Game from './Page/Game/index.jsx';
import Level from './Page/Level/index.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dien-dan" element={<DienDanPage />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/treasure" element={<Map />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/game" element={<Game />} />
      <Route path="/level" element={<Level />} />
    </Routes>
  );
}

export default App;