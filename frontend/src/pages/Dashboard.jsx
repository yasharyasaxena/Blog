import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Blog from "../components/Blog";
import { getTopUserBlogs } from "../api";
import Loading from "../components/Loading";

export default function Dashboard() {
  const {
    auth: { token, name },
    setAuth,
  } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    token &&
      getTopUserBlogs(token).then((data) => {
        setBlogs(data.topUserBlogs);
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

  return token ? (
    <div className="h-screen mb-40">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl">Hello {name}!</h1>
      </div>
      <div className="flex mx-10 mt-0 mb-4 border-b textl-xl font-thin border-black py-2">
        <p>Here are your top Blogs</p>
        <Link
          to="/blogs/user"
          className="ml-auto hover:underline hover:text-blue-400"
        >
          <p>View All</p>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-6">
          {blogElements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogElements}
            </div>
          ) : (
            <p className="text-center mt-4">You have no blogs yet</p>
          )}
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/signIn" />
  );
}
