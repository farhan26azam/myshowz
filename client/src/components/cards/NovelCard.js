const NovelCard = ({ novel }) => {
  return (
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <a href={`/story/${novel._id}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {novel?.title || "Title"}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">
        {novel?.description || "Description"}
      </p>
      <a
        href={`/story/${novel._id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[var(--brown)] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

export default NovelCard;
