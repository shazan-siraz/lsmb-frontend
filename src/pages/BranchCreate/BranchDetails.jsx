import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";

const BranchDetails = () => {
  const { email } = useSelector(useCurrentUser);
  const { data: branchData, isLoading: branchQueryLoading } =
    useGetSingleBranchQuery(email);

  if (branchQueryLoading) {
    return <p>Loading...</p>;
  }

  const { branchId, branchEmail, branchMobile, branchAddress, branchName } =
    branchData.data;

  return (
    <div className="pt-[50px]">
      <div className="max-w-[500px] mx-auto border border-blue-600 rounded-lg shadow-xl">
        <h1 className="font-bold text-[35px] text-center bg-gray-600 text-white py-1">
          {" "}
          {branchName}
        </h1>

        <div className="flex justify-between items-center px-5 font-semibold text-[20px] border-b py-5 border-gray-500">
          <p>Branch Id</p>
          <p>{branchId}</p>
        </div>

        <div className="flex justify-between items-center px-5 font-semibold text-[20px] border-b py-5 border-gray-500">
          <p>Branch Email</p>
          <p>{branchEmail}</p>
        </div>

        <div className="flex justify-between items-center px-5 font-semibold text-[20px] border-b py-5 border-gray-500">
          <p>Branch Mobile</p>
          <p>{branchMobile}</p>
        </div>

        <div className="flex justify-between items-center px-5 font-semibold text-[20px] py-5 border-gray-500">
          <p>Address</p>
          <p>{branchAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default BranchDetails;
