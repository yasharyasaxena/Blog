import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../App";
import { deleteBlog, likeBlog, unlikeBlog, getLikedBlogs } from "../api";
import { toast } from "react-toastify";

const Blog = ({ image, title, author, views, likes, date, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    auth: { token },
  } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await deleteBlog(id, token);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Error deleting blog");
      }
    } catch (error) {
      setError(error);
      toast.error(error.message);
    }
  };

  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like the blog");
      return;
    }
    setIsLiked(!isLiked);
    if (!isLiked) {
      const response = await likeBlog(id, token);
      if (response.status !== 200) {
        console.error("Error liking blog:", await response.json());
        toast.error("Error liking blog");
      }
    } else {
      const response = await unlikeBlog(id, token);
      if (response.status !== 200) {
        console.error("Error unliking blog:", await response.json());
        toast.error("Error unliking blog");
      }
      setIsLiked(false);
    }
    toast.success(isLiked ? "Blog unliked" : "Blog liked");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const findLiked = async () => {
      const response = await getLikedBlogs(id, token);
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
    <>
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl mt-4 transition-transform duration-300 transform hover:scale-105">
        <Link to={`/blog/${id}`}>
          <img
            className="h-48 w-full object-cover object-top"
            src={image}
            alt={title}
          />
          <div className="px-6 pt-4">
            <div className="font-bold text-xl mb-4">{title}</div>
            <p className="text-gray-700 text-base">By {author}</p>
            <p className="text-gray-600 text-sm">
              Published on :{" "}
              {new Date(date).getDate() +
                "/" +
                String(new Date(date).getMonth() + 1).padStart(2, "0") +
                "/" +
                new Date(date).getFullYear()}
            </p>
          </div>
        </Link>
        <div className="px-6 pt-4 pb-3 flex justify-between items-center text-xl">
          <span className="text-gray-600">{views} views</span>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{likes}</span>
              <button
                onClick={handleLike}
                className="focus:outline-none hover:text-red-600"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>
            <button className="focus:outline-none">
              <Link to={`/blog-edit/${id}`} className="hover:text-blue-600">
                <FiEdit />
              </Link>
            </button>
            <button
              className="focus:outline-none hover:text-red-600"
              onClick={handleDelete}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
