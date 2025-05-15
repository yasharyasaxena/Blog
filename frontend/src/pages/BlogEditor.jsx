import blogBannerImg from "../assets/blogBanner.png";
import { useState, useContext } from "react";
import { AuthContext, EditorContext } from "../App";
import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../components/EditorTools";
import { toast } from "react-toastify";

export default function BlogEditor() {
  const [imgURL, setImgURL] = useState(blogBannerImg);
  let {
    auth: { token, name },
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

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: content,
        placeholder: "Let's write an awesome blog!",
        tools: EDITOR_JS_TOOLS,
      })
    );
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blogproject");
    data.append("cloud_name", "da52uzpu4");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/da52uzpu4/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageURL = await res.json();
    setImgURL(uploadedImageURL.url);
    setBlog({ ...blog, banner: uploadedImageURL.url, author: name });
  };

  const handlePublish = () => {
    if (!title.length || !banner.length) {
      toast.error("Please fill in all the fields!");
      return;
    } else if (textEditor.isReady) {
      textEditor.save().then((outputData) => {
        if (!outputData.blocks.length) {
          toast.error("Please write some content!");
          return;
        }
        setBlog({ ...blog, content: outputData });
        setIsEditing(!isEditing);
      });
    }
  };

  const handleTitleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  const handleTitleChange = (event) => {
    let input = event.target;

    // input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  return (
    <div className="p-10 mx-auto max-w-[900px] w-full">
      <div className="relative aspect-video border-4 border-gray-200 bg-white hover:opacity-80">
        <label htmlFor="uploadBanner">
          <img
            src={banner ? banner : imgURL}
            className={`${
              imgURL === blogBannerImg
                ? "z-20"
                : "z-20 w-full max-h-[400px] object-contain"
            }`}
          />
          <input
            type="file"
            id="uploadBanner"
            accept=".jpg,.jpeg,.png"
            hidden
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <textarea
        defaultValue={title}
        placeholder="Blog Title"
        className="text-4xl font-medium outline-none w-full h-12 resize-none mt-10 leading-tight placeholder:opacity-40"
        onKeyDown={handleTitleKeyDown}
        onChange={handleTitleChange}
      ></textarea>
      <hr className="w-full opacity-80 my-5" />
      <div className="prose" id="textEditor"></div>
      <button
        onClick={handlePublish}
        className="flex mx-auto bg-blue-500 text-white px-4 py-2 rounded mt-5 hover:bg-white hover:text-blue-500 border border-blue-500"
      >
        <span className="text-lg">Publish</span>
      </button>
    </div>
  );
}
