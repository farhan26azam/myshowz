import { useEffect, useState } from "react";
import NovelCard from "../cards/NovelCard";
import axios from "axios";
import { url } from "../../utils";

const Novels = () => {
  const [novels, setNovels] = useState([]); // State to store novels

  const getNovels = async () => {
    try {
      const response = await axios.get(`${url}/novels`);
      setNovels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNovels();
  }, []);

  return (
    <div className="bg-gray-800 md:p-12 py-12">
      <div className="text-white font-semibold text-3xl my-2">
        Explore Novels
      </div>
      <div className="flex gap-4 flex-wrap">
        {novels?.slice(0,5)?.map((novel) => (
          <div key={novel._id}>
            <NovelCard novel={novel} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Novels;
