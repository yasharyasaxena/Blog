import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const {
    auth: { token, name },
  } = useContext(AuthContext);
  return (
    <nav className="flex top-3 sticky m-5 max-h-4 border rounded-full shadow-slate-300 shadow-lg justify-between items-center p-5 bg-white text-black">
      <NavLink to="/">
        <h1 className="text-2xl font-bold">BlogSpot</h1>
      </NavLink>
      <ul className="flex space-x-5">
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "underline hover:text-gray-300" : "hover:text-gray-300"
            }
          >
            Blogs
          </NavLink>
        </li>
        <li>
          {token ? null : (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "underline hover:text-gray-300"
                  : "hover:text-gray-300"
              }
            >
              Register
            </NavLink>
          )}
        </li>
        <li>
          {token ? null : (
            <NavLink
              to="/signIn"
              className={({ isActive }) =>
                isActive
                  ? "underline hover:text-gray-300"
                  : "hover:text-gray-300"
              }
            >
              Sign In
            </NavLink>
          )}
        </li>
        <li>
          {token ? (
            <NavLink
              to="/host"
              className={({ isActive }) =>
                isActive
                  ? "underline hover:text-gray-300"
                  : "hover:text-gray-300"
              }
            >
              <div className="flex gap-1 items-center">
                <CgProfile /> {name}
              </div>
            </NavLink>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
