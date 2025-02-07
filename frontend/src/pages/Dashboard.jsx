import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Blog from "../components/Blog";
import { getUserBlog } from "../api";

export default function Dashboard() {
  const {
    auth: { token, name },
    setAuth,
  } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    token &&
      getUserBlog(token).then((data) => {
        console.log(data);
        setBlogs(data.topUserBlogs);
      });
  }, []);

  return token ? (
    <div className="h-screen">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl">Hello {name}!</h1>
      </div>
      <div className="flex mx-10 mt-0 border-b textl-xl font-thin border-black py-2">
        <p>Here are your top Blogs</p>
        <Link
          to="/blogs/user"
          className="ml-auto hover:underline hover:text-blue-400"
        >
          <p>View All</p>
        </Link>
      </div>
      <div className="mx-6">
        <Blog
          image={blogs[0]?.banner}
          title={blogs[0]?.title}
          author={blogs[0]?.author.name}
          views={blogs[0]?.views}
          id={blogs[0]?._id}
        />
      </div>
    </div>
  ) : (
    <Navigate to="/signIn" />
  );
}
