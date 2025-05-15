import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mb-10">
        <ToastContainer />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
