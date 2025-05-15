import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext, useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    setAuth,
    auth: { token, name },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    setAuth({ token: null, name: null });
    setIsMenuOpen(false);
    navigate("../signIn");
  };

  return (
    <nav
      className={`flex top-5 sticky m-5 max-h-4 justify-between items-center p-5 text-black z-10 transition-all duration-500 ease-in-out max-md:
         ${
           isScrolled
             ? "rounded-full shadow-slate-300 text-white bg-gray-500 shadow-lg w-1/2 mx-auto bg-opacity-90 backdrop-blur-md"
             : "bg-white w-11/12"
         }`}
    >
      <div className="flex items-center gap-2">
        <NavLink to="/">
          <h1 className="text-2xl font-bold max-md:text-base">BlogSpot</h1>
        </NavLink>
      </div>
      <div className="flex max-md:text-sm">
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
            <div
              ref={menuRef}
              className="absolute right-0 mt-10 w-48 bg-white border rounded-md shadow-lg"
            >
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
                  <NavLink
                    to="/editor"
                    className="block px-4 py-2 text-black hover:bg-gray-200"
                  >
                    Editor
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
