import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider} from "@clerk/nextjs";
import { Nav } from "./_components/nav";


export const metadata = {
  title: "my Gellary",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${GeistSans.variable} flex flex-col gap-3`}>
      <body>
        <Nav/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
