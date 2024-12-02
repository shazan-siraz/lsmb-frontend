import { useState } from "react";
import { LuPackagePlus } from "react-icons/lu";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const PackageSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [isPackage, setIsPackage] = useState(false);

  const packageDropdown = () => setIsPackage(!isPackage);

  return (
    <div>
      {/* Conditionally Render Register Package */}
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={packageDropdown}>
            <div className="flex items-center">
              <LuPackagePlus className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">
                Package
              </span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                isPackage ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isPackage ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="package-create"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Create Package</span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isPackage ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="packages"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Package List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageSidebar;
