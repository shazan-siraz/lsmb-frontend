import Sidebar from "./Sidebar";
import Footer from "../../pages/Footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../../pages/Header/Header";

const MainLayout = () => {
  
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1  md:ml-[250px]">
        <Header />
        <div className="mb-[40px] mt-[55px] bg-slate-100 min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
