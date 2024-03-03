import React, { useEffect, useState } from "react";
import { store } from "../store";
import logo from "../assets/logo.png";
import axios from "axios";
import { url } from "../utils";

import Hero from "../components/home/Hero";
import Novels from "../components/home/Novels";
import FeaturesStories from "../components/home/FeaturedStories";
import GenreSpotlight from "../components/home/GenreSpotlight";
import AuthorsSpotlight from "../components/home/AuthorsSpotlight";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
const Homepage = () => {
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

  return (
    <div className="font-poppins bg-gray-100">
      <Navbar />
      <Hero />
      <Novels />
      <FeaturesStories />
      <GenreSpotlight />
      <AuthorsSpotlight />
      <Footer />

    </div>
  );
};

export default Homepage;
