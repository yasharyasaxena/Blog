import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, EditorContext } from "../App";
import BlogEditor from "./BlogEditor";
import PublishForm from "./PublishForm";

export default function Editor() {
  let {
    auth: { token },
  } = useContext(AuthContext);
  let { isEditing } = useContext(EditorContext);

  return (
    <>
      {token === null ? (
        <Navigate to="/signIn" />
      ) : !isEditing ? (
        <PublishForm />
      ) : (
        <BlogEditor />
      )}
    </>
  );
}
