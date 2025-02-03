import { useState, useContext } from "react";
import {
  useSearchParams,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaExclamationTriangle } from "react-icons/fa";
import { login } from "../api";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../App";

export default function SignIn() {
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState(null);
  const {
    auth: { token },
    setAuth,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRegistered = searchParams.get("registered");

  async function action(formdata) {
    const email = formdata.get("email");
    const password = formdata.get("password");
    if (!email || !password) {
      setError({
        message: "All fields are required",
      });
    } else {
      try {
        const data = await login({ email, password });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: data.token,
            name: data.name,
          })
        );
        setAuth({
          token: data.token,
          name: data.name,
        });
        navigate("/host");
      } catch (e) {
        setError({
          ...e,
        });
      }
    }
  }

  return token ? (
    <Navigate to="/host" />
  ) : (
    <div className="flex w-fit py-20 px-5 md:px-10 mx-auto mb-10 h-fit flex-col items-center flex-shrink-0 border rounded-3xl">
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
        {error && (
          <div className="flex w-80 py-3 px-4 items-center gap-2 rounded-xl border border-red-500 bg-red-100 text-red-500">
            <FaExclamationTriangle />
            {`${error.message} !`}
          </div>
        )}
        <form action={action} className="space-y-4">
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
