import { useState, useEffect } from 'react';

function MultiplicationTableWorksheet({ problems, onBack, isInteractive, order, selectedTables }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);

    useEffect(() => {
        setUserAnswers({});
        setResults(null);
    }, [problems]);

    const handlePrint = () => {
        window.print();
    };

    const handleAnswerChange = (problemId, value) => {
        // Only allow non-negative integers or empty
        if (value !== '' && !/^\d+$/.test(value)) return;
        setUserAnswers(prev => ({
            ...prev,
            [problemId]: value
        }));
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedback = {};

        problems.forEach(p => {
            const userVal = parseInt(userAnswers[p.id], 10);
            const isCorrect = userVal === p.answer;
            if (isCorrect) correctCount++;
            feedback[p.id] = isCorrect;
        });

        setResults({
            correct: correctCount,
            total: problems.length,
            percentage: Math.round((correctCount / problems.length) * 100),
            feedback
        });
    };

    const handleRetry = () => {
        setResults(null);
        setUserAnswers({});
    };

    // Determine worksheet title
    let title = 'Tablas de Multiplicar';
    if (selectedTables && selectedTables.length === 1) {
        title = `Tabla de Multiplicar del ${selectedTables[0]}`;
    } else if (selectedTables && selectedTables.length > 1) {
        if (selectedTables.length === 9) {
            title = 'Tablas de Multiplicar del 1 al 9';
        } else {
            title = `Tablas de Multiplicar: ${selectedTables.join(', ')}`;
        }
    }

    const subtitle = order === 'ORDERED' ? 'Preguntas en orden correlativo' : 'Preguntas desordenadas / aleatorias';

    // Group by table if ORDERED and more than 1 table
    const isGroupedByTable = order === 'ORDERED' && selectedTables && selectedTables.length > 1;

    const renderProblemItem = (p) => {
        const hasResult = results !== null;
        const isCorrect = results?.feedback?.[p.id];

        return (
            <div
                key={p.id}
                className="problem-item"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    border: hasResult
                        ? (isCorrect ? '2px solid #10b981' : '2px solid #ef4444')
                        : '1px solid #e2e8f0',
                    background: hasResult
                        ? (isCorrect ? '#f0fdf4' : '#fef2f2')
                        : '#ffffff',
                    fontFamily: 'monospace',
                    fontSize: '1.25rem',
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', width: '2rem', textAlign: 'right', fontFamily: 'sans-serif' }}>
                        {p.id}.
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>
                        {p.table} × {p.multiplier} =
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isInteractive ? (
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="?"
                            value={userAnswers[p.id] || ''}
                            onChange={(e) => handleAnswerChange(p.id, e.target.value)}
                            disabled={hasResult}
                            style={{
                                width: '4rem',
                                height: '2.4rem',
                                textAlign: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                border: hasResult
                                    ? (isCorrect ? '2px solid #10b981' : '2px solid #ef4444')
                                    : '2px solid #94a3b8',
                                borderRadius: '6px',
                                background: hasResult
                                    ? (isCorrect ? '#d1fae5' : '#fee2e2')
                                    : '#f8fafc',
                                color: '#0f172a'
                            }}
                        />
                    ) : (
                        <span style={{
                            borderBottom: '2px solid #0f172a',
                            minWidth: '4.5rem',
                            display: 'inline-block',
                            height: '1.5rem'
                        }}></span>
                    )}

                    {hasResult && !isCorrect && isInteractive && (
                        <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1rem', marginLeft: '0.25rem' }}>
                            ({p.answer})
                        </span>
                    )}
                </div>
            </div>
        );
    };

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
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{title}</h2>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                            {subtitle}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem' }}>
                        <p style={{ margin: 0 }}><strong>Nombre:</strong> _________________________________</p>
                        <p style={{ margin: 0 }}><strong>Fecha:</strong> _________________</p>
                    </div>
                </div>

                {/* Content: Grouped by table or standard grid */}
                {isGroupedByTable ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                        {selectedTables.map(tNum => {
                            const tableProblems = problems.filter(p => p.table === tNum);
                            return (
                                <div key={tNum} style={{
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    background: '#fafafa',
                                    breakInside: 'avoid',
                                    pageBreakInside: 'avoid'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.15rem',
                                        fontWeight: 700,
                                        color: '#334155',
                                        borderBottom: '2px solid #e2e8f0',
                                        paddingBottom: '0.5rem',
                                        marginBottom: '0.75rem',
                                        textAlign: 'center'
                                    }}>
                                        Tabla del {tNum}
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {tableProblems.map(p => renderProblemItem(p))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="worksheet-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1rem',
                        marginTop: '1.5rem'
                    }}>
                        {problems.map(p => renderProblemItem(p))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MultiplicationTableWorksheet;
