import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";

const BankingSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [bankingDropdown, setBankingDropdown] = useState(false);

  const bankDropdown = () => setBankingDropdown(!bankingDropdown);

  return (
    <div>
      {(role === "branch" || role === "manager") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={bankDropdown}>
            <div className="flex items-center">
              <AiFillBank className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Banking</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                bankingDropdown ? "-rotate-90" : ""
              }`}
            />
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              bankingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/bank-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Bank A/C</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              bankingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/bank-transaction"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Bank Transaction</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              bankingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/bank-txn-statement"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Bank Txn Statement</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              bankingDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/partial-income"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Partial Income</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankingSidebar;
