import { useState, useEffect } from 'react';
import { getRandomSentences } from '../data/ArticleData';

function ArticleWorksheet({ config, onBack }) {
    const [sentences, setSentences] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);

    useEffect(() => {
        const generated = getRandomSentences(config.count, config.type);
        setSentences(generated);
        setUserAnswers({});
        setResults(null);
    }, [config]);

    const handlePrint = () => window.print();

    const handleInputChange = (id, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedback = {};

        sentences.forEach(s => {
            const val = (userAnswers[s.id] || '').trim().toLowerCase();
            const correct = s.article.toLowerCase();

            const isCorrect = val === correct;
            if (isCorrect) correctCount++;

            feedback[s.id] = {
                isCorrect,
                expected: s.article
            };
        });

        setResults({
            correct: correctCount,
            total: sentences.length,
            feedback
        });
    };

    const handleRetry = () => {
        setResults(null);
        setUserAnswers({});
    };

    return (
        <div className="worksheet-container">
            {/* Controls */}
            <div className="no-print" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn" onClick={onBack} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    ← Volver
                </button>

                {!config.isInteractive && <button className="btn btn-primary" onClick={handlePrint}>IMPRIMIR</button>}

                {config.isInteractive && !results && <button className="btn btn-primary" onClick={checkAnswers}>Corregir</button>}

                {config.isInteractive && results && (
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

            {/* Paper */}
            <div className="worksheet-paper" style={{ background: 'white', color: 'black', padding: '3rem', borderRadius: '4px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', borderBottom: '2px solid black', paddingBottom: '1rem' }}>
                    <div><p><strong>Nombre:</strong> _________________________________</p></div>
                    <div><p><strong>Fecha:</strong> _________________</p></div>
                </div>

                <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '3rem', fontWeight: 'bold' }}>
                    Completa con el artículo correcto
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {sentences.map((s, index) => {
                        const hasResult = results !== null;
                        const feedback = results?.feedback[s.id];
                        const isCorrect = feedback?.isCorrect;

                        return (
                            <div key={s.id} style={{
                                fontSize: '1.5rem',
                                lineHeight: '2.5rem',
                                display: 'flex',
                                alignItems: 'baseline',
                                flexWrap: 'wrap'
                            }}>
                                <span style={{ marginRight: '0.5rem', fontWeight: 'bold', color: '#64748b' }}>{index + 1}.</span>

                                {s.before && <span style={{ marginRight: '0.5rem' }}>{s.before}</span>}

                                {/* Input Area */}
                                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.5rem' }}>
                                    {config.isInteractive ? (
                                        <input
                                            type="text"
                                            value={userAnswers[s.id] || ''}
                                            onChange={(e) => handleInputChange(s.id, e.target.value)}
                                            disabled={hasResult}
                                            style={{
                                                fontSize: '1.5rem',
                                                border: 'none',
                                                borderBottom: '2px solid black',
                                                width: '100px',
                                                textAlign: 'center',
                                                background: hasResult ? (isCorrect ? '#f0fdf4' : '#fef2f2') : 'transparent',
                                                padding: '0 0.5rem',
                                                color: hasResult ? (isCorrect ? '#166534' : '#b91c1c') : 'black',
                                                outline: 'none'
                                            }}
                                            autoComplete="off"
                                        />
                                    ) : (
                                        <span style={{
                                            display: 'inline-block',
                                            width: '120px',
                                            borderBottom: '2px solid black',
                                            height: '1px',
                                            margin: '0 5px'
                                        }}></span>
                                    )}

                                    {hasResult && !isCorrect && (
                                        <div style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                            {feedback.expected}
                                        </div>
                                    )}
                                </div>

                                <span>{s.after}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ArticleWorksheet;
