import { useState } from 'react';
import { Link } from 'react-router-dom';
import MultiplicationTableForm from '../components/MultiplicationTableForm';
import MultiplicationTableWorksheet from '../components/MultiplicationTableWorksheet';
import { generateMultiplicationTables } from '../utils/multiplicationGenerator';

function MultiplicationTablesGenerator() {
    const [problems, setProblems] = useState([]);
    const [view, setView] = useState('config'); // 'config' | 'worksheet'
    const [isInteractive, setIsInteractive] = useState(false);
    const [currentOrder, setCurrentOrder] = useState('ORDERED');
    const [currentTables, setCurrentTables] = useState([8]);

    const handleGenerate = (config) => {
        const generated = generateMultiplicationTables(config);
        setProblems(generated);
        setIsInteractive(config.isInteractive);
        setCurrentOrder(config.order);
        setCurrentTables(config.selectedTables);
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
                <span className="gradient-text">Tablas de Multiplicar</span>
                <Link to="/learn/multiplicationTables" target="_blank" style={{ fontSize: '1.2rem', marginLeft: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} title="Trucos y aprendizaje de las tablas">
                    🎓 Ayuda
                </Link>
            </h1>
            <p className="no-print" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem' }}>
                Aprende y practica las tablas de multiplicar del 1 al 9.
                Elige qué tabla o tablas quieres practicar, selecciona si quieres las operaciones ordenadas o desordenadas, y resuelve en pantalla o imprime la ficha.
            </p>

            {view === 'config' ? (
                <MultiplicationTableForm onGenerate={handleGenerate} />
            ) : (
                <MultiplicationTableWorksheet
                    problems={problems}
                    onBack={handleBack}
                    isInteractive={isInteractive}
                    order={currentOrder}
                    selectedTables={currentTables}
                />
            )}
        </div>
    );
}

export default MultiplicationTablesGenerator;
