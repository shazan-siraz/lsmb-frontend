import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { IoSaveSharp } from "react-icons/io5";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";
import { useState } from "react";

const DpsSidebar = () => {
  const { role } = useSelector(useCurrentUser);

  const [isDpsDropdownOpen, setDpsDropdownOpen] = useState(false);
  const dpsDropdown = () => setDpsDropdownOpen(!isDpsDropdownOpen);

  return (
    <div>
      {(!role === "superAdmin" || !role === "admin") && (
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
      )}
    </div>
  );
};

export default DpsSidebar;
