import PageLayout from '../components/PageLayout';

const Privacy = () => {
  return (
    <PageLayout
      label="legal"
      title="Privacidad y tratamiento de datos (borrador)."
      description="Mientras terminamos la política oficial, compartimos esta versión resumida para orientar a quienes prueban MiniX."
      sections={[
        {
          title: 'Datos recopilados',
          description:
            'Guardamos nombre de usuario, correo, avatar y mensajes creados dentro de la plataforma. Todo está alojado en servidores europeos para cumplir estándares estrictos.',
        },
        {
          title: 'Uso de la información',
          description:
            'Utilizamos los datos para autenticar usuarios, mostrar perfiles y enviar notificaciones. No comercializamos la información ni la compartimos con terceros.',
        },
        {
          title: 'Control y eliminación',
          description:
            'Puedes solicitar la eliminación de tu cuenta escribiéndonos en cualquier momento. Estamos construyendo un panel para descargar tus datos con un clic.',
        },
      ]}
    />
  );
};

export default Privacy;