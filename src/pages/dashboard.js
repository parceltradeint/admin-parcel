import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import UserProvider from "../AuthenticApp/Context/userContext";
import { useEffect } from "react";
import Page from "@/components/Page";
import { useTheme } from "next-themes";

export default function Finance() {
  return (
    <UserProvider>
      <Page>
        <Layout>
          <p className="text-4xl text-black text-center">
            Welcome to Our Parcel Internal Dashboard
          </p>
        </Layout>
      </Page>
    </UserProvider>
  );
}
