import { useGetAllRegisterPackageQuery } from "../../redux/features/registerPackage/registerPackage";
import { FaEdit } from "react-icons/fa";

const PackageList = () => {
  const { data: registerPackageData, isLoading: registerPackageLoading } =
    useGetAllRegisterPackageQuery();

  if (registerPackageLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">
      <table className="w-[95%] mx-auto">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Package ID</th>
            <th className="text-center">Package Name</th>
            <th className="text-center">Package Price</th>
            <th className="text-center">Member Limit</th>
            <th className="text-center">Branch Limit</th>
            <th className="text-center">User Limit</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {registerPackageData?.data?.map((item, index) => (
            <tr key={item._id}>
              <td className="text-center"> {index + 1} </td>
              <td className="text-center"> {item.packageId} </td>
              <td className="text-center"> {item.packageName} </td>
              <td className="text-center"> {item.packagePrice} </td>
              <td className="text-center"> {item.memberLimit} </td>
              <td className="text-center"> {item.branchLimit} </td>
              <td className="text-center"> {item.userLimit} </td>

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

export default PackageList;
