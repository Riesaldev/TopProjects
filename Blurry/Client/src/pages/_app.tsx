import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RealtimeProvider } from '@/context/RealtimeContext';

function MyApp({ Component, pageProps }: Readonly<{ Component: React.ComponentType<any>, pageProps: any }>) {
  // Get authenticated user data from session storage or cookies
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') || pageProps.userId || '' : pageProps.userId || '';
  const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') || pageProps.jwt || '' : pageProps.jwt || '';
  return (
    <RealtimeProvider userId={userId} jwt={jwt}>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </RealtimeProvider>
  );
}

export default MyApp; 