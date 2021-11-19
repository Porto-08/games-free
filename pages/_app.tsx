import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer";
import { BiArrowFromBottom } from "react-icons/bi";
import { createRef, useEffect, useState } from "react";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        {scroll > 1500 && (
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="buttonToTop animate__animated animate__fadeInRightBig"
          >
            <BiArrowFromBottom />
          </button>
        )}

        <div className="content">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default MyApp;
