import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle, MdViewCompactAlt } from "react-icons/md";

const CompanySidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [company, setIsCompany] = useState(false);

  const companyDropdown = () => setIsCompany(!company);

  return (
    <div>
      {(role === "superAdmin") | (role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={companyDropdown}>
            <div className="flex items-center">
              <MdViewCompactAlt className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Company</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                company ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              company ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="create-company"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Create Company</span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              company ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="companyList"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Company List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySidebar;
