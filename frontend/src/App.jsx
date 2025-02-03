import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import Host from "./pages/Host";
import SignIn from "./pages/SignIn";

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
            <Route path="host" element={<Host />} />
            <Route path="register" element={<Register />} />
            <Route path="signIn" element={<SignIn />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
