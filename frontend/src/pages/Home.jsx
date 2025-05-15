import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopBlogs } from "../api";
import Blog from "../components/Blog";
import heroImg from "../assets/image.png";
import Loading from "../components/Loading";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopBlogs().then((data) => {
      setBlogs(data.topBlogs);
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
    <div>
      <div className="relative h-[90vh] max-md:h-[50vh] bg-[#ebe4ff]">
        <img
          src={heroImg}
          alt="Hero Image"
          className="absolute right-0 w-2/3 h-full"
        />
        <div className="absolute top-1/4 left-10 w-1/3 text-blue-900 max-md:w-2/3 max-md:left-5 max-md:top-10">
          <h1 className="text-5xl mb-10 font-semibold max-md:text-3xl">
            Welcome to BlogSpot!
          </h1>
          <span className="font-thin text-2xl w-11/12 max-md:text-sm">
            This a blog hosting site where you can view as well as create and
            host blogs.
            <br />
            Blogs are of a wide range of topics.
            <br />
            To write your own blogs register now!
          </span>
          <div className="mt-10 mr-10 justify-center flex">
            <Link
              to="/register"
              className="bg-blue-900 text-white text-xl px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl font-semibold mb-5">Top Blogs</h1>
        {loading && <Loading />}
        {!loading ? (
          blogElements.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${
                blogElements.length > 2 ? "3" : blogElements.length
              } gap-4 w-full max-w-screen-xl px-4`}
            >
              {blogElements}
            </div>
          ) : (
            <div className="text-gray-500 text-lg">
              No blogs available at the moment.
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
