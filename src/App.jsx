import { useState } from 'react'
import ConfigurationForm from './components/ConfigurationForm'
import Worksheet from './components/Worksheet'
import { generateProblems } from './utils/mathGenerator'

function App() {
  const [problems, setProblems] = useState([]);
  const [view, setView] = useState('config'); // 'config' | 'worksheet'
  const [isInteractive, setIsInteractive] = useState(false);

  const handleGenerate = (config) => {
    const generated = generateProblems(config);
    setProblems(generated);
    setIsInteractive(config.isInteractive);
    setView('worksheet');
  };

  const handleBack = () => {
    setView('config');
  };

  return (
    <div className="container">
      <h1 className="no-print" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '3rem' }}>
        <span className="gradient-text">Math Generator</span>
      </h1>

      {view === 'config' ? (
        <ConfigurationForm onGenerate={handleGenerate} />
      ) : (
        <Worksheet problems={problems} onBack={handleBack} isInteractive={isInteractive} />
      )}
    </div>
  )
}

export default App
