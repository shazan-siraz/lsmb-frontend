import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <div className="bg-[#092e3a] text-center py-4 text-white w-full top-0 fixed left-0 flex justify-around">
        <h2>This is Header</h2>
        <div onClick={handleLogOut}>
          <button>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
