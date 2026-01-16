import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import ArticleWorksheet from '../components/ArticleWorksheet';

function ArticleGenerator() {
    const navigate = useNavigate();
    const [config, setConfig] = useState(null);

    return (
        <div className="page-container">
            {!config && (
                <button
                    onClick={() => navigate('/')}
                    className="no-print btn"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: 0
                    }}
                >
                    ← Volver al Inicio
                </button>
            )}

            {!config ? (
                <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(239, 68, 68, 0.1)', // Red tint for Language tool
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            📝
                        </div>
                        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Artículos</h1>
                    </div>

                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Practica el uso de artículos determinados (el, la...) e indeterminados (un, una...).
                        Genera frases para completar e imprime la ficha para clase.
                    </p>

                    <ArticleForm onSubmit={setConfig} />
                </div>
            ) : (
                <ArticleWorksheet
                    config={config}
                    onBack={() => setConfig(null)}
                />
            )}
        </div>
    );
}

export default ArticleGenerator;
