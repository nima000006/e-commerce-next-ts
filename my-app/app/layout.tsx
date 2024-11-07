import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import { LanguageProvider } from "./component/languageProvider/LanguageProvider";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";

export const metadata: Metadata = {
  title: "E-commerce-sample",
  description: "Implement by Nima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="">
        <ReduxProvider>
          <LanguageProvider>
            <Header/>
            {children}
            <Footer/>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
