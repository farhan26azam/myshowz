import React from "react";
import Hero from "../components/home/Hero";
import Novels from "../components/home/Novels";
import FeaturesStories from "../components/home/FeaturedStories";
import GenreSpotlight from "../components/home/GenreSpotlight";
import AuthorsSpotlight from "../components/home/AuthorsSpotlight";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import { store } from "../store";
import Dashboard from "./Dashboard";
const Homepage = () => {
  const user = store();
  // useEffect(() => {
  //   const swiper = new Swiper(".mySwiper", {
  //     direction: "vertical",
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //     autoplay: {
  //       delay: 2500,
  //       disableOnInteraction: false,
  //     },
  //   });

  //   // Clean up Swiper instance on unmount
  //   return () => {
  //     swiper.destroy();
  //   };
  // }, []);

  return user?.user?.role === "reader" ? (
    <div className="font-poppins bg-gray-100">
      <Navbar />
      <Hero />
      <Novels />
      <FeaturesStories />
      <GenreSpotlight />
      <AuthorsSpotlight />
      <Footer />
    </div>
  ):
  (
    <div className="font-poppins bg-gray-100">
      <Dashboard/>
    </div>
  )
};

export default Homepage;
