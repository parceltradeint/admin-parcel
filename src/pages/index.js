import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout/Layout";
import NavBar from "@/common/NavBar/NavBar";
import LandingPage from "@/components/Landing/Index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <span className="bg-gray-200">
      <LandingPage />
    </span>
  );
}
