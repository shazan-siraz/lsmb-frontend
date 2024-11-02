/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosSpeedometer } from "react-icons/io";
import ModalComponents from "../../pages/Modal/ModalComponents";
import "./Sidebar.css";
import RegisterPackage from "../RegisterPackageSidebar/RegisterPackage";
import BranchCreateSidebar from "../BranchCreateSidebar/BranchCreateSidebar";
import CreateAdminSidebar from "../CreateAdminSidebar/CreateAdminSidebar";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import CreateSuperAdminSidebar from "../CreateSuperAdminSidebar/CreateSuperAdminSidebar";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import SubscriberSidebar from "../SubscriberSidebar/SubscriberSidebar";
import SmsSidebar from "../SmsSidebar/SmsSidebar";
import AddVideoTutorialSidebar from "../AddVideoTutorialSidebar/AddVideoTutorialSidebar";
import SoftwareUsersSidebar from "../SoftwareUsersSidebar/SoftwareUsersSidebar";
import AdArticleSidebar from "../ArticleSidebar/AdArticleSidebar";
import LoanSidebar from "../LoanSidebar/LoanSidebar";
import SavingsSidebar from "../SavingsSidebar/SavingsSidebar";
import DpsSidebar from "../DpsSidebar/DpsSidebar";
import WithdrawSidebar from "../WithdrawSidebar/WithdrawSidebar";
import FdrSidebar from "../FdrSidebar/FdrSidebar";
import StaffSidebar from "../StaffSidebar/StaffSidebar";
import RegisteredUserSidebar from "../RegisteredUserSidebar/RegisteredUserSidebar";
import CompanySidebar from "../CompanySidebar/CompanySidebar";
import BranchProfile from "../BranchProfile/BranchProfile";

const Sidebar = () => {
  const { email, role } = useSelector(useCurrentUser);
  const [isActive, setActive] = useState(false);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const handleToggle = () => setActive(!isActive);

  const { data: branchData } = useGetSingleBranchQuery(email);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isActive
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  // Close sidebar on route change
  useEffect(() => {
    if (isActive) {
      setActive(false);
    }
  }, [location]);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="text-gray-100 md:hidden absolute -top-[50px] z-10">
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#0e303b] w-[280px] space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full hidden md:flex -m-2 justify-center items-center mx-auto text-slate-300 text-2xl">
            <marquee className="font-semibold">
              {branchData?.data?.branchName || "Soft Bank BD"}
            </marquee>
          </div>

          {/* Conditionally Render Profile Info*/}
          <ProfileInfo></ProfileInfo>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Dashboard */}
              <NavLink to="dashboard-home">
                <div className="dropDownStyle ">
                  <div className="flex gap-5">
                    <IoIosSpeedometer className="w-5 h-5 text-slate-400" />
                    <p className="font-semibold uppercase">Dashboard</p>
                  </div>
                </div>
              </NavLink>

              {/* Home */}
              {role === "manager" && (
                <NavLink to="dashboard-home">
                  <div className="dropDownStyle ">
                    <div className="flex gap-5">
                      <IoIosSpeedometer className="w-5 h-5 text-slate-400" />
                      <p className="font-semibold">HOME</p>
                    </div>
                  </div>
                </NavLink>
              )}

              {/* Conditionally Render create Super admin */}
              <CreateSuperAdminSidebar></CreateSuperAdminSidebar>

              {/* Conditionally Render create admin */}
              <CreateAdminSidebar></CreateAdminSidebar>

              {/* Conditionally Render registered user */}
              <RegisteredUserSidebar></RegisteredUserSidebar>

              {/* Conditionally Render subscriber */}
              <SubscriberSidebar></SubscriberSidebar>

              {/* SMS */}
              <SmsSidebar></SmsSidebar>

              {/* Conditionally Render Video Tutorial */}
              <AddVideoTutorialSidebar></AddVideoTutorialSidebar>

              {/* Conditionally Render Sofiware Users */}
              <SoftwareUsersSidebar></SoftwareUsersSidebar>

              {/* Conditionally Render Register Package */}
              <RegisterPackage></RegisterPackage>

              {/* Conditionally Render article */}
              <AdArticleSidebar></AdArticleSidebar>

              {/* Conditionally Render Branch */}
              <BranchCreateSidebar></BranchCreateSidebar>

              {/* Conditionally Render when login as a branch */}
              <BranchProfile></BranchProfile>

              {/* Savings Dropdown Menu */}
              <SavingsSidebar></SavingsSidebar>

              {/* Loan Dropdown Menu */}
              <LoanSidebar></LoanSidebar>

              {/* Dps Dropdown Menu */}
              <DpsSidebar></DpsSidebar>

              {/* FDR Dropdown Menu */}
              <FdrSidebar></FdrSidebar>

              {/* Withdraw Dropdown Menu */}
              <WithdrawSidebar></WithdrawSidebar>

              {/* Stuff Dropdown Menu */}
              <StaffSidebar></StaffSidebar>

              {/* Company Sidebar */}
              <CompanySidebar></CompanySidebar>

              {/* Modal Button */}
              {role === "branch" && (
                <div className="modalButton">
                  <ModalComponents></ModalComponents>,
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
