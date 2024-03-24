import { useEffect, useState } from "react";
import { url } from "../../utils";
import axios from "axios";

const GenreSpotlight = () => {
  const [genres, setGenres] = useState([]);
  const getGenres = async () => {
    try {
      const response = await axios.get(`${url}/genres`);
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);
  return (
    <section className="bg-gray-100 p-16 pb-0">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Explore Genres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {genres?.map((genre, index) => (
            <div className="bg-white p-4 rounded-lg shadow-md" key={index}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{genre?.genre}</h3>
                </div>
                <button
                  className="bg-[var(--brown)] text-white px-4 py-2 rounded-lg"
                  onClick={() =>
                    (window.location.href = `/stories?genre=${genre._id}`)
                  }
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSpotlight;
