import './Header.css'
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/auth/authSlice";
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { useState } from 'react';
import profileImg from '../../assets/icons/userProfile.png'

const Header = () => {
  const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleProfileBox = () => {
    setIsProfileBoxOpen(!isProfileBoxOpen)
  }

  return (
    <div>
      <div className="bg-[#092e3a] text-center py-2 px-10 text-white w-full top-0 fixed left-0 flex justify-between">

        <div className="flex gap-2 md:ml-[250px]">
          <p className="header-btn transition-all duration-300 ease-in-out">Transaction</p>
          <p className="header-btn transition-all duration-300 ease-in-out">Savings TXN</p>
          <p className="header-btn transition-all duration-300 ease-in-out">Loan TXN</p>
          <p className="header-btn transition-all duration-300 ease-in-out">DPS TXN</p>
          <p className="header-btn transition-all duration-300 ease-in-out">Today TXN</p>
        </div>

        <div onClick={handleProfileBox} className='flex justify-center items-center'>
          <button>
            <img className='w-[22px]' src={profileImg} alt="profile Image" />
          </button>
        </div>
      </div>

      {isProfileBoxOpen && (

        <div className='profile-box'>
          <div className='flex flex-col gap-3'>
            <NavLink>
              <div className='flex items-center gap-3'>
                <FaUser />
                <p>My Profile</p>
              </div>
            </NavLink>
            <div className='border-b'></div>
            <NavLink>
              <div className='flex items-center gap-3'>
                <RiLockPasswordLine />
                <p>Change Password</p>
              </div>
            </NavLink>
            <div className='border-b'></div>

            <div onClick={handleLogOut} className='flex items-center gap-3 cursor-pointer'>
              <IoLogOut />
              <p>Log Out</p>
            </div>

          </div>
        </div>
      )
      }


    </div>
  );
};

export default Header;
