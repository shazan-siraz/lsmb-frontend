import { useState } from "react";
import { BiSolidUserMinus } from "react-icons/bi";
import { MdOutlineCircle } from "react-icons/md";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const LoanSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [isLoanDropdownOpen, setLoanDropdownOpen] = useState(false);
  const loanDropdown = () => setLoanDropdownOpen(!isLoanDropdownOpen);

  return (
    <div>
      {role === "branch" && (
        <div>
          <div className="relative">
            <div className="dropDownStyle" onClick={loanDropdown}>
              <div className="flex items-center">
                <BiSolidUserMinus className="iconStyle" />
                <span className="font-medium text-left">LOAN</span>
              </div>

              <TiChevronLeft
                className={`w-5 h-5 transition-transform duration-300 ${
                  isLoanDropdownOpen ? "-rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isLoanDropdownOpen ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavLink
                to="loan-request"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className=" font-medium">LOAN REQUEST</span>
              </NavLink>
              <NavLink
                to="active-loan"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className="font-medium">ACTIVE LOAN</span>
              </NavLink>
              <NavLink
                to="overdue-loan"
                className={({ isActive }) =>
                  `dropDownListStyle ${
                    isActive ? "activeColor" : "text-gray-600"
                  }`
                }
              >
                <MdOutlineCircle className="iconListStyle" />
                <span className="font-medium">OVERDUE LOAN</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanSidebar;
