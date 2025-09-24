


const Homepage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center  text-secondary  bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900">
      <div className="h-full  bg-[url('/bg-home.jpg')] bg-cover bg-center bg-no-repeat w-full flex items-center justify-center">
        <div className="bg-black  bg-opacity-60 p-10 flex flex-col items-center justify-center text-center ">
          <h1 className="text-4xl font-bold m-20 flex">Bienvenido a RollForge</h1>
          <p className="text-xl m-10">Tu solución integral para todas tus necesidades de juegos de mesa, ¡explora y disfruta!</p>
          <p className="m-10">Aquí encontrarás una amplia variedad de recursos, herramientas y una comunidad apasionada por los juegos de mesa.</p>
          <p className="text-2xl font-serif ">¡Aquí comienza tu aventura!</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;