import { useState, useEffect } from 'react';

function McmMcdWorksheet({ problems, onBack, isInteractive }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [expandedExplanations, setExpandedExplanations] = useState({});

    useEffect(() => {
        setUserAnswers({});
        setResults(null);
        setExpandedExplanations({});
    }, [problems]);

    const handlePrint = () => {
        window.print();
    };

    const handleAnswerChange = (problemId, field, value) => {
        // Only allow non-negative integers or empty
        if (value !== '' && (!/^\d+$/.test(value))) return;
        setUserAnswers(prev => ({
            ...prev,
            [problemId]: {
                ...prev[problemId],
                [field]: value
            }
        }));
    };

    const toggleExplanation = (problemId) => {
        setExpandedExplanations(prev => ({
            ...prev,
            [problemId]: !prev[problemId]
        }));
    };

    const checkAnswers = () => {
        let correctCount = 0;
        let totalItems = 0;
        const feedback = {};

        problems.forEach(p => {
            const currentAns = userAnswers[p.id] || {};

            if (p.type === 'BOTH') {
                totalItems += 2;
                const mcdAns = parseInt(currentAns.mcd, 10);
                const mcmAns = parseInt(currentAns.mcm, 10);
                const mcdOk = mcdAns === p.mcd;
                const mcmOk = mcmAns === p.mcm;

                if (mcdOk) correctCount++;
                if (mcmOk) correctCount++;

                feedback[p.id] = {
                    mcdCorrect: mcdOk,
                    mcmCorrect: mcmOk,
                    allCorrect: mcdOk && mcmOk
                };
            } else if (p.type === 'MCM') {
                totalItems += 1;
                const mcmAns = parseInt(currentAns.mcm, 10);
                const mcmOk = mcmAns === p.mcm;
                if (mcmOk) correctCount++;

                feedback[p.id] = {
                    mcmCorrect: mcmOk,
                    allCorrect: mcmOk
                };
            } else {
                // MCD
                totalItems += 1;
                const mcdAns = parseInt(currentAns.mcd, 10);
                const mcdOk = mcdAns === p.mcd;
                if (mcdOk) correctCount++;

                feedback[p.id] = {
                    mcdCorrect: mcdOk,
                    allCorrect: mcdOk
                };
            }
        });

        setResults({
            correct: correctCount,
            total: totalItems,
            percentage: Math.round((correctCount / totalItems) * 100),
            feedback
        });
    };

    const handleRetry = () => {
        setResults(null);
        setUserAnswers({});
        setExpandedExplanations({});
    };

    // Determine general sheet title
    const hasMcm = problems.some(p => p.type === 'MCM' || p.type === 'BOTH');
    const hasMcd = problems.some(p => p.type === 'MCD' || p.type === 'BOTH');
    let worksheetTitle = 'Ejercicios de m.c.m. y m.c.d.';
    if (hasMcm && !hasMcd) {
        worksheetTitle = 'Ejercicios de Mínimo Común Múltiplo (m.c.m.)';
    } else if (hasMcd && !hasMcm) {
        worksheetTitle = 'Ejercicios de Máximo Común Divisor (m.c.d.)';
    }

    return (
        <div className="worksheet-container">
            {/* Top Toolbar */}
            <div className="no-print" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                    className="btn"
                    onClick={onBack}
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                    ← Volver a Configuración
                </button>

                {!isInteractive && (
                    <button className="btn btn-primary" onClick={handlePrint}>
                        🖨️ IMPRIMIR FICHA
                    </button>
                )}

                {isInteractive && !results && (
                    <button className="btn btn-primary" onClick={checkAnswers}>
                        ✓ Corregir Ejercicios
                    </button>
                )}

                {isInteractive && results && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{
                            background: results.percentage >= 70 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            border: `1px solid ${results.percentage >= 70 ? '#10b981' : '#ef4444'}`,
                            padding: '0.6rem 1.2rem',
                            borderRadius: 'var(--radius)',
                            color: results.percentage >= 70 ? '#34d399' : '#f87171',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                        }}>
                            Puntuación: {results.correct} / {results.total} ({results.percentage}%)
                        </div>
                        <button
                            className="btn"
                            onClick={handleRetry}
                            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        >
                            🔄 Reintentar
                        </button>
                    </div>
                )}
            </div>

            {/* Printable & Interactive Paper */}
            <div className="worksheet-paper" style={{
                background: 'white',
                color: '#0f172a',
                padding: '2.5rem',
                borderRadius: '8px',
                minHeight: '80vh',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}>
                {/* Header for print / identification */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{worksheetTitle}</h2>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                            Calcula el resultado mediante descomposición en factores primos
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem' }}>
                        <p style={{ margin: 0 }}><strong>Nombre:</strong> _________________________________</p>
                        <p style={{ margin: 0 }}><strong>Fecha:</strong> _________________</p>
                    </div>
                </div>

                {/* Problems Grid */}
                <div className="worksheet-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem 1.5rem',
                    marginTop: '1.5rem'
                }}>
                    {problems.map((p) => {
                        const feedback = results?.feedback?.[p.id];
                        const hasResult = results !== null;
                        const isExpanded = expandedExplanations[p.id];
                        const numsStr = p.numbers.join(', ');

                        return (
                            <div
                                key={p.id}
                                className="problem-item"
                                style={{
                                    border: hasResult
                                        ? (feedback?.allCorrect ? '2px solid #10b981' : '2px solid #ef4444')
                                        : '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    padding: '1.25rem',
                                    background: hasResult
                                        ? (feedback?.allCorrect ? '#f0fdf4' : '#fef2f2')
                                        : '#ffffff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    pageBreakInside: 'avoid',
                                    breakInside: 'avoid'
                                }}
                            >
                                <div>
                                    {/* Exercise Number and Title */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1e293b' }}>
                                            {p.id}.
                                        </span>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            background: '#f1f5f9',
                                            color: '#475569',
                                            fontWeight: 600
                                        }}>
                                            {p.type === 'BOTH' ? 'm.c.d. y m.c.m.' : (p.type === 'MCM' ? 'm.c.m.' : 'm.c.d.')}
                                        </span>
                                    </div>

                                    {/* Exercise Body */}
                                    <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', margin: '0.5rem 0 1rem' }}>
                                        {/* MCD Row if needed */}
                                        {(p.type === 'MCD' || p.type === 'BOTH') && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: 600 }}>m.c.d.({numsStr}) =</span>
                                                {isInteractive ? (
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        placeholder="?"
                                                        value={userAnswers[p.id]?.mcd || ''}
                                                        onChange={(e) => handleAnswerChange(p.id, 'mcd', e.target.value)}
                                                        disabled={hasResult}
                                                        style={{
                                                            width: '4.5rem',
                                                            height: '2.4rem',
                                                            textAlign: 'center',
                                                            fontSize: '1.2rem',
                                                            fontWeight: 'bold',
                                                            border: hasResult
                                                                ? (feedback?.mcdCorrect ? '2px solid #10b981' : '2px solid #ef4444')
                                                                : '2px solid #94a3b8',
                                                            borderRadius: '6px',
                                                            background: hasResult
                                                                ? (feedback?.mcdCorrect ? '#d1fae5' : '#fee2e2')
                                                                : '#f8fafc',
                                                            color: '#0f172a'
                                                        }}
                                                    />
                                                ) : (
                                                    <span style={{ borderBottom: '2px solid #0f172a', minWidth: '4rem', display: 'inline-block', height: '1.5rem' }}></span>
                                                )}
                                                {hasResult && !feedback?.mcdCorrect && (
                                                    <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1rem' }}>
                                                        (Resp: {p.mcd})
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* MCM Row if needed */}
                                        {(p.type === 'MCM' || p.type === 'BOTH') && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: 600 }}>m.c.m.({numsStr}) =</span>
                                                {isInteractive ? (
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        placeholder="?"
                                                        value={userAnswers[p.id]?.mcm || ''}
                                                        onChange={(e) => handleAnswerChange(p.id, 'mcm', e.target.value)}
                                                        disabled={hasResult}
                                                        style={{
                                                            width: '4.5rem',
                                                            height: '2.4rem',
                                                            textAlign: 'center',
                                                            fontSize: '1.2rem',
                                                            fontWeight: 'bold',
                                                            border: hasResult
                                                                ? (feedback?.mcmCorrect ? '2px solid #10b981' : '2px solid #ef4444')
                                                                : '2px solid #94a3b8',
                                                            borderRadius: '6px',
                                                            background: hasResult
                                                                ? (feedback?.mcmCorrect ? '#d1fae5' : '#fee2e2')
                                                                : '#f8fafc',
                                                            color: '#0f172a'
                                                        }}
                                                    />
                                                ) : (
                                                    <span style={{ borderBottom: '2px solid #0f172a', minWidth: '4rem', display: 'inline-block', height: '1.5rem' }}></span>
                                                )}
                                                {hasResult && !feedback?.mcmCorrect && (
                                                    <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1rem' }}>
                                                        (Resp: {p.mcm})
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Printable workspace area for prime factorization */}
                                    {!isInteractive && p.includeWorkspace && (
                                        <div style={{
                                            marginTop: '1rem',
                                            height: '110px',
                                            border: '1px dashed #94a3b8',
                                            borderRadius: '6px',
                                            background: '#f8fafc',
                                            padding: '0.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                                                Espacio para descomposición factorial y operaciones:
                                            </span>
                                            <div style={{ display: 'flex', justifyContent: 'space-around', color: '#94a3b8', fontSize: '0.85rem' }}>
                                                {p.numbers.map((num, idx) => (
                                                    <span key={idx} style={{ borderBottom: '1px solid #cbd5e1', padding: '0 1rem' }}>
                                                        {num} |
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Interactive Explanation & Factorization Accordion */}
                                {isInteractive && hasResult && (
                                    <div style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => toggleExplanation(p.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#4f46e5',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                padding: '0.25rem 0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.3rem'
                                            }}
                                        >
                                            {isExpanded ? '▲ Ocultar explicación' : '▼ Ver descomposición paso a paso'}
                                        </button>

                                        {isExpanded && (
                                            <div style={{
                                                marginTop: '0.5rem',
                                                padding: '0.75rem',
                                                background: '#f1f5f9',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                color: '#1e293b'
                                            }}>
                                                <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>Descomposición factorial:</div>
                                                <ul style={{ margin: '0 0 0.5rem 1.2rem', padding: 0 }}>
                                                    {p.explanation.factorizations.map((fStr, idx) => (
                                                        <li key={idx} style={{ fontFamily: 'monospace' }}>{fStr}</li>
                                                    ))}
                                                </ul>

                                                {(p.type === 'MCD' || p.type === 'BOTH') && (
                                                    <div style={{ marginTop: '0.4rem' }}>
                                                        <strong>m.c.d.</strong> (comunes al menor exponente):
                                                        <div style={{ fontFamily: 'monospace', color: '#0f172a' }}>
                                                            {p.explanation.gcdFormula} = <strong>{p.mcd}</strong>
                                                        </div>
                                                    </div>
                                                )}

                                                {(p.type === 'MCM' || p.type === 'BOTH') && (
                                                    <div style={{ marginTop: '0.4rem' }}>
                                                        <strong>m.c.m.</strong> (comunes y no comunes al mayor exponente):
                                                        <div style={{ fontFamily: 'monospace', color: '#0f172a' }}>
                                                            {p.explanation.lcmFormula} = <strong>{p.mcm}</strong>
                                                        </div>
                                                    </div>
                                                )}
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

export default McmMcdWorksheet;
