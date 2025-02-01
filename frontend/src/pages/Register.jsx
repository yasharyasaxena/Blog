import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../api";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function action(formdata) {
    const fullName = formdata.get("fullname");
    const email = formdata.get("email");
    const password = formdata.get("password");
    try {
      const data = await register({ fullName, email, password });
      navigate("/signIn?registered=true");
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className="flex w-fit py-20 px-10 mx-auto mb-10 h-fit flex-col items-center flex-shrink-0 border rounded-3xl">
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col items-start">
          <h1 className="font-semibold text-4xl text-black">Register</h1>
          <p className="text-black">Create an account to continue</p>
        </div>
        {error && (
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-red-500 bg-red-100 text-red-500">
            <FaExclamationTriangle />
            {`${error.message} !`}
            <br />
            {`Please Sign In or Use another email`}
          </div>
        )}
        <form action={action} className="space-y-4">
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-black">
            <div className="flex flex-col items-start gap-6">
              <input
                type="text"
                name="fullname"
                className="text-xl font-normal border-none focus:outline-none"
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-black">
            <div className="flex flex-col items-start gap-6">
              <input
                type="email"
                name="email"
                className="text-xl font-normal border-none focus:outline-none"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-black">
            <div className="flex flex-col items-start gap-6">
              <input
                type="password"
                name="password"
                className="text-xl font-normal border-none focus:outline-none"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-black">
            <div className="flex flex-col items-start gap-6">
              <input
                type="password"
                className="text-xl font-normal border-none focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <button className="flex w-80 py-3 px-4 items-center justify-center gap-2 rounded-xl bg-custom-gradient text-white">
            Register
          </button>
        </form>
        <hr className="w-80 border-t border-black" />
        <div className="flex mx-auto justify-center gap-1">
          <p className="text-black">Already have an account?</p>
          <NavLink to="/signIn" className="text-blue-500">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
