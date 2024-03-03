import { useEffect, useState } from "react";
import StoryCard from "../components/cards/StoryCard";
import { url } from "../utils";
import Navbar from "../components/global/Navbar";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

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
