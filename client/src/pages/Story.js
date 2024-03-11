import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../utils";
import Navbar from "../components/global/Navbar";
import { store } from "../store";
import { toast } from "react-toastify";

const Story = () => {
  const { id } = useParams();
  const user = store();
  const [story, setStory] = useState({});
  const [author, setAuthor] = useState({});
  const [feedback, setFeedback] = useState(0);

  const fetchStory = async () => {
    const response = await fetch(`${url}/novel/${id}`);
    const data = await response.json();
    console.log("Story data: ", data);
    setStory(data);
  };

  useEffect(() => {
    if (story.writerid) {
      console.log("Story writer id: ", story.writerid);
      fetchAuthor(story.writerid);
    }
  }, [story]);

  const fetchAuthor = async (writerId) => {
    try {
      const response = await fetch(`${url}/writer/${writerId}`);
      const data = await response.json();
      setAuthor(data);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  const submitFeedback = (e) => {
    e.preventDefault();
    postFeedback(e.target.value);
    console.log("Feedback submitted");
  };

  const postFeedback = async () => {
    console.log("Feedback: ", feedback);
    const response = await fetch(`${url}/novel/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: feedback,
        readerid: user.user._id,
        novelid: id,
        writerid: author._id,
      }),
    });
    const data = await response.json();
    console.log("Feedback response: ", data);
    if (data.error) {
      toast.error("Error submitting feedback");
    } else {
      toast.success("Feedback submitted successfully");
    }
  };

  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="mt-24 mb-12">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-center">{story.title}</h1>
        </div>
        <div className="mx-12">
          <p>{story.content}</p>
        </div>
      </div>
      <div className="bg-[var(--brown)] w-full grid grid-cols-2 py-4 px-10">
        <div className="text-white">
          <span className="font-bold text-2xl">About the author</span>
          {story.writerid && (
            <div className="bg-gray-700 w-fit p-4 rounded-lg">
              <h2>{author?.name}</h2>
              <p>{author?.email}</p>
              <p>{author?.score}</p>
            </div>
          )}
        </div>
        {user?.user?.role === "reader" && (
          <div className="bg-gray-700 p-4 text-white rounded-lg">
            <div className="font-bold text-2xl mb-2">Submit Review</div>
            <form>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0."
                  className="slider-thumb h-1 w-40 bg-[var(--brown)] rounded-full"
                  value={feedback}
                  onChange={handleFeedback}
                />
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    height: 16px;
                    width: 16px;
                    margin-top: -7px;
                    cursor: pointer;
                    -webkit-appearance: none;
                    appearance: none;
                  }

                  input[type="range"]::-webkit-slider-runnable-track {
                    height: 2px;
                    background-color: #c56f3d;
                  }
                `}</style>
              </div>
              <p className="text-2xl my-2">{feedback}</p>
              <button
                className="bg-[var(--dark-brown)] rounded-lg text-white py-2 px-4"
                onClick={submitFeedback}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Story;
