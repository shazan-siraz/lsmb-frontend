import { NavLink } from "react-router-dom";
import { useGetAllSuperAdminQuery } from "../../redux/features/superAdmin/superAdmin";
import { timeFormat } from "../../utils/timeFormat/timeFormat";

const SuperAdminList = () => {
  const { data: superAdminData, isLoading: superAdminQueryLoading } =
    useGetAllSuperAdminQuery();

  if (superAdminQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-8 py-5">
      <div className="flex justify-between items-center pb-5">
        <h2 className="font-semibold text-[20px] text-slate-700">
          Super Admin: {superAdminData?.data.length}
        </h2>
        <NavLink to="/dashboard/superAdmin-create">
          <button className="border border-slate-500 hover:bg-slate-500 px-5 py-2 font-semibold hover:text-white rounded transition-all duration-300 ease-in-out">
            Add Super Admin
          </button>
        </NavLink>
      </div>

      <div>
        <table className="max-w-full w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {superAdminData?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name.firstName + " " + item.name.lastName}</td>
                <td>{item.email}</td>
                <td>{item.contactNo}</td>
                <td>{item.gender}</td>
                <td>{item.presentAddress}</td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.isDeleted === false ? "Active" : "Disable"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminList;
