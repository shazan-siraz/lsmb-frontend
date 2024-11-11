import { useGetAllBranchQuery } from "../../redux/features/branch/branchApi";
import { FaEdit } from "react-icons/fa";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/user/user";
import CompanyApprovedMessage from "../CompanyApprovedMessage/CompanyApprovedMessage";

const BranchList = () => {
  const { email } = useSelector(useCurrentUser);
  const { data: branchData, isLoading: branchDataQueryLoading } =
    useGetAllBranchQuery(email);

  const { data: singleUserData, isLoading: userQueryLoading } =
    useGetSingleUserQuery(email);

  if (branchDataQueryLoading || userQueryLoading) {
    return <p>Loading...</p>;
  }

  if (singleUserData?.data.status === "pending") {
    return <CompanyApprovedMessage></CompanyApprovedMessage>;
  }

  return (
    <div className="px-10 py-2">
      <div>
        <h1 className="text-center font-bold text-[35px] mb-2 uppercase">
          All Branch
        </h1>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Branch Name</th>
            <th className="text-center">Branch Email</th>
            <th className="text-center">Branch Mobile</th>
            <th className="text-center">Branch Address</th>
            <th className="text-center">Company Email</th>
            <th className="text-center">Created At</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {branchData?.data?.map((item, index) => (
            <tr key={item._id}>
              <td className="text-center"> {index + 1} </td>
              <td className="text-center"> {item?.branchName} </td>
              <td className="text-center"> {item?.branchEmail} </td>
              <td className="text-center"> {item?.branchMobile} </td>
              <td className="text-center"> {item?.branchAddress} </td>
              <td className="text-center"> {item?.companyEmail} </td>
              <td className="text-center"> {timeFormat(item?.createdAt)} </td>
              <td className="text-center">
                <div className="flex justify-center items-center">
                  <FaEdit />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;
