import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function PublicLayout() {
  return (
    <div className="layout-shell">
      <Navbar />
      <main className="content-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
