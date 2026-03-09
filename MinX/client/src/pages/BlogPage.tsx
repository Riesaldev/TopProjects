import PageLayout from '../components/PageLayout';

const Blog = () => {
  return (
    <PageLayout
      label="notas"
      title="Pequeños apuntes sobre construir MiniX."
      description="Todavía no habilitamos el blog, pero esta estructura nos permite mostrar rápidamente cómo se verá cada post destacado."
      sections={[
        {
          title: 'Entradas recientes',
          description: 'Items ficticios para representar el feed inicial.',
          items: [
            { title: 'Por qué usamos glassmorphism moderado', description: 'Lecciones tras prototipar decenas de superficies transparentes.' },
            { title: 'Tipografía y tono en apps sociales', description: 'Cómo elegimos Space Grotesk + Inter para MiniX.' },
            { title: 'Hover states que cuentan historias', description: 'Guía breve para crear micro-interacciones consistentes.' },
          ],
        },
        {
          title: 'Lo que viene',
          description:
            'Publicaremos dev logs, fichas de producto y entrevistas con personas que estén usando MiniX en contextos reales.',
        },
      ]}
    />
  );
};

export default Blog;