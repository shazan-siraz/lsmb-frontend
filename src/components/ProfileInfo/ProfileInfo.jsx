import { FaSearch, FaWallet } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { HiOutlineRefresh } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const ProfileInfo = () => {
  const { role } = useSelector(useCurrentUser);

  return (
    <div>
      {role === "manager" && (
        <div className="flex flex-col items-center mt-6 -mx-2">
          <div className="text-white flex justify-center items-center gap-5 border rounded">
            <div className="border px-6 rounded py-2">
              <FaWallet />
            </div>
            <div>
              <h2>000000</h2>
            </div>
            <div className="border px-6 rounded py-2">
              <HiOutlineRefresh />
            </div>
          </div>
          <div className="text-white flex justify-center items-center gap-5 border rounded mt-3">
            <div className="border px-6 rounded py-2">
              <FcBusinessman />
            </div>
            <div>
              <h2>000000</h2>
            </div>
            <div className="border px-6 rounded py-2">
              <FaSearch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
