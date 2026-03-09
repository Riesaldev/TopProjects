import PageLayout from '../components/PageLayout';

const Community = () => {
  return (
    <PageLayout
      label="beta crew"
      title="Nuestra comunidad se construye con equipos curiosos."
      description="Aún estamos invitando a los primeros testers. Mientras tanto, esta página muestra cómo luce el espacio comunitario."
      sections={[
        {
          title: 'Beneficios temporales',
          description: 'Ideas básicas para quienes se unan al programa inicial.',
          items: [
            { title: 'Acceso anticipado', description: 'Prueba funcionalidades antes de que lleguen al público general.' },
            { title: 'Canal privado', description: 'Recibe soporte directo del equipo de diseño y dev.' },
            { title: 'Créditos de reconocimiento', description: 'Aparece en nuestro sitio como colaborador de la beta.' },
          ],
        },
        {
          title: 'Cómo participar',
          description: 'Pasos simples para entrar a la comunidad.',
          items: [
            { title: 'Escríbenos', description: 'Cuéntanos quién eres y qué buscas con MiniX.' },
            { title: 'Recibe invitación', description: 'Compartimos acceso al canal y a la versión más reciente.' },
            { title: 'Itera con nosotros', description: 'Envía feedback mensual y ayuda a priorizar el roadmap.' },
          ],
        },
      ]}
    />
  );
};

export default Community;