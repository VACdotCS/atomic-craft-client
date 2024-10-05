import "../styles/globals.scss";
import styles from "../styles/globals.module.scss";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import { ToastContainer } from "react-toastify";
import React from "react";

export const metadata: Metadata = {
  title: "Atomic Craft - Ваш проект серверов",
  description:
    "Лучшие серверы в игровой вселенной Minecraft на просторах СНГ. Site was made by InkyCrane 2023-2024",
  viewport: {
    initialScale: 1.0,
    minimumScale: 1.0,
    maximumScale: 1.5,
    width: "device-width",
    height: "device-height",
  },
  creator: "InkyCrane",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <title>Atomic Craft - Ваш проект серверов</title>
        <meta
          name="description"
          content="Лучший проект серверов в игровой вселенной Minecraft на просторах СНГ."
        />
        <meta name="yandex-verification" content="8040688ae5410be3" />
      </head>
      <body className={styles.body}>
        <div className={styles.gradient}></div>
        <GlobalContextProvider>
          <Nav />
          {children}
          <ToastContainer
            bodyClassName={"text-sm font-white font-med block p-3 z-99999"}
            position="bottom-left"
            autoClose={3000}
          />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
export default RootLayout;
