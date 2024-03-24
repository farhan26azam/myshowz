import user from '../../assets/user.png'
const WriterCard = ({ writer }) => {
  return (

    
<div className="w-full max-w-sm bg-gray-700 border border-gray-200 rounded-lg shadow">
    <div className="flex flex-col items-center py-10">
        <img className="w-24 h-24 mb-3 rounded-full" src={user} alt={writer?.name || "writer"}/>
        <h5 className="mb-1 text-xl font-medium text-white">{writer?.name || "Name"}</h5>
        <span className="text-sm text-gray-300">{writer?.email || "Email"}</span>
        <div className="flex mt-4 md:mt-6">
            <a href={`/stories?author=${writer._id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[var(--brown)] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">Read Stories</a>
        </div>
    </div>
</div>

  );
};

export default WriterCard;