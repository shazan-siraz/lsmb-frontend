import { useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { BiSolidUserPlus } from "react-icons/bi";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";

const SavingsSidebar = () => {
  const { role } = useSelector(useCurrentUser);

  const [isSavingsDropdownOpen, setSavingsDropdownOpen] = useState(false);
  const savingsDropdown = () => setSavingsDropdownOpen(!isSavingsDropdownOpen);

  return (
    <div>
      {role === "branch" && (
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
      )}
    </div>
  );
};

export default SavingsSidebar;
