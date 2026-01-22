import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MathGenerator from './pages/MathGenerator';
import FractionGenerator from './pages/FractionGenerator';
import CoordinateGenerator from './pages/CoordinateGenerator';
import ArticleGenerator from './pages/ArticleGenerator';
import LearnTopic from './pages/LearnTopic';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/math-generator" element={<MathGenerator />} />
        <Route path="/fraction-generator" element={<FractionGenerator />} />
        <Route path="/coordinate-generator" element={<CoordinateGenerator />} />
        <Route path="/article-generator" element={<ArticleGenerator />} />
        <Route path="/learn/:topicId" element={<LearnTopic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
