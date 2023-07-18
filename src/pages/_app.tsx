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

interface Props {
  children: React.ReactNode;
}

const App: NextPage<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <React.Fragment>
      <Head>
        <title>Kash</title>
        <meta content="Kash description" name="description" />
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <main className={quicksand.className}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </main>
    </React.Fragment>
  );
};

export default App;
