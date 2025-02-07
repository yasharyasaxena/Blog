import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopBlogs } from "../api";
import Blog from "../components/Blog";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getTopBlogs().then((data) => {
      setBlogs(data.topBlogs);
    });
  }, []);

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
    <>
      <div className="m-10 flex flex-col text-center">
        <h1 className="text-3xl mb-2 font-semibold">Welcome to BlogSpot!</h1>
        <span className="font-thin">
          This a blog hosting site where you can view as well as create and host
          blogs.
          <br />
          Blogs are of a wide range of topics.
          <br />
          To write your own blogs register now!
        </span>
      </div>
      <div className="flex m-10 mb-0 py-2 border-y border-black">
        <h1>Some popular Blogs</h1>
      </div>
      <div className="flex mx-10 mt-0 border-b border-black py-2">
        {blogElements.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">{blogElements}</div>
        ) : (
          <p className="text-center mt-4">You have no blogs yet</p>
        )}
      </div>
      <div className="m-10 mt-3 hover:underline hover:text-blue-400">
        <Link to="/blogs">More blogs on the Blogs Page</Link>
      </div>
    </>
  );
}
