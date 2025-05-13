import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../App";
import { deleteBlog, backend } from "../api";

const Blog = ({ image, title, author, views, likes, date, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    auth: { token },
  } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      const response = await deleteBlog(id, token);
      if (response.status === 200) {
        alert("Blog deleted successfully");
      } else {
        alert("Error deleting blog");
      }
    } catch (error) {
      alert(error.status === 401 ? "Unauthorized" : "Error deleting blog");
    } finally {
      window.location.reload();
    }
  };

  const handleLike = async () => {
    if (!token) {
      alert("Please login to like the blog.");
      return;
    }
    setIsLiked(!isLiked);
    if (!isLiked) {
      const response = await fetch(`${backend}/liked-blogs/${id}`, {
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
      const response = await fetch(`${backend}/liked-blogs/${id}`, {
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
      const response = await fetch(`${backend}/liked-blogs/${id}`, {
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
          <p className="text-gray-600 text-sm">Published on : {date}</p>
        </div>
      </Link>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Views: {views}</span>
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-gray-600 text-sm align-top mr-1">
              {likes}
            </span>
            <button onClick={handleLike} className="focus:outline-none">
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
          <button className="focus:outline-none">
            <Link
              to={`/blog-edit/${id}`}
              className="text-gray-600 hover:text-gray-800"
            >
              <FiEdit />
            </Link>
          </button>
          <button className="focus:outline-none" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
