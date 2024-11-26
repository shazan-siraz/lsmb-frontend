import { FaSearch, FaWallet } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { HiOutlineRefresh } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useBranchWallet } from "../../hooks/useBranchWallet";

const ProfileInfo = () => {
  const { role } = useSelector(useCurrentUser);
  const {branchWallet} = useBranchWallet();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      {(role === "branch" ||
        role === "manager" ||
        role === "accountant" ||
        role === "fieldOfficer") && (
        <div className="flex flex-col items-center mt-4 gap-2">
          <div className="text-white flex justify-between items-center gap-5 border border-gray-400 rounded w-[90%]">
            <div
              className="border border-gray-400 px-3 text-[18px] rounded py-2"
              title="BRANCH WALLET"
            >
              <FaWallet />
            </div>
            <div>
              <h2 className="font-semibold text-[18px]">
                {branchWallet || 0}
              </h2>
            </div>
            <div
              onClick={() => handleRefresh()}
              className="border border-gray-400 px-3 rounded py-2 cursor-pointer text-[20px]"
              title="Refresh"
            >
              <HiOutlineRefresh />
            </div>
          </div>
          <div className="text-white flex justify-between items-center gap-5 border border-gray-400 rounded w-[90%]">
            <div className="border px-3 rounded py-2">
              <FcBusinessman />
            </div>
            <div>MID</div>
            <div className="border px-3 rounded py-2 ">
              <FaSearch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
