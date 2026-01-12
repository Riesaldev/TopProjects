import Image from 'next/image';

export default function ProducerCard ( { producer } ) {
  // Validación y valores por defecto para datos de la base de datos
  if ( !producer )
  {
    return null;
  }

  const {
    id,
    verified = false,
    name = 'Productor sin nombre',
    description = 'Descripción no disponible',
    yearsActive = 0,
    perCentageCaracteristic = 'N/A',
    caracteristic = 'N/A',
    image = '/producer.png',
  } = producer;

  const handleViewProducts = () => {
    if ( id )
    {
      console.log( 'Ver productos del productor:', { id, name } );
      // Aquí conectarás con la lógica de navegación/API
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-12 max-w-275 w-full min-h-125">
      <div className="w-full md:w-1/2 relative h-100 ">
        <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#27fc8e] rounded-2xl z-0 hidden md:block"></div>
        <Image
          className="rounded-2xl shadow-xl w-full h-full object-cover relative z-10"
          data-alt="Portrait of a smiling farmer holding fresh vegetables"
          src={image}
          alt={name}
          width={500}
          height={400}
          onError={( e ) => {
            e.target.src = '/producer.png';
          }}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm min-h-[24px]">
          {verified && (
            <>
              <img src="/verified.svg" alt="Verified Icon" height={20} width={20} />
            </>
          )}
          Productor Destacado
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-text-main leading-tight min-h-[88px]">
          Conoce a {name}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed min-h-[168px] line-clamp-6">
          {description}
        </p>
        <div className="flex gap-4 pt-2">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl text-text-main">{yearsActive}+</span>
            <span className="text-sm text-gray-500">Años cultivando</span>
          </div>
          <div className="w-px bg-gray-300 h-full mx-2"></div>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl text-text-main">{perCentageCaracteristic}</span>
            <span className="text-sm text-gray-500">{caracteristic}</span>
          </div>
        </div>
        <button className="self-start mt-4 font-bold border-b-2 border-[#27fc8e] pb-1 hover:text-[#27fc8e] transition-colors cursor-pointer">
          Ver productos de esta granja
        </button>
      </div>
    </div>
  )
};