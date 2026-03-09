import PageLayout from '../components/PageLayout';

const Career = () => {
  return (
    <PageLayout
      label="team"
      title="Buscamos personas que amen pulir detalles."
      description="MiniX es remoto, pequeño y en beta constante. Preferimos iterar rápido, documentar en simple y compartir el resultado."
      actions={[{ label: 'Escríbenos', to: '/support', variant: 'secondary' }]}
      sections={[
        {
          title: 'Roles abiertos',
          description: 'Contenido provisional para ilustrar la estructura de esta sección.',
          items: [
            { title: 'Product Designer', description: 'Define motion, prototipa y mantiene el design system vivo.' },
            { title: 'Frontend Engineer', description: 'Construye componentes accesibles con React y anima micro-interacciones.' },
            { title: 'Content Strategist', description: 'Diseña la voz de MiniX en docs, toasts y páginas públicas.' },
          ],
        },
        {
          title: 'Cómo trabajamos',
          description: 'Una primera versión simple de nuestro proceso.',
          items: [
            { title: 'Sprints cortos', description: 'Bloques semanales para shipping continuo.' },
            { title: 'Feedback abierto', description: 'Compartimos avances en canales dedicados al diseño y código.' },
            { title: 'Documentación ligera', description: 'Notas en Notion + grabaciones breves para explicar decisiones.' },
          ],
        },
      ]}
    />
  );
};

export default Career;