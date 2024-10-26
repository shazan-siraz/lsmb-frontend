import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { FaVideo } from "react-icons/fa";

const AddVideoTutorialSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [videoTutorialOpen, setVideoTutorialOpen] = useState(false);

  const videoTutorialDropdown = () => setVideoTutorialOpen(!videoTutorialOpen);

  return (
    <div>
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={videoTutorialDropdown}>
            <div className="flex items-center">
              <FaVideo className="text-[24px]" />
              <span className="mx-4 font-medium">Video Tutorial</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                videoTutorialOpen ? "-rotate-90" : ""
              }`}
            />
          </div>
          
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              videoTutorialOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="added-addvideotutorial"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Added Video Tutorial</span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              videoTutorialOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="addvideotutorial-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Video Tutorial List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVideoTutorialSidebar;
