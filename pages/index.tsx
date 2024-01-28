import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import AOS from "aos";
import Navbar from "@/components/organisms/Navbar";
import MainBanner from "@/components/organisms/MainBanner";
import TransactionSteps from "@/components/organisms/TransactionSteps";
import FeaturedGames from "@/components/organisms/FeaturedGames";
import Reached from "@/components/organisms/Reached";
import Story from "@/components/organisms/Story";
import Footer from "@/components/organisms/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head>
        <title>Store GG - Get a New Experience in Gaming</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
        <meta
          name="og:title"
          content="Store GG - Get a New Experience in Gaming"
        />
      </Head>
      <Navbar />
      <MainBanner />
      <TransactionSteps />
      <FeaturedGames />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
