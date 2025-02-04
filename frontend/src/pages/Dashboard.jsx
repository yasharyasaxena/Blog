import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import Blog from "../components/Blog";

export default function Dashboard() {
  const {
    auth: { token, name },
    setAuth,
  } = useContext(AuthContext);
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl">Hello {name}!</h1>
      </div>
      <div className="flex mx-10 mt-0 border-b textl-xl font-thin border-black py-2">
        <p>Here are your top Blogs</p>
        <Link
          to="/blogs/user"
          className="ml-auto hover:underline hover:text-blue-400"
        >
          <p>View All</p>
        </Link>
      </div>
      <div className="mx-6">
        <Blog
          image="https://picsum.photos/200"
          title="Blog 1"
          author="Author 1"
          views="100"
        />
      </div>
    </div>
  );
}
