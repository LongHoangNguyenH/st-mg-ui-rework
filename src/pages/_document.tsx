import { Html, Head, Main, NextScript } from "next/document";
import HeaderComponent from "./components/Header";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <HeaderComponent/>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
