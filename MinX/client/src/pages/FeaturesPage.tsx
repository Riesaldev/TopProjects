import PageLayout from '../components/PageLayout';

const Features = () => {
  return (
    <PageLayout
      label="release 01"
      title="Lo esencial para lanzar tu red social interna."
      description="Cada módulo llega listo para personalizar colores, tipografías y estados de hover sin romper la coherencia visual."
      sections={[
        {
          title: 'Core kit',
          description: 'Tres bloques principales anclan la experiencia de MiniX.',
          items: [
            { title: 'Mensajes curados', description: 'Listas modernas con etiquetas, contadores, likes y acciones rápidas.' },
            { title: 'Perfiles vivos', description: 'Cards con bio editable, datos contextuales y carga de avatar optimizada.' },
            { title: 'Auth elegante', description: 'Flujos de login/register en líneas, con copy adaptable y micro-feedback.' },
          ],
        },
        {
          title: 'Extras inmediatos',
          description: 'Funciones pensadas para los primeros equipos.',
          items: [
            { title: 'Modo estudio', description: 'Plantillas que heredan tu paleta y logran consistencia en minutos.' },
            { title: 'Toasts y alerts', description: 'Mensajes breves y visibles para notificar eventos importantes.' },
            { title: 'Tokens listos', description: 'Variables CSS para backgrounds, bordes y acentos que puedes extender.' },
          ],
        },
      ]}
    />
  );
};

export default Features;