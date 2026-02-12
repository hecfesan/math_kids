import { useState } from 'react'
import { Link } from 'react-router-dom'
import FractionOpsForm from '../components/FractionOpsForm'
import FractionOpsWorksheet from '../components/FractionOpsWorksheet'
import { generateFractionOps } from '../utils/fractionOpsGenerator'

function FractionOpsGenerator() {
    const [problems, setProblems] = useState([]);
    const [view, setView] = useState('config'); // 'config' | 'worksheet'
    const [isInteractive, setIsInteractive] = useState(false);

    const handleGenerate = (config) => {
        const generated = generateFractionOps(config);
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
                <span className="gradient-text">Suma y Resta de Fracciones</span>
                <Link to="/learn/fractionOps" target="_blank" style={{ fontSize: '1.2rem', marginLeft: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} title="¿Cómo sumar y restar fracciones?">
                    🎓 Ayuda
                </Link>
            </h1>
            <p className="no-print" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Practica la suma y resta de fracciones con el mismo o diferente denominador.
                Configura el tipo de operación, los denominadores y la cantidad de ejercicios.
                Puedes imprimir las fichas o resolverlas directamente en pantalla.
            </p>

            {view === 'config' ? (
                <FractionOpsForm onGenerate={handleGenerate} />
            ) : (
                <FractionOpsWorksheet problems={problems} onBack={handleBack} isInteractive={isInteractive} />
            )}
        </div>
    )
}

export default FractionOpsGenerator
