import PageLayout from '../components/PageLayout';

const ApiReference = () => {
  return (
    <PageLayout
      label="api"
      title="Referencia de API (dummy)."
      description="Aún no publicamos la documentación técnica, pero esta estructura adelanta cómo se organizarán los endpoints."
      sections={[
        {
          title: 'Autenticación',
          description: 'Endpoints relacionados con login y registro.',
          items: [
            { title: 'POST /api/users/register', description: 'Crea una cuenta nueva con username, email y password.' },
            { title: 'POST /api/users/login', description: 'Devuelve un token JWT para acceder al resto de endpoints.' },
          ],
        },
        {
          title: 'Mensajes',
          description: 'Operaciones básicas para esta primera versión.',
          items: [
            { title: 'GET /api/messages', description: 'Lista mensajes públicos.' },
            { title: 'POST /api/messages', description: 'Publica un mensaje nuevo (requiere auth).' },
            { title: 'POST /api/messages/:id/like', description: 'Marca un mensaje como favorito.' },
          ],
        },
      ]}
    />
  );
};

export default ApiReference;