import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import { LanguageProvider } from "./component/languageProvider/LanguageProvider";

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
          <LanguageProvider>{children}</LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
