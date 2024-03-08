import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  console.log("story:", story);
  return (
    <Link
      to={`/story/${story._id}`}
      className="p-4 rounded-lg bg-gray-200 shadow-md shadow-black"
    >
      <h2 className="text-2xl font-bold">{story.title}</h2>
      <p className="mt-2 text-gray-600 font-bold">{story.description}</p>
      <p className="mt-2">{story.content.slice(0, 120) + "..."}</p>
      <div className="flex my-2">
        <div className="px-4 py-2 bg-gray-700 rounded-lg text-white">
          Version: {story?.versionno}
        </div>
        
      </div>
    </Link>
  );
};

export default StoryCard;
