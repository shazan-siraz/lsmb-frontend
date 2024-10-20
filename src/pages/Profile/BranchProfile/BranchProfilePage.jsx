import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSingleBranchQuery } from "../../../redux/features/branch/branchApi";
import defaultProfileImg from "../../../assets/icons/userProfile.png";

const BranchProfilePage = () => {
  const { email } = useSelector(useCurrentUser);

  const { data: branchData, isLoading: branchQueryLoading } =
    useGetSingleBranchQuery(email);

  if (branchQueryLoading) {
    return <p>Loading...</p>;
  }

  const { branchEmail, branchName, branchMobile, branchAddress } =
    branchData.data;

  return (
    <div className="pt-20">
      <div className="bg-white max-w-[1000px] rounded-xl mx-auto flex justify-evenly py-20">
        <div>
          <img
            className="w-[100px] mx-auto py-5"
            src={defaultProfileImg}
            alt="Profile Image"
          />
          <p className="font-bold text-[30px] py-2 border-b-2 text-slate-500">
            {branchName}
          </p>
          <p className="text-[20px] font-semibold py-2">
            {branchEmail}
          </p>
        </div>

        <div className="border-r-2"></div>

        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-[30px] border-b-2 py-3 text-slate-500">
            Your Profile
          </h2>
          <p className="text-[20px] font-semibold py-4 border-b-2">
            Name: {branchName}
          </p>
          <p className="text-[20px] font-semibold py-4 border-b-2 ">
            Mobile: {branchMobile}
          </p>
          <p className="text-[20px] font-semibold py-4">
            Address: {branchAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BranchProfilePage;
