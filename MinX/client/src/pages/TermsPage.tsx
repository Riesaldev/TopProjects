import PageLayout from '../components/PageLayout';

const Terms = () => {
  return (
    <PageLayout
      label="legal"
      title="Condiciones de uso (versión preliminar)."
      description="Este texto es temporal y sirve como placeholder mientras definimos la política final junto con el equipo legal."
      sections={[
        {
          title: 'Uso del servicio',
          description:
            'MiniX está en beta cerrada. Durante esta etapa pedimos a los equipos que nos informen cualquier bug, exploit o comportamiento inesperado para poder corregirlo rápido.',
        },
        {
          title: 'Privacidad y datos',
          description:
            'Solo guardamos la información necesaria para operar cuentas y mensajes. Eliminamos datos bajo petición y estamos preparando herramientas de exportación simples.',
        },
        {
          title: 'Actualizaciones',
          description:
            'Al estar en una versión temprana, estas condiciones pueden actualizarse sin previo aviso. Publicaremos un changelog cuando tengamos el documento definitivo.',
        },
      ]}
    />
  );
};

export default Terms;