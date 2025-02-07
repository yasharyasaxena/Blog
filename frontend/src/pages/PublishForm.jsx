import { useState, useContext, useEffect } from "react";
import { EditorContext } from "./Editor";
import { IoMdClose } from "react-icons/io";
import EditorJS from "@editorjs/editorjs";
import { AuthContext } from "../App";
import { createBlog } from "../api";
import { useNavigate } from "react-router-dom";
import { EDITOR_JS_TOOLS } from "../components/EditorTools";

export default function PublishForm() {
  let {
    auth: { token },
  } = useContext(AuthContext);
  let {
    blog,
    blog: { title, banner, content, author },
    setBlog,
    textEditor,
    setTextEditor,
    isEditing,
    setIsEditing,
  } = useContext(EditorContext);

  const navigate = useNavigate();

  useEffect(() => {
    const preview = new EditorJS({
      holder: "textPreview",
      data: content,
      tools: EDITOR_JS_TOOLS,
      readOnly: true,
    });
  }, []);

  const handleBack = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    try {
      const result = await createBlog(blog, token);
      console.log(result.status);
      if (result.status === 201) {
        alert(result.message);
        setBlog({ title: "", banner: "", content: [], author: {} });
        setTextEditor({ isReady: false });
        navigate(`/blog/${result.blog}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center m-10">
        <h1 className="text-xl">Preview</h1>
        <button className="ml-auto text-3xl" onClick={handleBack}>
          <IoMdClose />
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-10 pb-10 bg-white rounded-md shadow-md">
        <img src={banner} alt={title} className="w-full h-96 object-cover" />
        <h1 className="text-3xl font-bold px-10 py-5">{title}</h1>
        <hr />
        <div id="textPreview" className="px-10"></div>
        <div className="flex mx-auto mb-5 bg-gray-600 text-white px-4 py-2 rounded mt-5 w-fit hover:bg-white hover:text-gray-600 border border-gray-600">
          <button onClick={handleSubmit}>Publish</button>
        </div>
      </div>
    </>
  );
}
