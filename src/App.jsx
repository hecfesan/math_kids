import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MathGenerator from './pages/MathGenerator';
import FractionGenerator from './pages/FractionGenerator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/math-generator" element={<MathGenerator />} />
        <Route path="/fraction-generator" element={<FractionGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
