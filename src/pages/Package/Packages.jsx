import { NavLink } from "react-router-dom";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { useGetAllPackageQuery } from "../../redux/features/package/packageApi";

const Packages = () => {
  const { data: packageData, isLoading: packageLoading } =
    useGetAllPackageQuery();

  if (packageLoading) {
    return <p>Loading...</p>;
  }

//   const handleDeleteRegisterPackage = async (id) => {
//     const res = await deleteRegisterPackage(id);
//     if (res?.data) {
//       toast.success("Register Package is Deleted Successfully");
//     }
//   };

  return (
    <div className="py-3 px-10">
      <ToastContainer></ToastContainer>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">
          Package List: {packageData?.data?.length}
        </h1>
        <NavLink
          to="/dashboard/registerPackage-create"
          className="border border-slate-500 text-slate-600 hover:bg-slate-500 px-5 py-2 hover:text-white font-semibold rounded transition-all duration-300 ease-in-out"
        >
          Added Register Package
        </NavLink>
      </div>

      <div className="my-5">
        <table className="w-full">
          <thead className="bg-slate-500 text-white">
            <tr className="">
              <th>#</th>
              <th>Package Name</th>
              <th>Package Price</th>
              <th>Member Limit</th>
              <th>User Limit</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packageData?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.packageName}</td>
                <td>{item.packagePrice}</td>
                <td>{item.memberLimit}</td>
                <td>{item.userLimit}</td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.status}</td>
                <td>
                  <div className="flex justify-center items-center text-[20px] border border-red-500 py-1 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <RiDeleteBin6Fill />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Packages;
