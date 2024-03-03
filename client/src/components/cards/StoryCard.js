import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  return (
    <Link to={`/story/${story._id}`} className="p-4 rounded-lg bg-gray-200 shadow-md shadow-black">
      <h2 className="text-2xl font-bold">{story.title}</h2>
      <p className="mt-2 text-gray-600">{story.description}</p>
      <p className="mt-2">{story.content.slice(0,120)+"..."}</p>
    </Link>
  );
};

export default StoryCard;
