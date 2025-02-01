import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex top-3 sticky m-5 max-h-4 border-2 rounded-full border-black shadow-slate-700 shadow-lg justify-between items-center p-5 bg-white text-black z-10">
      <h1 className="text-2xl font-bold">FitTech</h1>
      <ul className="flex space-x-5">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
