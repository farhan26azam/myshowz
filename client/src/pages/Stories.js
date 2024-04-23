import { useEffect, useState } from "react";
import StoryCard from "../components/cards/StoryCard";
import { url } from "../utils";
import Navbar from "../components/global/Navbar";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [authors, setAuthors] = useState([]); // State to store writers
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genre = queryParams.get("genre");
  const author = queryParams.get("author");
  const featured = queryParams.get("featured") === "true"; // Hook to access URL params
  const navigate = useNavigate(); // Hook for programmatic navigation

  const [filters, setFilters] = useState({
    genre: genre || "",
    author: author || "",
    featured: featured === "true"
  });

  const getGenres = async () => {
    try {
      const response = await axios.get(`${url}/genres`);
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${url}/novels/`);
        const data = await response.json();
        setStories(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
    getWriters();
    getGenres();
  }, []);

  const getWriters = async (id) => {
    try {
      const response = await axios.get(`${url}/writers`);
      setAuthors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${url}/novels/search/${search}`);
      const data = await response.json();
      setStories(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFilters({ ...filters, [name]: newValue });

    if(name === "featured") {
      // Update URL with new filters
      navigate(`/stories?genre=${filters.genre}&author=${filters.author}&featured=${newValue}`);
      return;
    }else if(name === "genre") {
      // Update URL with new filters
      navigate(`/stories?genre=${value}&author=${filters.author}&featured=${filters.featured}`);
      return;
    }else if(name === "author") {
      // Update URL with new filters
      navigate(`/stories?genre=${filters.genre}&author=${value}&featured=${filters.featured}`);
      return;
    }
  };

  const filteredStories = stories.filter((story) => {
    // Apply genre filter
    if (filters.genre && story.genres.indexOf(filters.genre) === -1) {
      return false;
    }
    // Apply author filter
    if (filters.author && story.writerid !== filters.author) {
      return false;
    }
    // Apply featured filter
    if (filters.featured && !story.isFeatured) {
      return false;
    }
    return true;
  });

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mt-24 bg-white md:p-12 mx-20 py-6">
        <div className="text-[var(--brown)] font-semibold text-4xl my-2">
          Novels
        </div>
        <div className="my-2 flex gap-2">
          <input
            type="text"
            placeholder="Search novels"
            className="border border-gray-300 p-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[var(--brown)] text-white p-2 rounded-lg"
          >
            Search
          </button>
        </div>
        <div className="my-2 flex gap-2">
          <select
            name="genre"
            onChange={handleFilterChange}
            value={filters.genre}
            className="border border-gray-300 p-2"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.genre}
              </option>
            ))}
          </select>
          <select
            name="author"
            onChange={handleFilterChange}
            value={filters.author}
            className="border border-gray-300 p-2"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={filters.featured}
              onChange={handleFilterChange}
              className="mr-2"
            />
            Featured Only
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Stories;

