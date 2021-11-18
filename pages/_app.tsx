import "../styles/globals.scss";
import NavBar from "../components/NavBar";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { GrLinkTop } from "react-icons/gr";

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

      <div className="container" onScroll={() => console.log(Window)}>
        <NavBar />

        <div className="content">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default MyApp;
