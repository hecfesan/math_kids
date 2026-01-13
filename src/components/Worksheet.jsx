import { useState, useEffect, useRef } from 'react';

function Worksheet({ problems, onBack, isInteractive }) {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null); // null | { correct: number, total: number, feedback: {} }

    // Reset state when problems change
    useEffect(() => {
        setUserAnswers({});
        setResults(null);
    }, [problems]);

    const handlePrint = () => {
        window.print();
    };

    const handleDigitChange = (id, index, value) => {
        // Only allow single char input
        if (value.length > 1) value = value.slice(-1);

        setUserAnswers(prev => {
            const currentAnswer = prev[id] ? [...prev[id]] : [];
            currentAnswer[index] = value;
            return { ...prev, [id]: currentAnswer };
        });

        // Auto-focus next input if available and value is entered
        if (value && document.getElementById(`input-${id}-${index + 1}`)) {
            document.getElementById(`input-${id}-${index + 1}`).focus();
        }
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedback = {};

        problems.forEach(p => {
            const answerStr = p.answer.toString();
            const userDigits = userAnswers[p.id] || []; // Array of chars

            // Reconstruct user string
            let userValStr = "";
            for (let i = 0; i < answerStr.length; i++) {
                userValStr += userDigits[i] || "";
            }

            const userVal = parseFloat(userValStr);

            // Floating point comparison with tolerance
            const isCorrect = !isNaN(userVal) && Math.abs(userVal - p.answer) < 0.001 && userValStr.length === answerStr.length;

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
                    <button
                        className="btn btn-primary"
                        onClick={handlePrint}
                    >
                        IMPRIMIR
                    </button>
                )}

                {isInteractive && !results && (
                    <button
                        className="btn btn-primary"
                        onClick={checkAnswers}
                    >
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem 2rem',
                    marginTop: '2rem'
                }}>
                    {problems.map((p) => {
                        const isCorrect = results?.feedback[p.id];
                        const hasResult = results !== null;
                        const answerStr = p.answer.toString();

                        return (
                            <div key={p.id} className="problem-item" style={{
                                fontSize: '1.5rem',
                                fontFamily: 'monospace',
                                breakInside: 'avoid',
                                position: 'relative',
                                padding: '1rem',
                                border: hasResult ? (isCorrect ? '2px solid #10b981' : '2px solid #ef4444') : '1px solid transparent',
                                borderRadius: '8px',
                                transition: 'all 0.3s'
                            }}>
                                <div style={{ textAlign: 'right' }}>{p.operandA}</div>
                                <div style={{ textAlign: 'right', borderBottom: '2px solid black', position: 'relative', marginBottom: '1rem' }}>
                                    <span style={{ position: 'absolute', left: '-1rem' }}>{p.operator}</span>
                                    {p.operandB}
                                </div>

                                {isInteractive ? (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                                        {answerStr.split('').map((char, index) => {
                                            const digitVal = userAnswers[p.id]?.[index] || '';

                                            return (
                                                <input
                                                    key={index}
                                                    id={`input-${p.id}-${index}`}
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={digitVal}
                                                    onChange={(e) => handleDigitChange(p.id, index, e.target.value)}
                                                    disabled={hasResult}
                                                    style={{
                                                        width: '2rem',
                                                        height: '2.5rem',
                                                        textAlign: 'center',
                                                        fontSize: '1.25rem',
                                                        padding: '0',
                                                        background: hasResult ? (isCorrect ? '#d1fae5' : '#fee2e2') : '#f8fafc',
                                                        border: '1px solid #cbd5e1',
                                                        color: '#0f172a',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div style={{ height: '3rem' }}></div>
                                )}
                                {hasResult && !isCorrect && isInteractive && (
                                    <div style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem', fontWeight: 'bold', textAlign: 'right' }}>
                                        {p.answer}
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

export default Worksheet;
