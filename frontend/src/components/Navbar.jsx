import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext, useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    setAuth,
    auth: { token, name },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsSidebarOpen(false);
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

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    setAuth({ token: null, name: null });
    setIsMenuOpen(false);
    setIsSidebarOpen(false);
    navigate("../signIn");
  };

  return (
    <nav
      className={`flex top-5 sticky m-5 max-h-4 justify-between items-center p-5 text-black z-10 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "rounded-full shadow-slate-300 text-white bg-gray-500 shadow-lg w-1/2 mx-auto bg-opacity-90"
          : "bg-white w-11/12"
      }`}
    >
      <div className="flex items-center gap-2">
        <NavLink to="/">
          <h1 className="text-2xl font-bold max-md:text-base">BlogSpot</h1>
        </NavLink>
      </div>
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden ml-auto text-2xl"
        onClick={handleSidebar}
        aria-label="Open sidebar"
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>
      {/* Desktop menu */}
      <div className="hidden md:flex max-md:text-sm">
        <ul className="flex gap-2 md:gap-5">
          {/* ...existing code for nav links and menu... */}
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
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "#fff",
          boxShadow: "0 0 30px 0 rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex flex-col h-full p-6">
          <button
            className="self-end mb-6 text-2xl"
            onClick={handleSidebar}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/blogs"
                className="hover:text-gray-300"
                onClick={handleSidebar}
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={token ? "hidden" : "hover:text-gray-300"}
                onClick={handleSidebar}
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signIn"
                className={token ? "hidden" : "hover:text-gray-300"}
                onClick={handleSidebar}
              >
                Sign In
              </NavLink>
            </li>
            {token && (
              <>
                <li>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <CgProfile /> {name}
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="hover:text-gray-300"
                    onClick={handleSidebar}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="hover:text-gray-300"
                    onClick={handleSidebar}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/editor"
                    className="hover:text-gray-300"
                    onClick={handleSidebar}
                  >
                    Editor
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-left w-full hover:text-red-500"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
