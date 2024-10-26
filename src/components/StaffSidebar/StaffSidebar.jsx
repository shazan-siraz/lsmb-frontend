import { HiUserGroup } from "react-icons/hi";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { useState } from "react";

const StaffSidebar = () => {
  const { role } = useSelector(useCurrentUser);

  const [isStaffDropdownOpen, setStaffDropdownOpen] = useState(false);
  const staffDropdown = () => setStaffDropdownOpen(!isStaffDropdownOpen);

  return (
    <div>
      {(!role === "superAdmin" || !role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={staffDropdown}>
            <div className="flex items-center">
              <HiUserGroup className="text-[24px]" />
              <span className="mx-4 font-medium">STAFF</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                isStaffDropdownOpen ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isStaffDropdownOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="employee-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">EMPLOYEE LIST</span>
            </NavLink>
            <NavLink
              to="loan-request"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">PAYROLL</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffSidebar;
