import React from "react";
import Hero from "../components/home/Hero";
import Novels from "../components/home/Novels";
import GenreSpotlight from "../components/home/GenreSpotlight";
import AuthorsSpotlight from "../components/home/AuthorsSpotlight";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import { store } from "../store";
import Dashboard from "./Dashboard";
const Homepage = () => {
  const user = store();

  return user?.user?.role === "reader" ? (
    <div className="font-poppins bg-gray-100">
      <Navbar />
      <Hero />
      <Novels />
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
