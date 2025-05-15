import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { getBlog } from "../api";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../components/EditorTools";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function Blog() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams?.get("updated"));
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError({ message: searchParams?.get("error") });
  }, [searchParams]);

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
    const display = new EditorJS({
      holder: "content",
      data: blog.content,
      placeholder: "Let's write an awesome blog!",
      tools: EDITOR_JS_TOOLS,
      readOnly: true,
    });
  }, [blog]);

  if (loading) {
    return <Loading />;
  }

  if (error.message) {
    toast.error(error.message);
  }
  if (status === "true") {
    toast.success("Blog updated successfully!");
    setStatus(null);
  }

  return (
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
    </div>
  );
}
