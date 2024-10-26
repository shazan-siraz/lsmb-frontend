import { NavLink } from "react-router-dom";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import {
  useDeleteSoftwareUsersMutation,
  useGetAllSoftwareUsersQuery,
} from "../../redux/features/softwareUsers/softwareUsers";

const SoftwareUsersList = () => {
  const { data: softwareUserData, isLoading: softwareUserDataLoading } =
    useGetAllSoftwareUsersQuery();

  const [deleteSoftwareUsers] = useDeleteSoftwareUsersMutation();

  if (softwareUserDataLoading) {
    return <p>Loading...</p>;
  }

  const handleDeleteSoftwareUsers = async (id) => {
    const res = await deleteSoftwareUsers(id);
    if (res?.data) {
      toast.success("Software User is Deleted Successfully");
    }
  };

  return (
    <div className="py-3 px-10">
      <ToastContainer></ToastContainer>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">
          Software Users: {softwareUserData?.data?.length}
        </h1>
        <NavLink
          to="/dashboard/added-softwareUsers"
          className="border border-slate-500 text-slate-600 hover:bg-slate-500 px-5 py-2 hover:text-white font-semibold rounded transition-all duration-300 ease-in-out"
        >
          Added Software Users
        </NavLink>
      </div>

      <div className="my-5">
        <table className="w-full">
          <thead className="bg-slate-500 text-white">
            <tr className="">
              <th>#</th>
              <th>Software Users Logo</th>
              <th>Software Users Name</th>
              <th>Software Users Address</th>
              <th>Uploaded At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {softwareUserData?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-[50px]"
                    src={item.softwareUsersLogo}
                    alt=""
                  />
                </td>
                <td>{item.softwareUsersName}</td>
                <td>{item.softwareUsersAddress}</td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.status}</td>
                <td onClick={() => handleDeleteSoftwareUsers(item._id)}>
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

export default SoftwareUsersList;
