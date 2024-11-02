import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";

const BranchProfile = () => {
  const { email, role } = useSelector(useCurrentUser);
  const [isBranchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const branchDropdown = () => setBranchDropdownOpen(!isBranchDropdownOpen);

  return (
    <div>
      {role === "branch" && (
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
              to={`branch-details/${email}`}
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">BRANCH DETAILS</span>
            </NavLink>
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
      )}
    </div>
  );
};

export default BranchProfile;
