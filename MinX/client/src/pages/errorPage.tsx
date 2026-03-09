import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/bg-error.jpg')] bg-center bg-cover">
      <section className="bg-emerald-500/30 backdrop-blur-md p-8 rounded-4xl text-center w-3/4 md:w-1/2 lg:w-1/3 -top-44 relative">
        <h1 className="text-4xl font-bold text-emerald-700 mb-4">Oops!!</h1>
        <h2 className="text-2xl font-semibold text-emerald-900">404 - Page Not Found</h2>
        <p className="mt-4 text-lg text-emerald-100 mb-5">Sorry, the page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <Link to="/" className="text-emerald-600 text-lg font-semibold hover:bg-emerald-600 hover:text-white border border-emerald-500 rounded-lg px-4 py-2">Go back to Home</Link>
      </section>
    </div>
  );
}

export default ErrorPage;