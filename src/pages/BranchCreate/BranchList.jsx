import { useGetAllBranchQuery } from "../../redux/features/branch/branchApi";
import { FaEdit } from "react-icons/fa";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const BranchList = () => {
  const { email } = useSelector(useCurrentUser);
  const { data: branchData, isLoading: branchDataQueryLoading } =
    useGetAllBranchQuery(email);

  if (branchDataQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">
      <div className="bg-green-700">
        <h1 className="text-center font-bold text-[40px] mb-4 uppercase text-white">
          All Branch
        </h1>
      </div>

      <table className="w-[95%] mx-auto">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Branch ID</th>
            <th className="text-center">Branch Name</th>
            <th className="text-center">Branch Email</th>
            <th className="text-center">Branch Mobile</th>
            <th className="text-center">Branch Address</th>
            <th className="text-center">Registered Package</th>
            <th className="text-center">Branch Created</th>
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
              <td className="text-center">
                {" "}
                {item?.registeredPackage?.packageName}{" "}
              </td>
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
