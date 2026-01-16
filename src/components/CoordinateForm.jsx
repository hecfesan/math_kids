import { useState } from 'react';

function CoordinateForm({ onSubmit }) {
    const [numFigures, setNumFigures] = useState(5);
    const [isInteractive, setIsInteractive] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            numFigures: parseInt(numFigures),
            isInteractive
        });
    };

    return (
        <form onSubmit={handleSubmit} className="math-form">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text)' }}>
                Configuración de Coordenadas
            </h2>

            <div className="form-group">
                <label>Cantidad de Figuras:</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                        type="range"
                        min="3"
                        max="10"
                        value={numFigures}
                        onChange={(e) => setNumFigures(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <span style={{ fontWeight: 'bold', minWidth: '2rem' }}>{numFigures}</span>
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
                Generar Cuadrícula
            </button>
        </form>
    );
}

export default CoordinateForm;
