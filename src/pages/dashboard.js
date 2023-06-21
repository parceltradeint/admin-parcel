import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import UserProvider from "../AuthenticApp/Context/userContext";
import { useEffect } from "react";
import Page from "@/components/Page";
const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const router = useRouter();
  const auth = getAuth();
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
