import { useState, useEffect } from 'react';

function FractionDisplay({ num, den, style }) {
    return (
        <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 0.25rem',
            ...style
        }}>
            <span style={{ borderBottom: '2px solid black', padding: '0 0.4rem', minWidth: '1.5rem', textAlign: 'center' }}>{num}</span>
            <span style={{ padding: '0 0.4rem', minWidth: '1.5rem', textAlign: 'center' }}>{den}</span>
        </div>
    );
}

function FractionOpsWorksheet({ problems, onBack, isInteractive }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);

    useEffect(() => {
        setUserAnswers({});
        setResults(null);
    }, [problems]);

    const handlePrint = () => {
        window.print();
    };

    const handleAnswerChange = (id, field, value) => {
        // Allow minus sign, empty, or digits
        if (value !== '' && value !== '-' && isNaN(parseInt(value))) return;
        setUserAnswers(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedback = {};

        problems.forEach(p => {
            const userNum = parseInt(userAnswers[p.id]?.num);
            const userDen = parseInt(userAnswers[p.id]?.den);

            // Check if the fraction is equivalent (cross-multiply)
            const isCorrect = !isNaN(userNum) && !isNaN(userDen) && userDen !== 0 &&
                userNum * p.answer.den === p.answer.num * userDen &&
                // Also check the fraction is in positive-denominator form
                userDen > 0;

            if (isCorrect) correctCount++;
            feedback[p.id] = isCorrect;
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
                <button
                    className="btn"
                    onClick={onBack}
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                    ← Volver
                </button>

                {!isInteractive && (
                    <button className="btn btn-primary" onClick={handlePrint}>
                        IMPRIMIR
                    </button>
                )}

                {isInteractive && !results && (
                    <button className="btn btn-primary" onClick={checkAnswers}>
                        Corregir
                    </button>
                )}

                {isInteractive && results && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', color: '#34d399', fontWeight: 'bold' }}>
                            Puntuación: {results.correct} / {results.total}
                        </div>
                        <button
                            className="btn"
                            onClick={handleRetry}
                            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        >
                            Reintentar
                        </button>
                    </div>
                )}
            </div>

            <div className="worksheet-paper" style={{ background: 'white', color: 'black', padding: '2rem', borderRadius: '4px', minHeight: '80vh' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid black', paddingBottom: '1rem' }}>
                    <div>
                        <p><strong>Nombre:</strong> _________________________________</p>
                    </div>
                    <div>
                        <p><strong>Fecha:</strong> _________________</p>
                    </div>
                </div>

                <div className="worksheet-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem 2rem',
                    marginTop: '2rem'
                }}>
                    {problems.map((p) => {
                        const isCorrect = results?.feedback[p.id];
                        const hasResult = results !== null;
                        const operatorSymbol = p.operation === '+' ? '+' : '−';

                        return (
                            <div key={p.id} className="problem-item" style={{
                                fontSize: '1.4rem',
                                fontFamily: 'monospace',
                                breakInside: 'avoid',
                                position: 'relative',
                                padding: '1rem',
                                border: hasResult ? (isCorrect ? '2px solid #10b981' : '2px solid #ef4444') : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.4rem',
                                flexWrap: 'wrap',
                                minHeight: '5rem'
                            }}>
                                <FractionDisplay num={p.fractionA.num} den={p.fractionA.den} />

                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0.3rem' }}>{operatorSymbol}</span>

                                <FractionDisplay num={p.fractionB.num} den={p.fractionB.den} />

                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0.3rem' }}>=</span>

                                {isInteractive ? (
                                    <div style={{
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        margin: '0 0.25rem'
                                    }}>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={userAnswers[p.id]?.num || ''}
                                            onChange={(e) => handleAnswerChange(p.id, 'num', e.target.value)}
                                            disabled={hasResult}
                                            style={{
                                                width: '2.5rem',
                                                height: '2rem',
                                                textAlign: 'center',
                                                fontSize: '1.2rem',
                                                padding: '0',
                                                background: hasResult ? (isCorrect ? '#d1fae5' : '#fee2e2') : '#f8fafc',
                                                border: '1px solid #cbd5e1',
                                                color: '#0f172a',
                                                borderRadius: '4px'
                                            }}
                                        />
                                        <div style={{ width: '2.5rem', height: '2px', background: 'black', margin: '2px 0' }}></div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={userAnswers[p.id]?.den || ''}
                                            onChange={(e) => handleAnswerChange(p.id, 'den', e.target.value)}
                                            disabled={hasResult}
                                            style={{
                                                width: '2.5rem',
                                                height: '2rem',
                                                textAlign: 'center',
                                                fontSize: '1.2rem',
                                                padding: '0',
                                                background: hasResult ? (isCorrect ? '#d1fae5' : '#fee2e2') : '#f8fafc',
                                                border: '1px solid #cbd5e1',
                                                color: '#0f172a',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        margin: '0 0.25rem'
                                    }}>
                                        <span style={{ borderBottom: '2px solid black', padding: '0 0.4rem', minWidth: '2rem', textAlign: 'center', height: '1.5rem' }}>&nbsp;</span>
                                        <span style={{ padding: '0 0.4rem', minWidth: '2rem', textAlign: 'center', height: '1.5rem' }}>&nbsp;</span>
                                    </div>
                                )}

                                {hasResult && !isCorrect && isInteractive && (
                                    <div style={{ position: 'absolute', bottom: '0.25rem', right: '0.5rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                        {p.answer.num}/{p.answer.den}
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

export default FractionOpsWorksheet;
