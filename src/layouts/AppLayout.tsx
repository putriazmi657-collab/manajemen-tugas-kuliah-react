
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <div className="app">
      <Header
        name="Azmi Putri Kuswandi"
        nim="1247050126"
      />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
