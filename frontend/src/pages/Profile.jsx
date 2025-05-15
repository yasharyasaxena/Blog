import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { getUserInfo } from "../api";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import Loading from "../components/Loading";

export default function Profile() {
  const {
    auth: { token },
  } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo(token);
        setUserInfo(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    token && fetchData();
  }, [token]);

  useEffect(() => {
    const updateUserInfo = async () => {
      try {
        const res = await updateUserInfo(userInfo, token);
        if (res.status === 200) {
          return;
        } else {
          console.log("Error updating user info:", await res.json());
        }
      } catch (error) {
        console.log(error);
      }
    };
    editMode && updateUserInfo();
  }, [editMode, userInfo, token]);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <div className="flex items-center border rounded shadow-sm appearance-none w-full py-2 px-3 text-gray-700 leading-tight ">
              <input
                type="text"
                value={userInfo.name || ""}
                disabled={editMode ? false : true}
                className="disabled:bg-white focus:outline-none focus:shadow-outline w-full disabled:font-bold"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
              <button
                className="ml-auto"
                onClick={() => setEditMode(!editMode)}
              >
                {!editMode ? <FiEdit /> : <FaCheck />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {userInfo.email}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total number of blogs
            </label>
            <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {userInfo.blogs}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
