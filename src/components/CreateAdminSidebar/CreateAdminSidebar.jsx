import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { LuPackagePlus } from "react-icons/lu";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";

const CreateAdminSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [isAdminCreate, setIsAdminCreate] = useState(false);

  const adminCreateDropdown = () => setIsAdminCreate(!isAdminCreate);

  return (
    <div>
      {/* Conditionally Render Branch */}
      {role === "superAdmin" ||
        (role === "admin" && (
          <div className="relative">
            <div className="dropDownStyle" onClick={adminCreateDropdown}>
              <div className="flex items-center">
                <LuPackagePlus className="text-[24px]" />
                <span className="mx-4 font-medium uppercase">
                  Create Admin
                </span>
              </div>
              <TiChevronLeft
                className={`w-5 h-5 transition-transform duration-300 ${
                    isAdminCreate ? "-rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isAdminCreate ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="admin-create"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className="font-medium uppercase">Create Admin</span>
              </NavLink>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isAdminCreate ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="admin-list"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className="font-medium uppercase">Admin List</span>
              </NavLink>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CreateAdminSidebar;
