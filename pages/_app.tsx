import "../styles/globals.scss";
import NavBar from "../components/NavBar";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <div className="container">
        <NavBar />

        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
