import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { FaPersonBooth } from "react-icons/fa";

const BoothSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [savingDropdown, setSavingDropdown] = useState(false);

  const boothDropdown = () => setSavingDropdown(!savingDropdown);

  return (
    <div>
      {(role === "branch" || role === "manager") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={boothDropdown}>
            <div className="flex items-center">
              <FaPersonBooth className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Booth</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                savingDropdown ? "-rotate-90" : ""
              }`}
            />
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              savingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/saving-transaction"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Saving Collection</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              savingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/loan-transaction"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Loan Collection</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              savingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/dps-collection"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">DPS Collection</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              savingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/today-collection"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Today Transction</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoothSidebar;
