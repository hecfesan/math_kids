import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MathGenerator from './pages/MathGenerator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/math-generator" element={<MathGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
