import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../utils";
import NovelCard from "../cards/NovelCard";

const FeaturesStories = () => {
  const [featuredNovels, setFeaturedNovels] = useState([]); // State to store novels

  const getFeaturedNovels = async () => {
    try {
      const response = await axios.get(`${url}/novels/featured`);
      setFeaturedNovels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeaturedNovels();
  }, []);
  return (
    <div className="bg-[var(--brown)] md:p-12 py-12">
      <div className=" text-white font-semibold text-3xl my-2">
        Featured Novels
      </div>
      <div className="mb-2">
        <button
          className="bg-white text-[var(--brown)] p-2 rounded-lg my-4"
          onClick={() =>
            (window.location.href = "/stories?genre=&author=&featured=true")
          }
        >
          View All
        </button>
      </div>
      <div className="flex gap-4 flex-wrap">
        {featuredNovels?.map((novel) => (
          <div key={novel._id}>
            <NovelCard novel={novel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesStories;
