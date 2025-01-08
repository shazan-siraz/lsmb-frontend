import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";

const ExpenseSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [expenseDropdown, setExpenseDropdown] = useState(false);

  const expenseState = () => setExpenseDropdown(!expenseDropdown);

  return (
    <div>
      {(role === "branch" || role === "manager") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={expenseState}>
            <div className="flex items-center">
              <BsCashStack className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Expense</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                expenseDropdown ? "-rotate-90" : ""
              }`}
            />
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              expenseDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/expenseCategory"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Expense Category</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              expenseDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/branchExpense"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Branch Expense</span>
            </NavLink>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              expenseDropdown ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/expenseReport"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Expense Report</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSidebar;
