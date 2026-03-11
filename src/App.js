import './Style/index.scss';
import { Routes, Route } from "react-router-dom";

import Home from "./Page/Home/index.jsx";
import DienDanPage from './Page/DienDan/index.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dien-dan" element={<DienDanPage />} />
    </Routes>
  );
}

export default App;