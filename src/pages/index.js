import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout/Layout";
import NavBar from "@/common/NavBar/NavBar";
import LandingPage from "@/components/Landing/Index";
import UserProvider from "../AuthenticApp/Context/userContext";
import Page from "@/components/Page";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const {theme, setTheme, systemTheme} = useTheme()
  // useEffect(() => {
  //   const listener = auth.onIdTokenChanged((user) => {
  //     if (user) {
  //       user.getIdToken().then((token) => {
  //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //       });
  //     } else {
  //     }
  //   });

  //   return () => {
  //     listener();
  //   };
  // }, [auth]);

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme("light")
  }, [router, setTheme, systemTheme, theme])

  return (
    <UserProvider>
      <Page>
        <Layout>
          <p className="text-4xl text-black text-center">
            Welcome Our Parcel Internal Dashboard
          </p>
        </Layout>
      </Page>
    </UserProvider>
  );
}
