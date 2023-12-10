import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/Header";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ECG prediction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
