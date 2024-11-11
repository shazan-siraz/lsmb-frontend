import { NavLink } from "react-router-dom";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import "./EmployeeList.css";
import { useState } from "react";
import { useBlockedUserStatusMutation } from "../../redux/features/user/user";
import { toast, ToastContainer } from "react-toastify";

const EmployeeList = () => {
  const { data, isLoading } = useGetAllEmployeeQuery(undefined);
  const [loadingRow, setLoadingRow] = useState(null); // Track the loading row

  const [blockUserStatus] = useBlockedUserStatusMutation();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleBlockedStatus = async (email, rowId) => {
    setLoadingRow(rowId); // Set the loading row ID
    try {
      const res = await blockUserStatus({ email });
      if (res?.data) {
        toast.success("Status Updated!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoadingRow(null); // Reset the loading row ID
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-2">
        <h1>Employee List</h1>
        <button className="border border-slate-500 hover:bg-slate-500 px-4 py-1 rounded hover:text-white font-semibold transition-all duration-300 ease-in-out">
          <NavLink to="/dashboard/addnew-employee">Add New Employee</NavLink>
        </button>
      </div>
      <div className="border-b my-2"></div>

      <div className="p-5">
        <ToastContainer />
        <table className="employeeTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Father</th>
              <th>Employee Type</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item) => (
              <tr key={item._id}>
                <td>{item.employeeId}</td>
                <td>{item.employeeName}</td>
                <td>{item.employeeEmail}</td>
                <td>{item.userId.role}</td>
                <td>{item.phoneNo}</td>
                <td>{item.joiningDate}</td>
                <td>{item.fatherName}</td>
                <td>{item.employeeType}</td>
                <td>{item.userId.status}</td>
                <td>
                  <div
                    className={`flex justify-center items-center flex-col ${
                      loadingRow === item._id
                        ? "bg-gray-400"
                        : "hover:bg-slate-600 bg-slate-500"
                    } cursor-pointer px-2 font-semibold text-white rounded`}
                    onClick={
                      loadingRow !== item._id
                        ? () =>
                            handleBlockedStatus(item.employeeEmail, item._id)
                        : undefined
                    }
                  >
                    {/* {loadingRow === item._id ? "Loading" : "Active"} */}
                    {item.userId.status === "in-progress"
                      ? "Blocked"
                      : item.userId.status === "blocked"
                      ? "Active"
                      : ""}
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

export default EmployeeList;
