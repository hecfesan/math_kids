import { useState } from 'react'
import { Link } from 'react-router-dom'
import FractionForm from '../components/FractionForm'
import FractionWorksheet from '../components/FractionWorksheet'
import { generateFractions } from '../utils/fractionGenerator'

function FractionGenerator() {
    const [problems, setProblems] = useState([]);
    const [view, setView] = useState('config'); // 'config' | 'worksheet'
    const [isInteractive, setIsInteractive] = useState(false);

    const handleGenerate = (config) => {
        const generated = generateFractions(config);
        setProblems(generated);
        setIsInteractive(config.isInteractive);
        setView('worksheet');
    };

    const handleBack = () => {
        setView('config');
    };

    return (
        <div className="container">
            <Link to="/" className="no-print btn" style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'transparent', color: 'var(--text-muted)', border: 'none' }}>
                ← Volver al Inicio
            </Link>

            <h1 className="no-print" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem', marginTop: '2rem' }}>
                <span className="gradient-text">Generador de Fracciones</span>
                <Link to="/learn/fractions" target="_blank" style={{ fontSize: '1.2rem', marginLeft: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} title="¿Qué son las fracciones?">
                    🎓 Ayuda
                </Link>
            </h1>
            <p className="no-print" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Identifica la fracción a partir de su representación visual.
                Puedes configurar el tipo de fracciones, la cantidad y resolverlas online o imprimirlas.
            </p>

            {view === 'config' ? (
                <FractionForm onGenerate={handleGenerate} />
            ) : (
                <FractionWorksheet problems={problems} onBack={handleBack} isInteractive={isInteractive} />
            )}
        </div>
    )
}

export default FractionGenerator
