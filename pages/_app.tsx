import "../styles/globals.scss";
import NavBar from "../components/NavBar";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
