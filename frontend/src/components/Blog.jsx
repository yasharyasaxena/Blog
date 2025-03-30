import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../App";

const Blog = ({ image, title, author, views, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    auth: { token },
  } = useContext(AuthContext);

  const handleLike = async () => {
    if (!token) {
      alert("Please login to like the blog.");
      return;
    }
    setIsLiked(!isLiked);
    if (!isLiked) {
      const response = await fetch(`http://localhost:3000/liked-blogs/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        console.error("Error liking blog:", await response.json());
      }
    } else {
      const response = await fetch(`http://localhost:3000/liked-blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        console.error("Error unliking blog:", await response.json());
      }
      setIsLiked(false);
    }
  };

  useEffect(() => {
    const findLiked = async () => {
      const response = await fetch(`http://localhost:3000/liked-blogs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        const likedBlogs = data.likedBlogs || [];
        if (likedBlogs.includes(id)) {
          setIsLiked(true);
        }
      } else {
        console.error("Error fetching blog data:", data.message);
      }
    };
    if (token) {
      findLiked();
    }
  }, [id, token]);

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg m-4">
      <Link to={`/blog/${id}`}>
        <img className="h-40 w-full" src={image} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">By {author}</p>
        </div>
      </Link>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Views: {views}</span>
        <div className="flex items-center space-x-6">
          <button onClick={handleLike} className="focus:outline-none">
            {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
          <button className="focus:outline-none">
            <Link
              to={`/blog-edit/${id}`}
              className="text-gray-600 hover:text-gray-800"
            >
              <FiEdit />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
