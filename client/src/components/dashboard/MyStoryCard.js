import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {url} from "../../utils";

const MyStoryCard = ({ story }) => {
  const navigate = useNavigate();
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDelete = async () => {
      const response = await axios.delete(`${url}/novel/${story._id}`);
  }
  return (
    <div className="shadow-md shadow-black p-8 text-black rounded-lg h-96 flex flex-col justify-between">
        <div>

      <div className="flex justify-between">
        <h2 className="text-2xl">{story.title}</h2>
        <h2 className="text-2xl bg-[var(--brown)] px-4 text-white rounded-lg">
          {story.versionno}
        </h2>
      </div>
      <p className="font-bold">{story?.description}</p>
      <p className="">{story.content.slice(0, 300) + "..."}</p>
        </div>

      <div className="flex gap-2 mb-0">
        <button
          className="bg-[var(--dark-brown)] text-white rounded-lg px-4 py-2"
          onClick={() => navigate(`/story/${story._id}`)}
        >
          Read
        </button>
          <button
            className="bg-[var(--dark-brown)] text-white rounded-lg px-4 py-2"
            onClick={() => navigate(`/write/${story._id}`)}
            >
              Edit
          </button>
          <button
            className="bg-white border-[var(--dark-brown)] border-2 text-[var(--dark-brown)] rounded-lg px-4 py-2"
            onClick={() => setDeleteClicked(true)}
            >
              Delete
            </button>
      </div>

        {
            deleteClicked && (
                // show backdrop
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={() => setDeleteClicked(false)}
                >
                    <div className="bg-white p-8 rounded-lg gap-4 flex flex-col">
                        <h2 className="text-2xl">Are you sure you want to delete?</h2>
                        <div className="flex gap-2">
                            <button
                                className="bg-[var(--dark-brown)] text-white rounded-lg px-4 py-2"
                                onClick={() => {
                                    handleDelete().then(r =>
                                    window.location.reload());
                                    setDeleteClicked(false);
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-[var(--dark-brown)] text-white rounded-lg px-4 py-2"
                                onClick={() => setDeleteClicked(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  );
};

export default MyStoryCard;
