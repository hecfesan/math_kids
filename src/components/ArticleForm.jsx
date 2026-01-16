import { useState } from 'react';

function ArticleForm({ onSubmit }) {
    const [count, setCount] = useState(5);
    const [type, setType] = useState('BOTH'); // BOTH, DEFINITE, INDEFINITE
    const [isInteractive, setIsInteractive] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parseInt(count) > 10) {
            return; // Prevent submission
        }

        onSubmit({
            count: parseInt(count),
            type,
            isInteractive
        });
    };

    return (
        <form onSubmit={handleSubmit} className="math-form">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text)' }}>
                Configuración de Artículos
            </h2>

            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cantidad de Frases (Máx. 10):</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        width: '100%',
                        fontSize: '1rem'
                    }}
                />
                {parseInt(count) > 10 && (
                    <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        El número máximo de frases es 10
                    </p>
                )}
            </div>

            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Tipo de Artículos:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                    {[
                        { id: 'DEFINITE', label: 'Determinados' },
                        { id: 'INDEFINITE', label: 'Indeterminados' },
                        { id: 'BOTH', label: 'Todos' }
                    ].map(option => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setType(option.id)}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                background: type === option.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                                borderColor: type === option.id ? 'var(--primary)' : 'var(--border)',
                                color: type === option.id ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group checkbox-group">
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                    <input
                        type="checkbox"
                        checked={isInteractive}
                        onChange={(e) => setIsInteractive(e.target.checked)}
                        style={{ width: '1.25rem', height: '1.25rem' }}
                    />
                    <span>Resolver en pantalla</span>
                </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Generar Ficha
            </button>
        </form>
    );
}

export default ArticleForm;
