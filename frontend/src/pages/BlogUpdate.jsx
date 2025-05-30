import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { getBlog, updateBlog } from "../api";
import { AuthContext, EditorContext } from "../App";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../components/EditorTools";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function BlogUpdate() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let {
    auth: { token, name },
  } = useContext(AuthContext);
  const [display, setDisplay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBlog(id)
      .then((data) => {
        setBlog(data.blog);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!blog) return;

    setDisplay(
      new EditorJS({
        holder: "content",
        data: blog.content,
        placeholder: "Let's write an awesome blog!",
        tools: EDITOR_JS_TOOLS,
      })
    );
  }, [blog]);

  const handleUpdate = async () => {
    if (!display) return;
    try {
      const outputData = await display.save();
      const updatedBlog = { ...blog, content: outputData };
      setLoading(true);
      setBlog(updatedBlog);

      const response = await updateBlog(updatedBlog, id, token);
      if (response.status === 200) {
        navigate("/blog/" + id + "?updated=true");
      } else {
        toast.error(response.message || "Failed to update the blog");
        throw new Error(response.message || "Failed to update the blog");
      }
    } catch (error) {
      navigate("/blog/" + id + "?updated=false&error=" + error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : error ? (
    toast.error(error.message || "Failed to load the blog")
  ) : (
    <div className="max-w-4xl mx-auto p-4">
      <div className="banner mb-4">
        <img
          className="w-full h-auto rounded-lg shadow-md"
          src={blog.banner}
          alt={blog.title}
        />
        <h1 className="text-4xl text-center mt-4 font-bold mb-4">
          {blog.title}
        </h1>
      </div>
      <div className="content prose lg:prose-xl">
        <div id="content"></div>
      </div>
      <button
        onClick={handleUpdate}
        className="flex mx-auto bg-blue-500 text-white px-4 py-2 rounded mt-5 hover:bg-white hover:text-blue-500 border border-blue-500"
      >
        <span className="text-lg">Update</span>
      </button>
    </div>
  );
}
