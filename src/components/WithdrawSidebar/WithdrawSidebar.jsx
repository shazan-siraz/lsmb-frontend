import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";
import { useState } from "react";

const WithdrawSidebar = () => {
  const { role } = useSelector(useCurrentUser);

  const [isWithdrawDropdownOpen, setWithdrawDropdownOpen] = useState(false);
  const withdrawDropdown = () =>
    setWithdrawDropdownOpen(!isWithdrawDropdownOpen);

  return (
    <div>
      {(!role === "superAdmin" || !role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={withdrawDropdown}>
            <div className="flex items-center">
              <BiMoneyWithdraw className="text-[26px] mr-3" />
              <span className="font-medium text-left">WITHDRAW</span>
            </div>

            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                isWithdrawDropdownOpen ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isWithdrawDropdownOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="pending-withdraw"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className=" font-medium">PENDING WITHDRAW</span>
            </NavLink>
            <NavLink
              to="withdraw"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">WITHDRAW</span>
            </NavLink>
            <NavLink
              to="all-withdraw"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">ALL WITHDRAW</span>
            </NavLink>
            <NavLink
              to="withdraw-report"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">WITHDRAW REPORT</span>
            </NavLink>
            <NavLink
              to="withdraw-statement"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium">WITHDRAW STATEMENT</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawSidebar;
