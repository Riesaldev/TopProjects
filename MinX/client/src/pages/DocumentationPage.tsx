import PageLayout from '../components/PageLayout';

const Documentation = () => {
  return (
    <PageLayout
      label="docs"
      title="Documentación en construcción."
      description="Esta sección mostrará la guía de uso para desarrolladores y diseñadores. Por ahora dejamos un esqueleto básico."
      sections={[
        {
          title: 'Primeros pasos',
          description: 'Todo lo necesario para instalar y personalizar MiniX.',
          items: [
            { title: 'Instalación local', description: 'Clona el repo, instala dependencias y ejecuta `npm run dev`.' },
            { title: 'Variables de entorno', description: 'Configura VITE_API_URL y la URL de uploads del servidor.' },
          ],
        },
        {
          title: 'Guías rápidas',
          description: 'A medida que avancemos, cada guía se expandirá con ejemplos reales.',
          items: [
            { title: 'Tokens de diseño', description: 'Cómo extender la paleta y mantener consistencia.' },
            { title: 'Componentes clave', description: 'Header, botones, cards y layouts reutilizables.' },
            { title: 'Buenas prácticas', description: 'Accesibilidad, rendimiento y patrones de UX.' },
          ],
        },
      ]}
    />
  );
};

export default Documentation;