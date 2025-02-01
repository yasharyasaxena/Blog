import { useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const [visibility, setVisibility] = useState(false);
  const isRegistered = searchParams.get("registered");

  return (
    <div className="flex w-fit py-20 px-10 mx-auto mb-10 h-fit flex-col items-center flex-shrink-0 border rounded-3xl">
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col items-start">
          <h1 className="font-semibold text-4xl text-black">Sign In</h1>
          <p className="text-black">Sign In to your account to continue</p>
        </div>
        {isRegistered == "true" && (
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-green-500 bg-green-100 text-green-500">
            <TiTick />
            {`Successfully Registered !`}
            <br />
            {`Please Sign In`}
          </div>
        )}
        <form className="space-y-4">
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-black">
            <div className="flex flex-col items-start gap-6">
              <input
                type="email"
                name="email"
                className="text-xl font-normal w-72 border-none focus:outline-none"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-black">
            <div className="flex justify-center items-start gap-6">
              <input
                name="password"
                className="text-xl font-normal border-none focus:outline-none"
                placeholder="Password"
                type={visibility ? "text" : "password"}
              />
              <div className="my-auto ml-auto text-2xl">
                {visibility ? (
                  <FaRegEye onClick={() => setVisibility(false)} />
                ) : (
                  <FaRegEyeSlash onClick={() => setVisibility(true)} />
                )}
              </div>
            </div>
          </div>
          <button className="flex w-80 py-3 px-4 items-center justify-center gap-2 rounded-xl bg-custom-gradient text-white">
            Sign In
          </button>
        </form>
        <hr className="w-80 border-t border-black" />
        <div className="flex mx-auto justify-center gap-1">
          <p className="text-black">New? Make an account now!</p>
          <NavLink to="/register" className="text-blue-500">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
}
