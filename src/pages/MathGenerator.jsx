import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfigurationForm from '../components/ConfigurationForm'
import Worksheet from '../components/Worksheet'
import { generateProblems } from '../utils/mathGenerator'

function MathGenerator() {
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
            <Link to="/" className="no-print btn" style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'transparent', color: 'var(--text-muted)', border: 'none' }}>
                ← Volver al Inicio
            </Link>

            <h1 className="no-print" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem', marginTop: '2rem' }}>
                <span className="gradient-text">Operaciones matemáticas</span>
                <Link to="/learn/math" target="_blank" style={{ fontSize: '1.2rem', marginLeft: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} title="¿Cómo hacer operaciones?">
                    🎓 Ayuda
                </Link>
            </h1>
            <p className="no-print" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Genera hojas de ejercicios personalizados de suma, resta, multiplicación y división.
                Configura el número de cifras, llevadas y decimales según el nivel deseado.
                Puedes imprimir las fichas o resolverlas directamente en pantalla.
            </p>

            {view === 'config' ? (
                <ConfigurationForm onGenerate={handleGenerate} />
            ) : (
                <Worksheet problems={problems} onBack={handleBack} isInteractive={isInteractive} />
            )}
        </div>
    )
}

export default MathGenerator
