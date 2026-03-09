import PageLayout from '../components/PageLayout';

const Works = () => {
  return (
    <PageLayout
      label="showcase"
      title="Primeros experimentos con marcas que confían en la estética MiniX."
      description="Estos casos son maquetas internas que usamos para validar tonos, espaciados y componentes antes de liberar el sistema."
      sections={[
        {
          title: 'Estudios piloto',
          description: 'Cada piloto se enfocó en una necesidad: comunicación, soporte o comunidad.',
          items: [
            { title: 'Atmos Lab', description: 'Rediseñamos su intranet con cards glass y métricas rápidas.' },
            { title: 'Chroma House', description: 'Activamos un hub creativo con feeds temáticos y CTA dinámicos.' },
          ],
        },
        {
          title: 'Aprendizajes',
          description: 'Lo que nos llevamos tras iterar sobre estas piezas.',
          items: [
            { title: 'Tipografía expresiva', description: 'Combinar Space Grotesk + Inter mantiene claridad y carácter.' },
            { title: 'Gradientes contenidos', description: 'Menos es más: dos luces suaves bastan para dar profundidad.' },
            { title: 'Hover significativo', description: 'Mover apenas 2px y ajustar sombras comunica intención sin distracción.' },
          ],
        },
      ]}
    />
  );
};

export default Works;