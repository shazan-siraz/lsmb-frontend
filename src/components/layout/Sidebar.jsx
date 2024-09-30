/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { FaWallet, FaSearch } from "react-icons/fa";
import { HiOutlineRefresh, HiUserGroup } from "react-icons/hi";
import { IoIosSpeedometer } from "react-icons/io";
import { TiChevronLeft } from "react-icons/ti";
import ModalComponents from "../../pages/Modal/ModalComponents";
import "./Sidebar.css";
import { BiSolidUserMinus, BiSolidUserPlus } from "react-icons/bi";
import { MdOutlineCircle } from "react-icons/md";
import { IoHome, IoSaveSharp } from "react-icons/io5";
import { LiaIconsSolid } from "react-icons/lia";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [isSavingsDropdownOpen, setSavingsDropdownOpen] = useState(false);
  const [isLoanDropdownOpen, setLoanDropdownOpen] = useState(false);
  const [isDpsDropdownOpen, setDpsDropdownOpen] = useState(false);
  const [isFdrDropdownOpen, setFdrDropdownOpen] = useState(false);
  const [isBranchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [isStaffDropdownOpen, setStaffDropdownOpen] = useState(false);
  const [isWithdrawDropdownOpen, setWithdrawDropdownOpen] = useState(false);

  const sidebarRef = useRef(null);
  const location = useLocation();

  const handleToggle = () => setActive(!isActive);
  const savingsDropdown = () => setSavingsDropdownOpen(!isSavingsDropdownOpen);
  const loanDropdown = () => setLoanDropdownOpen(!isLoanDropdownOpen);
  const dpsDropdown = () => setDpsDropdownOpen(!isDpsDropdownOpen);
  const fdrDropdown = () => setFdrDropdownOpen(!isFdrDropdownOpen);
  const branchDropdown = () => setBranchDropdownOpen(!isBranchDropdownOpen);
  const staffDropdown = () => setStaffDropdownOpen(!isStaffDropdownOpen);
  const withdrawDropdown = () => setWithdrawDropdownOpen(!isWithdrawDropdownOpen);

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
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#0b3442] w-[250px] space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full hidden md:flex -m-2 justify-center items-center mx-auto text-slate-300 text-2xl">
              <marquee className="font-semibold">LSMB</marquee>
            </div>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <div className="text-white flex justify-center items-center gap-5 border rounded">
                <div className="border px-6 rounded py-2">
                  <FaWallet />
                </div>
                <div>
                  <h2>451254</h2>
                </div>
                <div className="border px-6 rounded py-2">
                  <HiOutlineRefresh />
                </div>
              </div>
              <div className="text-white flex justify-center items-center gap-5 border rounded mt-3">
                <div className="border px-6 rounded py-2">
                  <FcBusinessman />
                </div>
                <div>
                  <h2>451254</h2>
                </div>
                <div className="border px-6 rounded py-2">
                  <FaSearch />
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Dashboard */}
              <div className="inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800 gap-2">
                <IoIosSpeedometer className="w-5 h-5 text-slate-400" />
                <Link className="text-slate-400 font-bold">Dashboard</Link>
              </div>

              <div className="dropDownStyle">
                <IoIosSpeedometer className="w-5 h-5 text-slate-400" />
                <NavLink to="home">HOME</NavLink>
              </div>

              {/* Branch Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={branchDropdown}>
                  <div className="flex items-center">
                    <IoHome className="text-[24px]" />
                    <span className="mx-4 font-medium">BRANCH</span>
                  </div>
                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isBranchDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isBranchDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="group-list"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">GROUP LIST</span>
                  </NavLink>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isBranchDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="all-members"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">MEMBERSHIP</span>
                  </NavLink>
                </div>
              </div>

              {/* Savings Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={savingsDropdown}>
                  <div className="flex items-center">
                    <BiSolidUserPlus className="text-[28px] mr-3" />
                    <span className="font-medium">SAVINGS</span>
                  </div>
                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isSavingsDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isSavingsDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="savings-account"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">SAVINGS ACCOUNT</span>
                  </NavLink>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isSavingsDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="savings-statement"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">SAVINGS STATEMENT</span>
                  </NavLink>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isSavingsDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="savings-report"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">SAVINGS REPORT</span>
                  </NavLink>
                </div>
              </div>

              {/* Loan Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={loanDropdown}>
                  <div className="flex items-center">
                    <BiSolidUserMinus className="iconStyle" />
                    <span className="font-medium text-left">LOAN</span>
                  </div>

                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isLoanDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isLoanDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="loan-request"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className=" font-medium">LOAN REQUEST</span>
                  </NavLink>
                  <NavLink
                    to="active-loan"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">ACTIVE LOAN</span>
                  </NavLink>
                  <NavLink
                    to="overdue-loan"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">OVERDUE LOAN</span>
                  </NavLink>
                </div>
              </div>

              {/* Dps Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={dpsDropdown}>
                  <div className="flex items-center">
                    <IoSaveSharp className="text-[22px] mr-4" />
                    <span className="font-medium text-left">DPS</span>
                  </div>

                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isDpsDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isDpsDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="active-dps"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className=" font-medium">ACTIVE DPS</span>
                  </NavLink>
                  <NavLink
                    to="maturity-dps"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">MATURITY DPS</span>
                  </NavLink>
                </div>
              </div>

              {/* FDR Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={fdrDropdown}>
                  <div className="flex items-center">
                    <LiaIconsSolid className="text-[26px] mr-3" />
                    <span className="font-medium text-left">FDR</span>
                  </div>

                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isFdrDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isFdrDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="active-fdr"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className=" font-medium">ACTIVE FDR</span>
                  </NavLink>
                  <NavLink
                    to="maturity-fdr"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">MATURITY FDR</span>
                  </NavLink>
                </div>
              </div>

              {/* Withdraw Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={withdrawDropdown}>
                  <div className="flex items-center">
                    <LiaIconsSolid className="text-[26px] mr-3" />
                    <span className="font-medium text-left">WITHDRAW</span>
                  </div>

                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isWithdrawDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isWithdrawDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="pending-withdraw"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className=" font-medium">PENDING WITHDRAW</span>
                  </NavLink>
                  <NavLink
                    to="withdraw"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">WITHDRAW</span>
                  </NavLink>
                  <NavLink
                    to="all-withdraw"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">ALL WITHDRAW</span>
                  </NavLink>
                  <NavLink
                    to="withdraw-report"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">WITHDRAW REPORT</span>
                  </NavLink>
                  <NavLink
                    to="withdraw-statement"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">WITHDRAW STATEMENT</span>
                  </NavLink>
                </div>
              </div>

              {/* Stuff Dropdown Menu */}
              <div className="relative">
                <div className="dropDownStyle" onClick={staffDropdown}>
                  <div className="flex items-center">
                    <HiUserGroup className="text-[24px]" />
                    <span className="mx-4 font-medium">STAFF</span>
                  </div>
                  <TiChevronLeft
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isStaffDropdownOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isStaffDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="employee-list"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">EMPLOYEE LIST</span>
                  </NavLink>
                  <NavLink
                    to="loan-request"
                    className={({ isActive }) =>
                      `dropDownListStyle ${
                        isActive ? "activeColor" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineCircle className="iconListStyle" />
                    <span className="font-medium">PAYROLL</span>
                  </NavLink>
                </div>
              </div>

              {/* Modal Button */}
              <div className="modalButton">
                <ModalComponents></ModalComponents>,
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
