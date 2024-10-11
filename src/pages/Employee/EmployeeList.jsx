import { NavLink } from "react-router-dom";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import "./EmployeeList.css";

const EmployeeList = () => {
  const { data, isLoading } = useGetAllEmployeeQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-2">
        <h1>Employee List</h1>
        <button>
          <NavLink to="/dashboard/addnew-employee">Add New Employee</NavLink>,
        </button>
      </div>
      <div className="border-b my-2"></div>

      <div className="p-5">
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item.employeeName}</td>
                <td>{item.employeeId}</td>
                <td>{item.userId.role}</td>
                <td>{item.phoneNo}</td>
                <td>{item.joiningDate}</td>
                <td>{item.fatherName}</td>
                <td>{item.employeeType}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
