const MySkills = ({ skills }) => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold my-2">My Skills</h1>
      <div className="flex flex-wrap mt-4">
        {skills?.map((skill, index) => (
          <div key={index} className="bg-gray-200 px-4 py-2 rounded-full m-2">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySkills;
