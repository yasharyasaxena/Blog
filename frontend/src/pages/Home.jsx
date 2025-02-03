import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
        <h1>Blogs here</h1>
      </div>
      <div className="m-10 mt-3 hover:underline hover:text-blue-400">
        <Link to="/blogs">More blogs on the Blogs Page</Link>
      </div>
    </>
  );
}
