import { useState } from 'react';

const AVAILABLE_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function MultiplicationTableForm({ onGenerate }) {
    const [config, setConfig] = useState({
        selectedTables: [8],
        order: 'ORDERED', // 'ORDERED' | 'RANDOM'
        count: 10,
        isInteractive: false
    });

    const toggleTable = (num) => {
        setConfig(prev => {
            const exists = prev.selectedTables.includes(num);
            let next;
            if (exists) {
                next = prev.selectedTables.filter(t => t !== num);
            } else {
                next = [...prev.selectedTables, num].sort((a, b) => a - b);
            }
            if (next.length === 0) return prev; // Keep at least one selected
            return { ...prev, selectedTables: next };
        });
    };

    const selectAll = () => {
        setConfig(prev => ({ ...prev, selectedTables: [...AVAILABLE_TABLES] }));
    };

    const selectRange = (start, end) => {
        const range = AVAILABLE_TABLES.filter(t => t >= start && t <= end);
        setConfig(prev => ({ ...prev, selectedTables: range }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (config.selectedTables.length === 0) return;
        onGenerate(config);
    };

    return (
        <div className="card config-card no-print" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
                {/* Tables Selector */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, fontSize: '1.05rem' }}>
                            Selecciona las Tablas a Practicar:
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                onClick={selectAll}
                                style={{
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--primary)',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Todas (1 al 9)
                            </button>
                            <button
                                type="button"
                                onClick={() => selectRange(1, 5)}
                                style={{
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--primary)',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                1 al 5
                            </button>
                            <button
                                type="button"
                                onClick={() => selectRange(6, 9)}
                                style={{
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--primary)',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                6 al 9
                            </button>
                        </div>
                    </div>

                    {/* Number buttons grid 1 to 9 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(9, 1fr)',
                        gap: '0.5rem',
                        marginBottom: '0.75rem'
                    }}>
                        {AVAILABLE_TABLES.map(num => {
                            const isSelected = config.selectedTables.includes(num);
                            return (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => toggleTable(num)}
                                    title={`Tabla del ${num}`}
                                    style={{
                                        aspectRatio: '1',
                                        borderRadius: 'var(--radius)',
                                        border: '2px solid',
                                        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                                        background: isSelected ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.3))' : 'rgba(15, 23, 42, 0.6)',
                                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                                        fontWeight: 'bold',
                                        fontSize: '1.25rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: isSelected ? '0 0 10px rgba(99, 102, 241, 0.3)' : 'none'
                                    }}
                                >
                                    <span>{num}</span>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 500, opacity: 0.8 }}>×</span>
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            Tablas seleccionadas: <strong>{config.selectedTables.length > 0 ? config.selectedTables.map(t => `Tabla del ${t}`).join(', ') : 'Ninguna'}</strong>
                        </span>
                        {config.selectedTables.length > 1 && (
                            <span style={{ color: 'var(--primary)' }}>Mezcla de {config.selectedTables.length} tablas</span>
                        )}
                    </div>
                </div>

                {/* Order Selector (Ordenadas vs Desordenadas) */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
                        Orden de las Preguntas
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => setConfig({ ...config, order: 'ORDERED' })}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                border: '2px solid',
                                borderColor: config.order === 'ORDERED' ? 'var(--primary)' : 'var(--border)',
                                background: config.order === 'ORDERED' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                                color: config.order === 'ORDERED' ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.4rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                <span>📋</span>
                                <span>Ordenadas</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', opacity: 0.85, fontFamily: 'monospace' }}>
                                Ej: 8×1, 8×2, 8×3...
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Sigue el orden correlativo tradicional del 1 al 10.
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setConfig({ ...config, order: 'RANDOM' })}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                border: '2px solid',
                                borderColor: config.order === 'RANDOM' ? 'var(--primary)' : 'var(--border)',
                                background: config.order === 'RANDOM' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                                color: config.order === 'RANDOM' ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.4rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                <span>🔀</span>
                                <span>Aleatorias / Desordenadas</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', opacity: 0.85, fontFamily: 'monospace' }}>
                                Ej: 8×7, 8×4, 8×9...
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Preguntas salteadas para memorizar y razonar.
                            </span>
                        </button>
                    </div>
                </div>

                {/* Question count if RANDOM, or info if ORDERED */}
                {config.order === 'RANDOM' ? (
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Cantidad de Preguntas
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                            {[10, 15, 20, 25, 30].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setConfig({ ...config, count: val })}
                                    style={{
                                        flex: '1 1 50px',
                                        padding: '0.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: config.count === val ? 'var(--primary)' : 'var(--border)',
                                        background: config.count === val ? 'var(--primary)' : 'rgba(15, 23, 42, 0.5)',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            min="5"
                            max="50"
                            value={config.count}
                            onChange={(e) => setConfig({ ...config, count: Math.max(1, parseInt(e.target.value) || 10) })}
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
                ) : (
                    <div style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)'
                    }}>
                        ℹ️ Modo ordenado: Se generarán <strong>{config.selectedTables.length * 10} operaciones</strong> (las 10 multiplicaciones del 1 al 10 para cada tabla elegida).
                    </div>
                )}

                {/* Interactive Checkbox */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={config.isInteractive}
                            onChange={(e) => setConfig({ ...config, isInteractive: e.target.checked })}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                        <span style={{ fontSize: '1rem' }}>Resolver directamente en pantalla (Interactivo)</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={config.selectedTables.length === 0}
                    style={{ width: '100%', padding: '1rem', fontSize: '1.15rem' }}
                >
                    Generar Ejercicios de Tablas
                </button>
            </form>
        </div>
    );
}

export default MultiplicationTableForm;
