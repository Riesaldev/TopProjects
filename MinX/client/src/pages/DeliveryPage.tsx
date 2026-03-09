import PageLayout from '../components/PageLayout';

const Delivery = () => {
  return (
    <PageLayout
      label="lanzamiento"
      title="Así planificamos el despliegue de MiniX."
      description="Aunque el roadmap puede cambiar, esta es la guía base para entregar la primera versión del producto."
      sections={[
        {
          title: 'Fases',
          description: 'Tres etapas sencillas para activar MiniX en cualquier organización.',
          items: [
            { title: 'Kickoff', description: 'Configuramos branding, dominios y usuarios iniciales.' },
            { title: 'Personalización', description: 'Ajustamos paleta, componentes y contenidos clave.' },
            { title: 'Entrenamiento', description: 'Sesión breve para explicar flujos e indicadores.' },
          ],
        },
        {
          title: 'Entregables',
          description: 'Elementos que recibirás durante este proceso inicial.',
          items: [
            { title: 'Guía visual', description: 'PDF con tokens, tipografías y usos de color.' },
            { title: 'Tablero de estado', description: 'Notion con pendientes, feedback y fechas.' },
            { title: 'Checklist de QA', description: 'Pasos para validar que todo funcione antes de abrirlo al equipo.' },
          ],
        },
      ]}
    />
  );
};

export default Delivery;