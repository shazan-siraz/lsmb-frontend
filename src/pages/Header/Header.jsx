import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut, useCurrentUser } from "../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/icons/userProfile.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { role } = useSelector(useCurrentUser);
  const navigate = useNavigate();
  const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
  const profileBoxRef = useRef(null); // Create a ref for the profile box
  const buttonRef = useRef(null); // Create a ref for the button
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleProfileBox = () => {
    setIsProfileBoxOpen(!isProfileBoxOpen);
  };

  const handleNavigation = () => {
    if (role === "superAdmin") {
      navigate("/dashboard/superAdmin-profile");
    } else if (role === "admin") {
      navigate("/dashboard/admin-profile");
    } else if (role === "manager") {
      navigate("/dashboard/branch-profile");
    }
  };


   // Use effect to detect clicks outside the profile box
   useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the profile box and the button
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsProfileBoxOpen(false); // Close the profile box if click is outside
      }
    };

    if (isProfileBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileBoxOpen]);



  return (
    <div>
      <div className="bg-[#092e3a] text-center py-2 px-10 text-white w-full top-0 fixed left-0 flex justify-between">
        <div className="flex gap-2 md:ml-[250px]">
          <p className="header-btn transition-all duration-300 ease-in-out">
            Transaction
          </p>
          <p className="header-btn transition-all duration-300 ease-in-out">
            Savings TXN
          </p>
          <p className="header-btn transition-all duration-300 ease-in-out">
            Loan TXN
          </p>
          <p className="header-btn transition-all duration-300 ease-in-out">
            DPS TXN
          </p>
          <p className="header-btn transition-all duration-300 ease-in-out">
            Today TXN
          </p>
        </div>

        <div
        ref={buttonRef} // Attach the ref to the button div
        onClick={handleProfileBox}
        className="flex justify-center items-center"
      >
        <button>
          <img className="w-[30px]" src={profileImg} alt="Profile Image" />
        </button>
      </div>
      </div>

      {isProfileBoxOpen && (
        <div ref={profileBoxRef} className="profile-box">
          <div className="flex flex-col gap-3">
            <div onClick={handleNavigation} className="flex items-center gap-3 cursor-pointer">
              <FaUser />
              <p>My Profile</p>
            </div>

            <div className="border-b"></div>
            <NavLink to="/dashboard/changePassword">
              <div className="flex items-center gap-3">
                <RiLockPasswordLine />
                <p>Change Password</p>
              </div>
            </NavLink>
            <div className="border-b"></div>

            <div onClick={handleLogOut} className="flex items-center gap-3 cursor-pointer">
              <IoLogOut />
              <p>Log Out</p>
            </div>
          </div>
        </div>
      )}
  


    </div>
  );
};

export default Header;
