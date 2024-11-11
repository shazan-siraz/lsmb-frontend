import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { IoSaveSharp } from "react-icons/io5";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";
import { useState } from "react";

const CompanySidebar = () => {
  const { role } = useSelector(useCurrentUser);

  const [company, setCompany] = useState(false);
  const companyDropdown = () => setCompany(!company);

  return (
    <div>
      {role === "company" && (
        <div className="relative">
          <div className="dropDownStyle" onClick={companyDropdown}>
            <div className="flex items-center">
              <IoSaveSharp className="text-[22px] mr-4" />
              <span className="font-medium text-left uppercase">Branch</span>
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
              to="branch-create"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className=" font-medium uppercase">Branch Create</span>
            </NavLink>
            <NavLink
              to="branch-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Branch List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySidebar;
