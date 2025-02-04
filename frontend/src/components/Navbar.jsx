import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    auth: { token, name },
  } = useContext(AuthContext);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  return (
    <nav className="flex top-3 sticky m-5 max-h-4 border rounded-full shadow-slate-300 shadow-lg items-center p-5 bg-white text-black">
      <NavLink to="/">
        <h1 className="text-2xl font-bold max-md:text-base">BlogSpot</h1>
      </NavLink>
      <div className="flex flex-grow justify-end max-md:text-sm">
        <ul className="flex gap-2 md:gap-5">
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive
                  ? "underline hover:text-gray-300"
                  : "hover:text-gray-300"
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? token
                    ? "hidden"
                    : "underline hover:text-gray-300"
                  : token
                  ? "hidden"
                  : " hover:text-gray-300"
              }
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signIn"
              className={({ isActive }) =>
                isActive
                  ? token
                    ? "hidden"
                    : "underline hover:text-gray-300"
                  : token
                  ? "hidden"
                  : " hover:text-gray-300"
              }
            >
              Sign In
            </NavLink>
          </li>
          <li>
            {token ? (
              <div
                className="flex gap-1 items-center hover:text-gray-300 hover:cursor-pointer"
                onClick={handleClick}
              >
                <CgProfile /> {name}
              </div>
            ) : null}
          </li>
          {isMenuOpen && token && (
            <div className="absolute right-0 mt-10 w-48 bg-white border rounded-md shadow-lg">
              <ul>
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-black hover:bg-gray-200"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-black hover:bg-gray-200"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block text-start w-full px-4 py-2 text-black hover:bg-red-500 hover:text-white"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
