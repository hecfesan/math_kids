import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container home-container">
            <section className="hero">
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    <span className="gradient-text">Recursos Educativos</span>
                </h1>
                <p style={{ textAlign: 'center', fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    Esta página está dedicada a crear recursos para facilitar el trabajo de padres y profesores.
                    Aquí encontrarás herramientas sencillas y potentes para generar material didáctico.
                </p>
            </section>

            <section className="tools-grid">
                <div className="card tool-card">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '3rem' }}>🧮</span>
                    </div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Generador de Operaciones</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Herramienta para crear operaciones como sumas, restas, multiplicaciones y divisiones.
                        Permite configurar llevadas, decimales y cantidad. Las plantillas son imprimibles o para realizarlas online.
                    </p>
                    <Link to="/math-generator" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
                        Entrar
                    </Link>
                </div>

                <div className="card tool-card">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '3rem' }}>🥧</span>
                    </div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Generador de Fracciones</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Generador de fracciones propias e impropias con representación visual.
                        Incluye opciones para imprimir o resolver en pantalla.
                    </p>
                    <Link to="/fraction-generator" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
                        Entrar
                    </Link>
                </div>

                <div className="card tool-card">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '3rem' }}>📍</span>
                    </div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Aprendizaje de Coordenadas</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Aprende a localizar figuras en un plano cartesiano (ejes X e Y).
                        Configura la cantidad de figuras y resuelve en pantalla o imprime.
                    </p>
                    <Link to="/coordinate-generator" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
                        Entrar
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
