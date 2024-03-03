import axios from "axios";
import { url } from "../../utils";
import WriterCard from "../cards/WriterCard";
import { useEffect, useState } from "react";

const AuthorsSpotlight = () => {
  const [writers, setWriters] = useState([]); // State to store writers

  const getWriters = async (id) => {
    try {
      const response = await axios.get(`${url}/writers`);
      setWriters(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWriters();
  }, []);
  return (
    <section className="bg-gray-100 p-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Authors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {writers.map((w) => (
            <WriterCard writer={w} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSpotlight;
