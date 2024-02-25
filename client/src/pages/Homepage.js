import React, { useEffect, useState } from "react";
import { store } from "../store";
import logo from "../assets/logo.png";
import axios from "axios";
import { url } from "../utils";
import NovelCard from "../components/cards/NovelCard";
import WriterCard from "../components/cards/WriterCard";
const Homepage = () => {
  const [novels, setNovels] = useState([]); // State to store novels
  const [writers, setWriters] = useState([]); // State to store writers

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

  const { user } = store();

  const getNovels = async () => {
    try {
      const response = await axios.get(`${url}/novels`);
      setNovels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWriters = async (id) => {
    try {
      const response = await axios.get(`${url}/writers`);
      setWriters(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNovels();
    getWriters();
  }, []);

  return (
    <div className="font-poppins bg-gray-100">
      <nav className="bg-[var(--brown)] fixed w-full z-20 top-0 start-0 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="w-16" alt="Talecrafters Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Talecrafters
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-[var(--dark-brown)] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Get started
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex p-4 md:p-0 mt-4 font-medium border  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white"
                  aria-current="page"
                >
                  Stories
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white"
                  aria-current="page"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="section-1 text-gray-800 h-screen flex items-center justify-center">
        <div className="text-center bg-white bg-opacity-50 px-20 rounded-lg py-24">
          <h2 className="text-4xl font-bold mb-4">
            {"Hello " + user?.name || "User"}
          </h2>
          <h1 className="text-8xl font-semibold">Welcome to Talecrafters</h1>
          <h3 className="text-3xl">
            the best place to read and write stories.
          </h3>
        </div>
      </section>

      <div className="bg-gray-800 md:p-12 py-12">
        <div className="text-white font-semibold text-3xl my-2">
          Explore Novels
        </div>
        <div className="flex flex-col gap-4">
          {novels.map((novel) => (
            <div key={novel._id}>
              <NovelCard novel={novel} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Stories Section */}
      <section id="featured-stories" className="p-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story Cards */}
          </div>
        </div>
      </section>

      {/* Genre Spotlight */}
      <section className="bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">ExploreGenres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Genre Cards */}
          </div>
        </div>
      </section>

      {/* Author Spotlight */}
      <section className="bg-gray-100 p-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writers.map((w) => (
              <WriterCard writer={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="conatiner text-center mb-8">
          <a href="/" className="text-pink-500 hover:text-pink-500 m-4">
            Home
          </a>
          <a href="/" className="text-white hover:text-pink-500 m-4">
            Stories
          </a>
          <a href="/" className="text-white hover:text-pink-500 m-4">
            Contact
          </a>
          <a href="/auth" className="text-white hover:text-pink-500 m-4">
            SignIn
          </a>
        </div>
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Stories Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
