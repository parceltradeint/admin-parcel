import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        <p className="text-4xl text-black text-center">Welcome Our Parcel Internal Dashboard</p>
      </Layout>
    </>
  );
}
