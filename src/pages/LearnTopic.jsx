import { useParams } from 'react-router-dom';
import { learningContent } from '../data/learningContent';

function LearnTopic() {
    const { topicId } = useParams();
    const content = learningContent[topicId];

    if (!content) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>Tema no encontrado</h2>
                <p>Lo sentimos, no pudimos encontrar el artículo que buscas.</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
            <h1 className="gradient-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>
                {content.title}
            </h1>

            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '3rem', textAlign: 'center' }}>
                {content.intro}
            </p>

            <div className="learning-sections">
                {content.sections.map((section, index) => (
                    <div key={index} className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                            {section.title}
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: section.examples.length ? '1.5rem' : '0' }}>
                            {section.content}
                        </p>

                        {section.examples && section.examples.length > 0 && (
                            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--primary)' }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Ejemplos:</strong>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.examples.map((example, exIndex) => (
                                        <li key={exIndex} style={{ marginBottom: '0.25rem', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearnTopic;
