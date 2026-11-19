import { useState } from 'react';

const OPERATION_TYPES = [
    { id: 'MCM', label: 'm.c.m.', subtitle: 'Mínimo Común Múltiplo', icon: '📈' },
    { id: 'MCD', label: 'm.c.d.', subtitle: 'Máximo Común Divisor', icon: '📉' },
    { id: 'MIXED', label: 'Mixto', subtitle: 'm.c.m. o m.c.d.', icon: '🔀' },
    { id: 'BOTH', label: 'Ambos', subtitle: 'm.c.m. y m.c.d. a la vez', icon: '🎯' }
];

function McmMcdForm({ onGenerate }) {
    const [config, setConfig] = useState({
        operationType: 'MIXED',
        numberCount: '2',
        difficulty: 'EASY',
        count: 12,
        isInteractive: false,
        includeWorkspace: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(config);
    };

    return (
        <div className="card config-card no-print" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
                {/* Operation Type */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
                        Tipo de Ejercicio
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                        {OPERATION_TYPES.map(op => {
                            const isSelected = config.operationType === op.id;
                            return (
                                <button
                                    key={op.id}
                                    type="button"
                                    onClick={() => setConfig({ ...config, operationType: op.id })}
                                    style={{
                                        padding: '0.9rem 0.5rem',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid var(--border)',
                                        background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                                        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                                        color: isSelected ? 'white' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.3rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    <span style={{ fontSize: '1.4rem' }}>{op.icon}</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{op.label}</span>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{op.subtitle}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Number of elements */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Cantidad de Números por Ejercicio
                    </label>
                    <div className="radio-group" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {[
                            { value: '2', label: '2 números (ej. 12 y 18)' },
                            { value: '3', label: '3 números (ej. 12, 18 y 24)' },
                            { value: 'RANDOM', label: 'Mezclado (2 o 3)' }
                        ].map(item => (
                            <label
                                key={item.value}
                                className={`radio-label ${config.numberCount === item.value ? 'active' : ''}`}
                                style={{
                                    flex: '1 1 auto',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid',
                                    borderColor: config.numberCount === item.value ? 'var(--primary)' : 'var(--border)',
                                    background: config.numberCount === item.value ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <input
                                    type="radio"
                                    name="numberCount"
                                    value={item.value}
                                    checked={config.numberCount === item.value}
                                    onChange={(e) => setConfig({ ...config, numberCount: e.target.value })}
                                />
                                <span>{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Difficulty level */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Nivel de Dificultad
                    </label>
                    <div className="radio-group" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {[
                            { value: 'EASY', label: 'Básico', desc: 'Números hasta 30 (Primaria)' },
                            { value: 'MEDIUM', label: 'Intermedio', desc: 'Números hasta 80 (6º Primaria / 1º ESO)' },
                            { value: 'HARD', label: 'Avanzado', desc: 'Números hasta 150 (ESO)' }
                        ].map(item => (
                            <label
                                key={item.value}
                                className={`radio-label ${config.difficulty === item.value ? 'active' : ''}`}
                                style={{
                                    flex: '1 1 200px',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid',
                                    borderColor: config.difficulty === item.value ? 'var(--primary)' : 'var(--border)',
                                    background: config.difficulty === item.value ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.2rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={item.value}
                                        checked={config.difficulty === item.value}
                                        onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                                    />
                                    <strong>{item.label}</strong>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '1.6rem' }}>
                                    {item.desc}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Exercises Count */}
                <div className="form-grid" style={{ marginBottom: '1.5rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Cantidad de Ejercicios
                        </label>
                        <input
                            type="number"
                            min="4"
                            max="30"
                            value={config.count}
                            onChange={(e) => setConfig({ ...config, count: Math.max(1, parseInt(e.target.value) || 12) })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(15, 23, 42, 0.5)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                color: 'var(--text)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>

                {/* Options: Interactive & Workspace */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={config.isInteractive}
                            onChange={(e) => setConfig({ ...config, isInteractive: e.target.checked })}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                        <span style={{ fontSize: '1rem' }}>Resolver directamente en pantalla (Interactivo)</span>
                    </label>

                    {!config.isInteractive && (
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={config.includeWorkspace}
                                onChange={(e) => setConfig({ ...config, includeWorkspace: e.target.checked })}
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <span style={{ fontSize: '1rem' }}>Incluir recuadro para descomposición factorial y cálculos (impresión)</span>
                        </label>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.15rem' }}>
                    Generar Ejercicios de m.c.m. y m.c.d.
                </button>
            </form>
        </div>
    );
}

export default McmMcdForm;
