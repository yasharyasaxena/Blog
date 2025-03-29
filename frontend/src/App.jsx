import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Editor from "./pages/Editor";
import UserBlogs from "./pages/UserBlogs";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import BlogUpdate from "./pages/BlogUpdate";

export const AuthContext = createContext({});
export const EditorContext = createContext({});
const blogStructure = {
  title: "",
  banner: "",
  content: [],
  author: {},
};

function App() {
  const [auth, setAuth] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });

  useEffect(() => {
    let userAuth = JSON.parse(localStorage.getItem("auth"));
    userAuth ? setAuth(userAuth) : setAuth({ token: null });
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ auth, setAuth }}>
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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blog/:id" element={<Blog />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="register" element={<Register />} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="blogs/user" element={<UserBlogs />} />
              <Route path="editor" element={<Editor />} />
              <Route path="profile" element={<Profile />} />
              <Route path="blog-edit/:id" element={<BlogUpdate />} />
            </Route>
          </Routes>
        </EditorContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
