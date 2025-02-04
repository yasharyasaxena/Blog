import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Blog = ({ image, title, author, views, id }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg m-4">
      <img className="h-40 w-full" src={image} alt={title} />
      <Link to={`/blog/:${id}`}>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">By {author}</p>
        </div>
      </Link>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Views: {views}</span>
        <button onClick={handleLike} className="focus:outline-none">
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default Blog;
