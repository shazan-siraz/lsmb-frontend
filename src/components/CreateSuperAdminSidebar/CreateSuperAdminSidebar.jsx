import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdAdminPanelSettings, MdOutlineCircle } from "react-icons/md";

const CreateSuperAdminSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [isSuperAdminCreate, setIsSuperAdminCreate] = useState(false);

  const superAdminCreateDropdown = () =>
    setIsSuperAdminCreate(!isSuperAdminCreate);

  return (
    <div>
      {/* Conditionally Render Branch */}
      {role === "superAdmin" && (
        <div className="relative">
          <div className="dropDownStyle" onClick={superAdminCreateDropdown}>
            <div className="flex items-center">
              <MdAdminPanelSettings className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">
                Create Su. Admin
              </span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                isSuperAdminCreate ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isSuperAdminCreate ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="superAdmin-create"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Create Super Admin</span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isSuperAdminCreate ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="superAdmin-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Super Admin List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSuperAdminSidebar;
