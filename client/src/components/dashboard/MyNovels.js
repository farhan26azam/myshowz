import { useEffect, useState } from "react";
import { store } from "../../store";
import axios from "axios";
import { url } from "../../utils";
import MyStoryCard from "./MyStoryCard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";

const MyNovels = () => {
  const user = store();
  const [novels, setNovels] = useState([]);
  const navigate = useNavigate();
  const [sort, setSort] = useState("latest");

  const getNovels = async () => {
    try {
      const response = await axios.get(`${url}/novels/${user?.user?._id}`);
      setNovels(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNovels();
  }, []);

  useEffect(() => {
    if(sort === "latest") {
      setNovels(novels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } else if(sort==="likes") {
        setNovels(novels.sort((a, b) => b.likes.length - a.likes.length));
    }
  }, [sort]);

  return (
    <div className="py-10">

      <h1 className="text-3xl font-bold my-2">My Novels</h1>
      <div className="flex items-center my-4">
        <p>Sort by:</p>
        <select
          className="border-[var(--dark-brown)] border-2 rounded-lg p-2 ml-2 bg-[var(--brown)] text-white px-4"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div
          className="shadow-md shadow-black p-4 text-black rounded-lg h-96 w-full flex flex-col justify-center items-center cursor-pointer"
          onClick={()=>navigate("/write/new")}
        >
          <PostAddIcon
            sx={{
              height: "16rem",
              width: "16rem",
              color: "var(--brown)",
            }}
          />
          <p className="text-2xl">Write a new novel</p>
        </div>
        {novels?.map((novel) => (
          <MyStoryCard story={novel} />
        ))}
      </div>
    </div>
  );
};

export default MyNovels;
