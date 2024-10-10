import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { LuPackagePlus } from "react-icons/lu";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";


const RegisterPackage = () => {
  const { role } = useSelector(useCurrentUser);
  const [isRegisterPackage, setIsRegisterPackage] = useState(false);

  const registerPackageDropdown = () =>
    setIsRegisterPackage(!isRegisterPackage);

  return (
    <div>
      {/* Conditionally Render Register Package */}
      {role === "superAdmin" ||
        (role === "admin" && (
          <div className="relative">
            <div className="dropDownStyle" onClick={registerPackageDropdown}>
              <div className="flex items-center">
                <LuPackagePlus className="text-[24px]" />
                <span className="mx-4 font-medium uppercase">
                  Register Package
                </span>
              </div>
              <TiChevronLeft
                className={`w-5 h-5 transition-transform duration-300 ${
                  isRegisterPackage ? "-rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isRegisterPackage ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="registerPackage-create"
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
                isRegisterPackage ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="registerPackage-list"
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
        ))}
    </div>
  );
};

export default RegisterPackage;
