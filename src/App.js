import './Style/index.scss';
import { Routes, Route } from "react-router-dom";

import Home from "./Page/Home/index.jsx";
import DienDanPage from './Page/DienDan/index.jsx';
import RegisterPanel from './Page/Login/index.jsx';
import LoginPanel from './Page/Login/index.jsx';
import Contact from './Page/Contact/index.jsx';
import Map from './Page/Map/index.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dien-dan" element={<DienDanPage />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/treasure" element={<Map />} />
    </Routes>
  );
}

export default App;