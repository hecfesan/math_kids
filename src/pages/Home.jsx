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

                <div className="card tool-card">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '3rem' }}>📝</span>
                    </div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Generador de Artículos</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Practica los artículos determinados e indeterminados en frases sencillas.
                        Ideal para refuerzo de lengua y lectoescritura.
                    </p>
                    <Link to="/article-generator" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
                        Entrar
                    </Link>
                </div>

                <div className="card tool-card">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '3rem' }}>➕</span>
                    </div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Suma y Resta de Fracciones</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Practica la suma y resta de fracciones con el mismo o diferente denominador.
                        Configura las operaciones, tipo de denominador y resuelve en pantalla o imprime.
                    </p>
                    <Link to="/fraction-ops-generator" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>
                        Entrar
                    </Link>
                </div>
            </section>

            <section className="learning-section" style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-card)', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }} className="gradient-text">
                    Guías de Aprendizaje 🎓
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <Link to="/learn/math" target="_blank" className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{ fontSize: '2rem' }}>🧮</span>
                        <span>Operaciones</span>
                    </Link>
                    <Link to="/learn/fractions" target="_blank" className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{ fontSize: '2rem' }}>🥧</span>
                        <span>Fracciones</span>
                    </Link>
                    <Link to="/learn/coordinates" target="_blank" className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{ fontSize: '2rem' }}>📍</span>
                        <span>Coordenadas</span>
                    </Link>
                    <Link to="/learn/grammar" target="_blank" className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{ fontSize: '2rem' }}>📝</span>
                        <span>Artículos</span>
                    </Link>
                    <Link to="/learn/fractionOps" target="_blank" className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{ fontSize: '2rem' }}>➕</span>
                        <span>Suma/Resta Fracciones</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
