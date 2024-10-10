import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { LuPackagePlus } from "react-icons/lu";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";

const BranchCreateSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [isBranchCreate, setIsBranchCreate] = useState(false);

  const branchCreateDropdown = () => setIsBranchCreate(!isBranchCreate);

  return (
    <div>
      {/* Conditionally Render Branch */}
      {role === "superAdmin" ||
        (role === "admin" && (
          <div className="relative">
            <div className="dropDownStyle" onClick={branchCreateDropdown}>
              <div className="flex items-center">
                <LuPackagePlus className="text-[24px]" />
                <span className="mx-4 font-medium uppercase">
                  Branch Create
                </span>
              </div>
              <TiChevronLeft
                className={`w-5 h-5 transition-transform duration-300 ${
                  isBranchCreate ? "-rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isBranchCreate ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="branch-create"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className="font-medium uppercase">Create Branch</span>
              </NavLink>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isBranchCreate ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="branch-list"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className="font-medium uppercase">Branch List</span>
              </NavLink>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BranchCreateSidebar;
