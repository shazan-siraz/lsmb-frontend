import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineCircle } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";

const AdArticleSidebar = () => {
  const { role } = useSelector(useCurrentUser);
  const [articleState, setArticleState] = useState(false);

  const articleDropdown = () => setArticleState(!articleState);

  return (
    <div>
      {(role === "superAdmin" || role === "admin") && (
        <div className="relative">
          <div className="dropDownStyle" onClick={articleDropdown}>
            <div className="flex items-center">
          
              <RiArticleFill className="text-[24px]"/>
              <span className="mx-4 font-medium uppercase">Article</span>
            </div>
            <TiChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                articleState ? "-rotate-90" : ""
              }`}
            />
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              articleState ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="/dashboard/tinymceEditor"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Added Article</span>
            </NavLink>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              articleState ? "max-h-screen" : "max-h-0"
            }`}
          >
            <NavLink
              to="article-list"
              className={({ isActive }) =>
                `dropDownListStyle ${
                  isActive ? "activeColor" : "text-gray-600"
                }`
              }
            >
              <MdOutlineCircle className="iconListStyle" />
              <span className="font-medium uppercase">Article List</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdArticleSidebar;
