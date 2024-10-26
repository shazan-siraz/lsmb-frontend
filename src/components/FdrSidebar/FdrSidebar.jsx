import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { LiaIconsSolid } from "react-icons/lia";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";
import { useState } from "react";

const FdrSidebar = () => {
  const { role } = useSelector(useCurrentUser);

  const [isFdrDropdownOpen, setFdrDropdownOpen] = useState(false);
  const fdrDropdown = () => setFdrDropdownOpen(!isFdrDropdownOpen);

  return (
    <div>
      {(!role === "superAdmin" || !role === "admin") && (
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
      )}
    </div>
  );
};

export default FdrSidebar;
