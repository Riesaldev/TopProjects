import PageLayout from '../components/PageLayout';

const About = () => {
  return (
    <PageLayout
      label="estudio"
      title="MiniX es un pequeño equipo obsesionado con micro-interacciones."
      description="Construimos herramientas sociales que se sienten de estudio creativo: tipografías bien curadas, gradientes suaves y flows que hacen que compartir mensajes sea una experiencia memorable."
      actions={[
        { label: 'Explora funcionalidades', to: '/features' },
        { label: 'Únete al equipo', to: '/career', variant: 'secondary' },
      ]}
      sections={[
        {
          title: 'Lo que movemos',
          description: 'Diseño, tecnología y comunidad encuentran un punto medio en MiniX. Nos encanta prototipar, testear y lanzar mejoras cada semana.',
          items: [
            { title: 'Diseño emocional', description: 'Usamos motion, contraste y copy claro para que cada pantalla transmita intención.' },
            { title: 'Tecnología ágil', description: 'Stack ligero con React + Node listo para iterar rápido y aprender de cada release.' },
          ],
        },
        {
          title: 'Hoja de ruta 2025',
          description: 'Tres líneas simples guían nuestra primera versión pública.',
          items: [
            { title: 'Mensajería viva', description: 'Feeds modulares con métricas ligeras y reacciones expresivas.' },
            { title: 'Comunidades híbridas', description: 'Grupos con escenas y layouts personalizables.' },
            { title: 'Insights instantáneos', description: 'Panel con el pulso de tu equipo para tomar decisiones al vuelo.' },
          ],
        },
      ]}
    />
  );
};

export default About;