import { useEffect, useState } from "react";
import StoryCard from "../components/cards/StoryCard";
import { url } from "../utils";
import Navbar from "../components/global/Navbar";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      const fetchStories = async () => {
        try {
          const response = await fetch(`${url}/novels/`);
          const data = await response.json();
          setStories(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchStories();
    } else {
      handleSearch();
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/novels/search/${search}`);
      const data = await response.json();
      setStories(data);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mt-24 bg-white md:p-12 mx-20 py-6">
        <div className="text-[var(--brown)] font-semibold text-4xl my-2">
          Novels
        </div>
        <div className="my-2 flex gap-2">
          <input
            type="text"
            placeholder="Search novels"
            className="border border-gray-300 p-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch} className="bg-[var(--brown)] text-white p-2 rounded-lg">
            Search
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Stories;
