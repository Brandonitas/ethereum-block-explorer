import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles/main.scss";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import { quicksand } from "@/fonts/fonts";
import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React from "react";
import Nav from "@/components/modules/Nav/Nav";

const App: NextPage<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <React.Fragment>
      <Head>
        <title>Ether Block Explorer</title>
        <meta content="Ether Block Explorer" name="Ether Block Explorer" />
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <main className={quicksand.className}>
        <MainLayout>
          <Nav />
          <Component {...pageProps} />
        </MainLayout>
      </main>
    </React.Fragment>
  );
};

export default App;
