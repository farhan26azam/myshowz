import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../utils";
import Navbar from "../components/global/Navbar";

const Story = () => {
  const { id } = useParams();
  const [story, setStory] = useState({});
  const [author, setAuthor] = useState({});

  const fetchStory = async () => {
    const response = await fetch(`${url}/novel/${id}`);
    const data = await response.json();
    setStory(data);
  };

  const fetchAuthor = async (authorId) => {
    const response = await fetch(`${url}/writer/${story.writerid}`);
    const data = await response.json();
    setAuthor(data);
  };

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-24">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-center">{story.title}</h1>
        </div>
        <div className="mx-12">
          <p>{story.content}</p>
        </div>
      </div>
      <div className="bg-[var(--brown)] w-full grid grid-cols-2 py-4 px-10">
        <div>
          About the author
          {story.writerid &&
            story.writerid.map((author) => (
              <div key={author._id}>
                <h2>{author.name}</h2>
                <p>{author.bio}</p>
              </div>
            ))}
        </div>
        <div>
          <div>Submit feedback</div>
          <form action="">
            <input type="text" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Story;
