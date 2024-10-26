import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { MdOutlineCircle } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";

const SubscriberSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [subscriber, setIsSubscriber] = useState(false);

  const subscriberDropdown = () => setIsSubscriber(!subscriber);

  return (
    <div>
      {/* Conditionally Render SubscriberSidebar */}
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={subscriberDropdown}>
            <div className="flex items-center">
              <MdOutlineSubscriptions className="text-[24px]" />
              <span className="mx-4 font-medium uppercase">Subscriber</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                subscriber ? "-rotate-90" : ""
              }`}
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              subscriber ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="create-subscriber"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Create Subscriber</span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              subscriber ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="subscriberList"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Subscriber List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriberSidebar;
