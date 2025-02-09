import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { getUserInfo } from "../api";

export default function Profile() {
  const {
    auth: { token },
  } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo(token);
        setUserInfo(res);
      } catch (error) {
        console.log(error);
      }
    };
    token && fetchData();
  }, [token]);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <p className="text-gray-900">{userInfo.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <p className="text-gray-900">{userInfo.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total number of blogs
          </label>
          <p className="text-gray-900">{userInfo.blogs}</p>
        </div>
      </div>
    </div>
  );
}
