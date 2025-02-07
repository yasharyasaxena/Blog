import { useContext, useState, createContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import BlogEditor from "./BlogEditor";
import PublishForm from "./PublishForm";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  author: {},
};

export const EditorContext = createContext({});

export default function Editor() {
  let {
    auth: { token },
  } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);
  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        isEditing,
        setIsEditing,
        textEditor,
        setTextEditor,
      }}
    >
      {token === null ? (
        <Navigate to="/signIn" />
      ) : !isEditing ? (
        <PublishForm />
      ) : (
        <BlogEditor />
      )}
    </EditorContext.Provider>
  );
}
