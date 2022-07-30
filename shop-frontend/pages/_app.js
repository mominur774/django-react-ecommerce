import '../styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from '../context/GlobalContext';
import Layout from '../components/Layout/Layout';
import { ToastProvider } from 'react-toast-notifications';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </ToastProvider>
  )
}

export default MyApp;
