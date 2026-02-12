import { useState } from 'react';

function FractionOpsForm({ onGenerate }) {
    const [config, setConfig] = useState({
        operations: ['+'],
        denominatorMode: 'SAME',
        count: 12,
        maxDenominator: 10,
        isInteractive: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(config);
    };

    const toggleOperation = (op) => {
        setConfig(prev => {
            const newOps = prev.operations.includes(op)
                ? prev.operations.filter(o => o !== op)
                : [...prev.operations, op];
            if (newOps.length === 0) return prev;
            return { ...prev, operations: newOps };
        });
    };

    return (
        <div className="card config-card no-print">
            <form onSubmit={handleSubmit}>
                {/* Operations */}
                <div className="form-group">
                    <label>Tipo de Operación</label>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button
                            type="button"
                            onClick={() => toggleOperation('+')}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                background: config.operations.includes('+') ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                                borderColor: config.operations.includes('+') ? 'var(--primary)' : 'var(--border)',
                                color: config.operations.includes('+') ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>+</span>
                            Sumas
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleOperation('-')}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                background: config.operations.includes('-') ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                                borderColor: config.operations.includes('-') ? 'var(--primary)' : 'var(--border)',
                                color: config.operations.includes('-') ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>−</span>
                            Restas
                        </button>
                    </div>
                </div>

                {/* Denominator mode */}
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                    <label>Tipo de Denominador</label>
                    <div className="radio-group" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <label className={`radio-label ${config.denominatorMode === 'SAME' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="denominatorMode"
                                value="SAME"
                                checked={config.denominatorMode === 'SAME'}
                                onChange={(e) => setConfig({ ...config, denominatorMode: e.target.value })}
                            /> Mismo
                        </label>
                        <label className={`radio-label ${config.denominatorMode === 'DIFFERENT' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="denominatorMode"
                                value="DIFFERENT"
                                checked={config.denominatorMode === 'DIFFERENT'}
                                onChange={(e) => setConfig({ ...config, denominatorMode: e.target.value })}
                            /> Diferente
                        </label>
                        <label className={`radio-label ${config.denominatorMode === 'BOTH' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="denominatorMode"
                                value="BOTH"
                                checked={config.denominatorMode === 'BOTH'}
                                onChange={(e) => setConfig({ ...config, denominatorMode: e.target.value })}
                            /> Ambos
                        </label>
                    </div>
                </div>

                <div className="form-grid" style={{ marginTop: '1.5rem' }}>
                    <div className="form-group">
                        <label>Máximo Denominador</label>
                        <input
                            type="number"
                            min="2"
                            max="20"
                            value={config.maxDenominator}
                            onChange={(e) => setConfig({ ...config, maxDenominator: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cantidad (Ejercicios)</label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={config.count}
                            onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="form-group checkbox-group" style={{ margin: '1.5rem 0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={config.isInteractive}
                            onChange={(e) => setConfig({ ...config, isInteractive: e.target.checked })}
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                        <span>Resolver en pantalla</span>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Generar Ejercicios de Fracciones
                </button>
            </form>
        </div>
    );
}

export default FractionOpsForm;
