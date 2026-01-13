import { useState } from 'react';

const OPERATIONS = [
    { id: '+', label: 'Sumas', symbol: '+' },
    { id: '-', label: 'Restas', symbol: '-' },
    { id: '*', label: 'Multiplicaciones', symbol: '×' },
    { id: '/', label: 'Divisiones', symbol: '÷' },
];

function ConfigurationForm({ onGenerate }) {
    const [config, setConfig] = useState({
        operations: ['+'],
        digits: 2,
        allowCarry: true,
        allowDecimals: false,
        isInteractive: false,
        count: 20
    });

    const toggleOperation = (opId) => {
        setConfig(prev => {
            const newOps = prev.operations.includes(opId)
                ? prev.operations.filter(id => id !== opId)
                : [...prev.operations, opId];

            // Prevent empty selection
            if (newOps.length === 0) return prev;
            return { ...prev, operations: newOps };
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : parseInt(value) || 0
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(config);
    };

    return (
        <form onSubmit={handleSubmit} className="config-form">
            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    Configuración
                </h2>

                {/* Operations */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Tipo de Operaciones</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                        {OPERATIONS.map(op => (
                            <button
                                key={op.id}
                                type="button"
                                onClick={() => toggleOperation(op.id)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    background: config.operations.includes(op.id) ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                                    borderColor: config.operations.includes(op.id) ? 'var(--primary)' : 'var(--border)',
                                    color: config.operations.includes(op.id) ? 'white' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    justifyContent: 'center'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{op.symbol}</span>
                                {op.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>

                    {/* Digits */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cifras / Dígitos</label>
                        <input
                            type="number"
                            name="digits"
                            min="1"
                            max="6"
                            value={config.digits}
                            onChange={handleChange}
                        />
                        <small style={{ color: 'var(--text-muted)' }}>Número de dígitos de los operandos</small>
                    </div>

                    {/* Count */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cantidad de Operaciones</label>
                        <input
                            type="number"
                            name="count"
                            min="1"
                            max="100"
                            value={config.count}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Toggles */}
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="allowCarry"
                            checked={config.allowCarry}
                            onChange={handleChange}
                            style={{ width: 'auto', marginTop: 0 }}
                        />
                        <span>Permitir llevadas (Sum/Rest)</span>
                    </label>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="allowDecimals"
                            checked={config.allowDecimals}
                            onChange={handleChange}
                            style={{ width: 'auto', marginTop: 0 }}
                        />
                        <span>Permitir decimales</span>
                    </label>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="isInteractive"
                            checked={config.isInteractive}
                            onChange={handleChange}
                            style={{ width: 'auto', marginTop: 0 }}
                        />
                        <span>Resolver en pantalla</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.2rem' }}
                >
                    Generar Hoja
                </button>
            </div>
        </form>
    );
}

export default ConfigurationForm;
