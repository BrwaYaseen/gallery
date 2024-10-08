import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider} from "@clerk/nextjs";
import { Nav } from "./_components/nav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";


export const metadata = {
  title: "Image Gallery",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
    <html lang="en" className={`${GeistSans.variable} dark`}>
    <NextSSRPlugin
         
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
      <body>
        <div className=" grid h-screen grid-rows-[auto,1fr]">
        <Nav/>
        <main className=" overflow-y-scroll">
        {children}
        </main>
        </div>
        {modal}
        <div id="modal-root" />
        <Toaster/>
      </body>
    </html>
    </CSPostHogProvider>
    </ClerkProvider>
  );
}
