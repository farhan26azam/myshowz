import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {url} from "../../utils";
import {Favorite} from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
import DrawIcon from '@mui/icons-material/Draw';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MyStoryCard = ({ story }) => {
  const navigate = useNavigate();
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDelete = async () => {
      const response = await axios.delete(`${url}/novel/${story._id}`);
  }
  return (
    <div className="shadow-md shadow-black p-8 text-black rounded-lg h-96 flex flex-col justify-between">
        <div>

            <div className="flex gap-2 justify-between">
                <div className="">
                    <h2 className="text-2xl font-bold">{story.title}</h2>
                </div>

                <div className="flex gap-1">
                <div
                    className="h-10 flex gap-1 items-center text-2xl bg-[var(--brown)] px-2 py-1 text-white rounded-lg">
                    <Favorite/>
                    {story?.likes?.length}
                </div>
                <div
                    className="h-10 flex gap-1 items-center text-2xl bg-[var(--brown)] px-2 py-1 text-white rounded-lg">
                    <ArticleIcon/>
                    {story?.versionno}
                </div>

                </div>

            </div>
            <p className="font-bold">{story?.description}</p>
            <p className="overflow-hidden flex flex-1">{story.content.split('.')[0]}{`...`}</p>
        </div>

        <div className="flex gap-2 mb-0">
            {
                story?.active ?
                <button
          className="bg-[var(--brown)] text-white rounded-lg px-4 py-2"
          onClick={() => navigate(`/story/${story._id}`)}
        >
          Read
        </button>
                    :
                    <button
                onClick={
                ()=>navigate(`/write/${story._id}`)
            }
            className="h-10 flex gap-1 items-center bg-white border-2 border-[var(--brown)] px-2 py-1 text-[var(--brown)] rounded-lg">
                        Continue Writing
            <DrawIcon
                sx={{
                    color: 'var(--brown)'
                }}/>
        </button>
            }
          <button
            className="bg-[var(--brown)] text-white rounded-lg px-4 py-2"
            onClick={() => navigate(`/write/${story._id}`)}
            >
              <EditIcon />
          </button>
          <button
            className="bg-white border-[var(--brown)] border-2 text-[var(--brown)] rounded-lg px-4 py-2"
            onClick={() => setDeleteClicked(true)}
            >
              <DeleteIcon/>
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
                                className="bg-[var(--brown)] text-white rounded-lg px-4 py-2"
                                onClick={() => {
                                    handleDelete().then(r =>
                                    window.location.reload());
                                    setDeleteClicked(false);
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-[var(--brown)] text-white rounded-lg px-4 py-2"
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
