


const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-full  bg-[url('public/images/bg-error.jpg')] bg-cover bg-center bg-no-repeat w-full flex items-center justify-center">
        <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-secondary">404 - Not Found</h1>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;