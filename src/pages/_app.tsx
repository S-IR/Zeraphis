import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Nav from "~/components/general/Nav";
import Sidebar from "~/components/general/Sidebar";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* <DefaultSeo
        title="Zeraphis"
        description="website dedicated to learning languages for faiths"
        themeColor="#0F3120"
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]} 
        // openGraph={{
        //   type: "website",
        //   locale: "en_IE",
        //   url: "https://www.url.ie/",
        //   siteName: "SiteName",
        // }}
        // twitter={{
        //   handle: "@handle",
        //   site: "@site",
        //   cardType: "summary_large_image",
        // }}
      />*/}
      <Toaster />
      <Nav />
      <Sidebar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
