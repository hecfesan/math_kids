import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinateForm from '../components/CoordinateForm';
import CoordinateWorksheet from '../components/CoordinateWorksheet';

function CoordinateGenerator() {
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
                            background: 'rgba(236, 72, 153, 0.1)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            📍
                        </div>
                        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Coordenadas</h1>
                    </div>

                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Aprende a localizar puntos en el plano cartesiano.
                        Elige la cantidad de figuras que quieres buscar y escribe sus coordenadas (X, Y).
                    </p>

                    <CoordinateForm onSubmit={setConfig} />
                </div>
            ) : (
                <CoordinateWorksheet
                    config={config}
                    onBack={() => setConfig(null)}
                />
            )}
        </div>
    );
}

export default CoordinateGenerator;
