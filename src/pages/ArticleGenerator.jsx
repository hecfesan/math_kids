import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

            <div className="card" style={{ maxWidth: !config ? '600px' : '100%', margin: '0 auto', background: !config ? 'var(--bg-card)' : 'transparent', boxShadow: !config ? 'var(--shadow-lg)' : 'none', padding: !config ? '2rem' : 0 }}>
                <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', justifyContent: !config ? 'flex-start' : 'center' }}>
                    {!config && (
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
                    )}
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>
                        Artículos
                        <Link to="/learn/grammar" target="_blank" style={{ fontSize: '1.2rem', marginLeft: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }} title="¿Qué son los artículos?">
                            🎓 Ayuda
                        </Link>
                    </h1>
                </div>

                {!config ? (
                    <>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            Practica el uso de artículos determinados (el, la...) e indeterminados (un, una...).
                            Genera frases para completar e imprime la ficha para clase.
                        </p>
                        <ArticleForm onSubmit={setConfig} />
                    </>
                ) : (
                    <ArticleWorksheet
                        config={config}
                        onBack={() => setConfig(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default ArticleGenerator;
