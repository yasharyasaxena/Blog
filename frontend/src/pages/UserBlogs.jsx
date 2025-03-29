import { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";
import { getUserBlogs } from "../api";
import { AuthContext } from "../App";

export default function UserBlogs() {
  const {
    auth: { token, name },
    setAuth,
  } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);

  token &&
    getUserBlogs(token).then((data) => {
      setBlogs(data.userBlogs);
    });

  const blogElements = blogs.map((blog) => (
    <Blog
      key={blog._id}
      image={blog.banner}
      title={blog.title}
      author={blog.author.name}
      views={blog.views}
      id={blog._id}
    />
  ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">All Your Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogElements || (
          <p className="text-center mt-4">You have no blogs yet</p>
        )}
      </div>
    </div>
  );
}
