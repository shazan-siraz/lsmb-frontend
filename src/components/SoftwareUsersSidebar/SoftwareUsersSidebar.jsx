import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const SoftwareUsersSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [softwareUsers, setSoftwareUsers] = useState(false);

  const softwareUsersDropdownOpen = () => setSoftwareUsers(!softwareUsers);

  return (
    <div>
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={softwareUsersDropdownOpen}>
            <div className="flex items-center">
              <FaUsers className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Software Users</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                softwareUsers ? "-rotate-90" : ""
              }`}
            />
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              softwareUsers ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="added-softwareUsers"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">
                Added Software Users
              </span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              softwareUsers ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="softwareUsersList"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Software Users List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareUsersSidebar;
