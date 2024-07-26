import { Fragment, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import "../styles/global.css";
import { AppProps } from "next/app";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { SidebarProvider } from '../components/Context/SidebarContext';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
    AOS.init({
      offset: 100,
    });
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Nearby</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Mulish"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </Fragment>
  );
}

export default MyApp;
