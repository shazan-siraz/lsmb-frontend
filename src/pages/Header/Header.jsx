import './Header.css'
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

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

        <div onClick={handleLogOut}>
          <button>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
