import PageLayout from '../components/PageLayout';

const Support = () => {
  return (
    <PageLayout
      label="ayuda"
      title="Responder rápido es parte del diseño."
      description="Mientras seguimos construyendo, este espacio describe los canales que habilitaremos para beta testers y equipos."
      sections={[
        {
          title: 'Canales previstos',
          description: 'El contenido final llegará cuando abramos la beta; por ahora mostramos una primer estructura.',
          items: [
            { title: 'Inbox prioritario', description: 'Correo dedicado para incidencias críticas y dudas técnicas.' },
            { title: 'Canal de comunidad', description: 'Espacio en Discord/Slack para compartir demos y recibir feedback.' },
            { title: 'Sesiones 1:1', description: 'Slots semanales para revisar integraciones o ajustes de diseño.' },
          ],
        },
        {
          title: 'Tiempos estimados',
          description: 'Valores de referencia para esta primera versión.',
          items: [
            { title: 'Primer contacto', description: '< 24 horas en días laborales.' },
            { title: 'Resolución', description: 'Entre 2 y 4 días una vez diagnosticado el problema.' },
            { title: 'Actualizaciones', description: 'Notificamos cambios relevantes vía correo y la página de estado.' },
          ],
        },
      ]}
    />
  );
};

export default Support;