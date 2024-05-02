import React, { useEffect, useState } from "react";
import WriterNavbar from "../components/dashboard/WriterNavbar";
import { store } from "../store";
import { url } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";

function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

const WriteNovel = () => {
  // get id from params
  const { id } = useParams();
  const user = store();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [novelData, setNovelData] = useState({
    versioncount: 1,
    versionno: 1,
    title: "Title",
    versionorder: 1,
    content: "Write your story here",
    description: "Short Overview",
    genres: [],
    writerid: user.user._id,
    isFeatured: false,
    active: true
  });

  const getNovel = async () => {
    const response = await axios.get(`${url}/novel/${id}`);
    setNovelData(response.data);
  };

  useEffect(() => {
    if(id){
      getNovel();
    }
  },[id]);

  const getGenres = async () => {
    const response = await fetch(`${url}/genres`);
    const data = await response.json();
    setGenres(data);
  };

  useEffect(() => {
    getGenres();
  }, []);

  const handleGenreChange = (genre) => {
    if (novelData.genres.includes(genre)) {
      setNovelData((prevData) => ({
        ...prevData,
        genres: prevData.genres.filter((g) => g !== genre),
      }));
    } else if (novelData.genres.length < 3) {
      setNovelData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, genre],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateNovel = () => {
    if (
      novelData.title === "" ||
      novelData.description === "" ||
      novelData.content === "" ||
      novelData.genres.length === 0
    ) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateNovel()) return;
    let response;
    if(id){
        response = await axios.put(`${url}/novel/${id}`, {...novelData, active: true, writerid: user.user._id});
    }else{
        response = await axios.post(`${url}/novel`, {...novelData, active: true, writerid: user.user._id});
    }
    if(id){
      if (response.status === 200) {
        toast.success("Novel edited successfully");
        navigate("/");
      } else if(response.status === 202){
        toast.error("Error editing novel" + response.data.error);
      } else{
        toast.error("Error editing novel" + response.error);
      }
    }else{
        if (response.status === 201) {
            toast.success("Novel updated successfully");
            navigate("/");
        } else if(response.status === 202){
            toast.error("Error updating novel" + response.data.error);
        } else{
            toast.error("Error updating novel" + response.error);
        }
    }

  };

  const handleSave = async (e) => {
    // save with active false
    e.preventDefault();
    if (!validateNovel()) return;
    let response;
    if(id) {
      response = await axios.put(`${url}/novel/${id}`, {...novelData, active: false});
    } else {
      response = await axios.post(`${url}/novel`, {...novelData, active: false});
    }
    if(id) {
      if (response.status === 200) {
        toast.success("Novel saved successfully");
        navigate("/");
      } else if (response.status === 202) {
        toast.error("Error saving novel" + response.data.error);
      } else {
        toast.error("Error saving novel" + response.error);
      }
    }
  }

  return (
    <>
      <WriterNavbar />
      <div className="container mx-auto mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-20 py-10">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Versioning</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Version Count
                </label>
                <input
                  type="text"
                  name="versioncount"
                  value={novelData.versioncount}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter version count"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Version Number
                </label>
                <input
                  type="text"
                  name="versionno"
                  value={novelData.versionno}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter version number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Version Order
                </label>
                <input
                  type="text"
                  name="versionorder"
                  value={novelData.versionorder}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter version order"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Genres (Max 3)
                </label>
                <div>
                  {genres.map((genre, index) => (
                    <label
                      key={index}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        name={genre?.genre}
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-[#c56f3d]"
                        onChange={() => handleGenreChange(id ? genre._id: genre)}
                        checked={novelData.genres.includes(id ? genre._id:genre)}
                      />
                      <span className="ml-2 text-sm">{genre?.genre}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Add other numerical fields here */}
            </div>
          </div>
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Story</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={novelData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <input
                  type="textarea"
                  name="description"
                  value={novelData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={novelData.content}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64 resize-none"
                  placeholder="Enter content"
                ></textarea>
              </div>
              {/* Add other text areas or components for description and genres */}
            </div>
          </div>
        </div>
        {/* Save Button*/}
        <div className="text-center mt-8">
          <button
              onClick={
                    handleSave
              }
            className="bg-white text-[var(--brown)] border-2 border-[var(--brown)] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Draft
          </button>
        </div>
        {/* Submit Button */}
        <div className="text-center mt-2">
          <button
            onClick={handleSubmit}
            className="bg-[var(--brown)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default WriteNovel;
