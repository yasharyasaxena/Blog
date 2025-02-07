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

export const AuthContext = createContext({});

function App() {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let userAuth = JSON.parse(localStorage.getItem("auth"));
    userAuth ? setAuth(userAuth) : setAuth({ token: null });
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ auth, setAuth }}>
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
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
