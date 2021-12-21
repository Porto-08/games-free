import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { BiArrowFromBottom } from "react-icons/bi";
import { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader, RingLoader } from "react-spinners";

// Loading das paginas.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const [scroll, setScroll] = useState<number>(0);
  const [loadding, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    const handleLoad = () => {
      setLoading(false);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("load", (event) => {
      handleLoad();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleLoad);
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
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>

      {loadding === true ? (
        <div className="pageLoading">
          <RingLoader color="#14ffec" size={200} />
        </div>
      ) : (
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
        </div>
      )}
    </>
  );
}

export default MyApp;
