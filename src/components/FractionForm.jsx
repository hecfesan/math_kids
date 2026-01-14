import { useState } from 'react';

function FractionForm({ onGenerate }) {
    const [config, setConfig] = useState({
        type: 'BOTH',
        count: 12,
        maxDenominator: 10,
        isInteractive: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(config);
    };

    return (
        <div className="card config-card no-print">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tipo de Fracciones</label>
                    <div className="radio-group" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <label className={`radio-label ${config.type === 'PROPER' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="type"
                                value="PROPER"
                                checked={config.type === 'PROPER'}
                                onChange={(e) => setConfig({ ...config, type: e.target.value })}
                            /> Propias
                        </label>
                        <label className={`radio-label ${config.type === 'IMPROPER' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="type"
                                value="IMPROPER"
                                checked={config.type === 'IMPROPER'}
                                onChange={(e) => setConfig({ ...config, type: e.target.value })}
                            /> Impropias
                        </label>
                        <label className={`radio-label ${config.type === 'BOTH' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="type"
                                value="BOTH"
                                checked={config.type === 'BOTH'}
                                onChange={(e) => setConfig({ ...config, type: e.target.value })}
                            /> Ambas
                        </label>
                    </div>
                </div>

                <div className="form-grid">
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
                    Generar Hoja de Fracciones
                </button>
            </form>
        </div>
    );
}

export default FractionForm;
