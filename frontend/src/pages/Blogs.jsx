import { useState, useEffect } from "react";
import Blog from "../components/Blog";
import { getBlogs } from "../api";
import Loading from "../components/Loading";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data.blogs);
      setLoading(false);
    });
  }, []);

  const blogElements = blogs.map((blog) => (
    <Blog
      key={blog._id}
      image={blog.banner}
      title={blog.title}
      author={blog.author.name}
      views={blog.views}
      likes={blog.likes}
      date={new Date(blog.date).toLocaleDateString()}
      id={blog._id}
    />
  ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">All Blogs</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogElements || (
            <p className="text-center mt-4">You have no blogs yet</p>
          )}
        </div>
      )}
    </div>
  );
}
