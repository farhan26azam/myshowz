import { useNavigate } from "react-router-dom";

const MyStoryCard = ({ story }) => {
  const navigate = useNavigate();
  return (
    <div className="shadow-md shadow-black p-8 text-black rounded-lg h-96">
      <div className="flex justify-between">
        <h2 className="text-2xl">{story.title}</h2>
        <h2 className="text-2xl bg-[var(--brown)] px-4 text-white rounded-lg">
          {story.versionno}
        </h2>
      </div>
      <p className="font-bold">{story?.description}</p>
      <p className="">{story.content.slice(0, 300) + "..."}</p>

      <div className="flex gap-2 mb-0">
        <button
          className="bg-[var(--dark-brown)] text-white rounded-lg px-4 py-2"
          onClick={() => navigate(`/story/${story._id}`)}
        >
          Read
        </button>
      </div>
    </div>
  );
};

export default MyStoryCard;
