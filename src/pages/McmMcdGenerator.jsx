import { useState } from 'react';
import { Link } from 'react-router-dom';
import McmMcdForm from '../components/McmMcdForm';
import McmMcdWorksheet from '../components/McmMcdWorksheet';
import { generateMcmMcd } from '../utils/mcmMcdGenerator';

function McmMcdGenerator() {
    const [problems, setProblems] = useState([]);
    const [view, setView] = useState('config'); // 'config' | 'worksheet'
    const [isInteractive, setIsInteractive] = useState(false);

    const handleGenerate = (config) => {
        const generated = generateMcmMcd(config);
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
                <span className="gradient-text">M.C.M. y M.C.D.</span>
                <Link to="/learn/mcmMcd" target="_blank" style={{ fontSize: '1.2rem', marginLeft: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} title="¿Cómo calcular el m.c.m. y el m.c.d.?">
                    🎓 Ayuda
                </Link>
            </h1>
            <p className="no-print" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem' }}>
                Genera ejercicios para calcular el mínimo común múltiplo (m.c.m.) y el máximo común divisor (m.c.d.).
                Configura el nivel de dificultad, cantidad de números y resuelve en pantalla o imprime para practicar con lápiz y papel.
            </p>

            {view === 'config' ? (
                <McmMcdForm onGenerate={handleGenerate} />
            ) : (
                <McmMcdWorksheet problems={problems} onBack={handleBack} isInteractive={isInteractive} />
            )}
        </div>
    );
}

export default McmMcdGenerator;
