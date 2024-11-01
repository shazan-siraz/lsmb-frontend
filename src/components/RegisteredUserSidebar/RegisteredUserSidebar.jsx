import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle, MdViewCompactAlt } from "react-icons/md";

const RegisteredUserSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [registeredUser, setRegisteredUser] = useState(false);

  const registeredUserDropdown = () => setRegisteredUser(!registeredUser);

  return (
    <div>
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={registeredUserDropdown}>
            <div className="flex items-center">
              <MdViewCompactAlt className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Registered User</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                registeredUser ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              registeredUser ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="registeredUser-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Registered User List</span>
            </NavLink>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default RegisteredUserSidebar;
