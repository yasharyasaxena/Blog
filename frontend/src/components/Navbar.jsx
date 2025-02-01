import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex top-3 sticky m-5 max-h-4 border rounded-full shadow-slate-300 shadow-lg justify-between items-center p-5 bg-white text-black">
      <h1 className="text-2xl font-bold">BlogSpot</h1>
      <ul className="flex space-x-5">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:text-gray-300"
            }
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signIn"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:text-gray-300"
            }
          >
            Sign In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
