import { useState, useEffect } from 'react';

function FractionWorksheet({ problems, onBack, isInteractive }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);

    useEffect(() => {
        setUserAnswers({});
        setResults(null);
    }, [problems]);

    const handlePrint = () => window.print();

    const handleInputChange = (id, field, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedback = {};

        problems.forEach(p => {
            const u = userAnswers[p.id] || {};
            const userType = u.type;

            const numGrids = Math.ceil(p.numerator / p.denominator) || 1;
            const totalSquares = p.denominator * numGrids;

            const valCorrect = parseInt(u.numerator) === p.numerator && parseInt(u.denominator) === p.denominator;
            const expectedType = p.numerator >= p.denominator ? 'IMPROPER' : 'PROPER';
            const typeCorrect = userType === expectedType;

            const isCorrect = valCorrect && typeCorrect;

            if (isCorrect) correctCount++;
            feedback[p.id] = {
                isCorrect,
                valCorrect,
                typeCorrect,
                expectedNum: p.numerator,
                expectedDen: p.denominator,
                expectedTypeEnum: expectedType
            };
        });

        setResults({
            correct: correctCount,
            total: problems.length,
            feedback
        });
    };

    const handleRetry = () => {
        setResults(null);
        setUserAnswers({});
    };

    return (
        <div className="worksheet-container">
            <div className="no-print" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn" onClick={onBack} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    ← Volver
                </button>

                {!isInteractive && <button className="btn btn-primary" onClick={handlePrint}>IMPRIMIR</button>}

                {isInteractive && !results && <button className="btn btn-primary" onClick={checkAnswers}>Corregir</button>}

                {isInteractive && results && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', color: '#34d399', fontWeight: 'bold' }}>
                            Puntuación: {results.correct} / {results.total}
                        </div>
                        <button className="btn" onClick={handleRetry} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                            Reintentar
                        </button>
                    </div>
                )}
            </div>

            <div className="worksheet-paper" style={{ background: 'white', color: 'black', padding: '2rem', borderRadius: '4px', minHeight: '80vh' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid black', paddingBottom: '1rem' }}>
                    <div><p><strong>Nombre:</strong> _________________________________</p></div>
                    <div><p><strong>Fecha:</strong> _________________</p></div>
                </div>

                <div className="worksheet-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem 2rem'
                }}>
                    {problems.map((p) => {
                        const hasResult = results !== null;
                        const feedback = results?.feedback[p.id];
                        const isCorrect = feedback?.isCorrect;

                        // Calculate how many grids we need
                        const numGrids = Math.ceil(p.numerator / p.denominator) || 1;

                        return (
                            <div key={p.id} className="problem-item" style={{
                                padding: '1.5rem',
                                border: hasResult ? (isCorrect ? '2px solid #10b981' : '2px solid #ef4444') : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                background: hasResult ? (isCorrect ? '#f0fdf4' : '#fef2f2') : 'white'
                            }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                    {Array.from({ length: numGrids }).map((_, gIndex) => (
                                        <div key={gIndex} className="fraction-grid" style={{
                                            display: 'grid',
                                            gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(p.denominator))}, 1fr)`,
                                            gap: '4px',
                                            border: '3px solid #1e293b',
                                            padding: '4px',
                                            background: '#1e293b',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            {Array.from({ length: p.denominator }).map((_, sIndex) => {
                                                const overallIndex = gIndex * p.denominator + sIndex;
                                                const isFilled = overallIndex < p.numerator;
                                                return (
                                                    <div key={sIndex} className={`fraction-square ${isFilled ? 'filled' : ''}`} style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        background: isFilled ? '#6366f1' : 'white',
                                                        border: '1px solid rgba(255,255,255,0.1)'
                                                    }}></div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                        <input
                                            type="number"
                                            value={userAnswers[p.id]?.numerator || ''}
                                            onChange={(e) => handleInputChange(p.id, 'numerator', e.target.value)}
                                            disabled={hasResult}
                                            style={{
                                                width: '3rem',
                                                textAlign: 'center',
                                                fontSize: '1.25rem',
                                                border: '1px solid #cbd5e1',
                                                borderRadius: '4px'
                                            }}
                                        />
                                        <div style={{ width: '100%', height: '2px', background: 'black' }}></div>
                                        <input
                                            type="number"
                                            value={userAnswers[p.id]?.denominator || ''}
                                            onChange={(e) => handleInputChange(p.id, 'denominator', e.target.value)}
                                            disabled={hasResult}
                                            style={{
                                                width: '3rem',
                                                textAlign: 'center',
                                                fontSize: '1.25rem',
                                                border: '1px solid #cbd5e1',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    {isInteractive ? (
                                        <select
                                            value={userAnswers[p.id]?.type || ''}
                                            onChange={(e) => handleInputChange(p.id, 'type', e.target.value)}
                                            disabled={hasResult}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid #cbd5e1',
                                                width: '100%',
                                                background: '#f8fafc',
                                                color: '#0f172a',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            <option value="">Seleccionar tipo...</option>
                                            <option value="PROPER">Propia</option>
                                            <option value="IMPROPER">Impropia</option>
                                        </select>
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '2.5rem',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '4px',
                                            background: 'white'
                                        }}></div>
                                    )}
                                </div>

                                {hasResult && (
                                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.5rem' }}>
                                        {isCorrect ? (
                                            <span style={{ color: '#10b981' }}>Correcto</span>
                                        ) : (
                                            <div style={{ color: '#ef4444', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <span>Error</span>
                                                <span style={{ fontSize: '0.9rem' }}>
                                                    Solución: {feedback.expectedNum}/{feedback.expectedDen}
                                                    ({feedback.expectedTypeEnum === 'PROPER' ? 'Propia' : 'Impropia'})
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FractionWorksheet;
