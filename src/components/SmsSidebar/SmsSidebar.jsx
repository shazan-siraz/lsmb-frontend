import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle, MdSms } from "react-icons/md";

const SmsSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [smsCreate, setIsSmschCreate] = useState(false);

  const smsDropdown = () => setIsSmschCreate(!smsCreate);

  return (
    <div>
      {/* Conditionally Render SmsSidebar */}
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={smsDropdown}>
            <div className="flex items-center">
              <MdSms className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">SMS</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                smsCreate ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              smsCreate ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="sms"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Create Sms</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmsSidebar;
