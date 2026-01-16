import { useState, useEffect } from 'react';

// Common friendly emojis for figures
const FIGURES = ['⭐️', '🍎', '🚀', '🐱', '🐶', '⚽️', '🚗', '🎈', '🍕', '🦋', '🌵', '🍦'];

function CoordinateWorksheet({ config, onBack }) {
    const [figures, setFigures] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState(null);

    // Generate random figures on mount
    useEffect(() => {
        const newFigures = [];
        const usedCoords = new Set();

        // Using a 10x10 grid (0-10)
        let count = 0;
        const targetCount = config.numFigures;

        while (count < targetCount) {
            // Coordinate 0-10
            const x = Math.floor(Math.random() * 11);
            const y = Math.floor(Math.random() * 11);
            const key = `${x},${y}`;

            // Avoid collisions and avoid origin (0,0) if desired, though valid in coordinates.
            // Let's avoid overlapping exact points.
            if (!usedCoords.has(key)) {
                usedCoords.add(key);
                newFigures.push({
                    id: count,
                    icon: FIGURES[count % FIGURES.length],
                    x,
                    y
                });
                count++;
            }
        }
        setFigures(newFigures);
        setUserAnswers({});
        setResults(null);
    }, [config]);

    const handlePrint = () => window.print();

    const handleInputChange = (id, axis, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [id]: { ...prev[id], [axis]: value }
        }));
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedback = {};

        figures.forEach(fig => {
            const u = userAnswers[fig.id] || {};
            // Parse inputs (default to empty string if undefined)
            const uX = parseInt(u.x);
            const uY = parseInt(u.y);

            const isCorrect = uX === fig.x && uY === fig.y;
            if (isCorrect) correctCount++;

            feedback[fig.id] = {
                isCorrect,
                expectedX: fig.x,
                expectedY: fig.y
            };
        });

        setResults({
            correct: correctCount,
            total: figures.length,
            feedback
        });
    };

    const handleRetry = () => {
        setResults(null);
        setUserAnswers({});
    };

    // Grid System: 11 lines X (0-10) and 11 lines Y (0-10)
    // We want the lines to be the grid tracks. 
    // If we define a grid of 11 columns, the lines are the gaps or tracks?
    // A standard "grid line" approach: 
    // We can render a container with background grid, or cells.
    // Let's use absolute positioning relative to a fixed aspect ratio container for simplicity usually, 
    // BUT precise CSS grid is better for "worksheet" look.

    // Easier approach: 11x11 cells.
    // X axis at bottom, Y axis at left.
    // Actually, in standard math grid, (0,0) is bottom-left.
    // CSS Grid (0,0) is usually top-left visually. We need to invert Y.

    const gridSize = 11; // 0 to 10 inclusive

    return (
        <div className="worksheet-container">
            {/* Header / Controls */}
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

            <div className="worksheet-paper" style={{ background: 'white', color: 'black', padding: '2rem', borderRadius: '4px', minHeight: '80vh' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid black', paddingBottom: '1rem' }}>
                    <div><p><strong>Nombre:</strong> _________________________________</p></div>
                    <div><p><strong>Fecha:</strong> _________________</p></div>
                </div>

                {/* Coordinate Grid Container */}
                <div className="coordinate-grid-container" style={{
                    position: 'relative',
                    width: '600px',
                    height: '600px',
                    margin: '0 auto 3rem auto',
                    borderLeft: '4px solid black', // Y Axis
                    borderBottom: '4px solid black' // X Axis
                }}>
                    {/* Grid Lines */}
                    {/* Vertical Lines (X axis ticks) */}
                    {Array.from({ length: 11 }).map((_, i) => (
                        <div key={`v-${i}`} style={{
                            position: 'absolute',
                            left: `${(i / 10) * 100}%`,
                            top: 0,
                            bottom: 0,
                            borderLeft: '1px solid #e2e8f0',
                            zIndex: 0
                        }}>
                            {/* Label */}
                            <div style={{ position: 'absolute', bottom: '-25px', left: '-50%', transform: 'translateX(-50%)', fontWeight: 'bold' }}>
                                {i}
                            </div>
                        </div>
                    ))}

                    {/* Horizontal Lines (Y axis ticks) */}
                    {Array.from({ length: 11 }).map((_, i) => (
                        <div key={`h-${i}`} style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: `${(i / 10) * 100}%`,
                            borderBottom: '1px solid #e2e8f0',
                            zIndex: 0
                        }}>
                            {/* Label */}
                            <div style={{ position: 'absolute', left: '-30px', bottom: '-50%', transform: 'translateY(50%)', fontWeight: 'bold' }}>
                                {i}
                            </div>
                        </div>
                    ))}

                    {/* Figures */}
                    {figures.map(fig => (
                        <div key={fig.id} style={{
                            position: 'absolute',
                            left: `${(fig.x / 10) * 100}%`,
                            bottom: `${(fig.y / 10) * 100}%`,
                            transform: 'translate(-50%, 50%)', // Center on intersection
                            fontSize: '2rem',
                            lineHeight: 1,
                            zIndex: 10,
                            pointerEvents: 'none' // Click through mainly
                        }}>
                            {fig.icon}
                        </div>
                    ))}

                    {/* Axis Labels */}
                    <div style={{ position: 'absolute', right: '-20px', bottom: '-10px', fontWeight: 'bold', fontSize: '1.2rem' }}>X</div>
                    <div style={{ position: 'absolute', left: '-20px', top: '-20px', fontWeight: 'bold', fontSize: '1.2rem' }}>Y</div>
                </div>

                {/* Answer Table */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>Escribe las coordenadas: ( X , Y )</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        {figures.map(fig => {
                            const hasResult = results !== null;
                            const feedback = results?.feedback[fig.id];
                            const isCorrect = feedback?.isCorrect;

                            return (
                                <div key={fig.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    border: hasResult ? (isCorrect ? '2px solid #10b981' : '2px solid #ef4444') : '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    background: hasResult ? (isCorrect ? '#f0fdf4' : '#fef2f2') : 'white'
                                }}>
                                    <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{fig.icon}</span>



                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>(</span>

                                    {config.isInteractive ? (
                                        <input
                                            type="number"
                                            value={userAnswers[fig.id]?.x || ''}
                                            onChange={(e) => handleInputChange(fig.id, 'x', e.target.value)}
                                            disabled={hasResult}
                                            placeholder="X"
                                            style={{
                                                width: '3rem',
                                                textAlign: 'center',
                                                fontSize: '1.2rem',
                                                padding: '0.25rem',
                                                border: '1px solid #94a3b8',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '3rem',
                                            height: '2.5rem',
                                            border: '1px solid black',
                                            borderRadius: '4px',
                                            background: 'white'
                                        }}></div>
                                    )}

                                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>,</span>

                                    {config.isInteractive ? (
                                        <input
                                            type="number"
                                            value={userAnswers[fig.id]?.y || ''}
                                            onChange={(e) => handleInputChange(fig.id, 'y', e.target.value)}
                                            disabled={hasResult}
                                            placeholder="Y"
                                            style={{
                                                width: '3rem',
                                                textAlign: 'center',
                                                fontSize: '1.2rem',
                                                padding: '0.25rem',
                                                border: '1px solid #94a3b8',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '3rem',
                                            height: '2.5rem',
                                            border: '1px solid black',
                                            borderRadius: '4px',
                                            background: 'white'
                                        }}></div>
                                    )}

                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>)</span>

                                    {hasResult && !isCorrect && (
                                        <div style={{ marginLeft: '1rem', color: '#ef4444', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            ({feedback.expectedX}, {feedback.expectedY})
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoordinateWorksheet;
