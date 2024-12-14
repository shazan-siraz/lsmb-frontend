import { NavLink } from "react-router-dom";
import { useGetAllDpsQuery } from "../../redux/features/dps/dpsApi";
import { FaEdit } from "react-icons/fa";

const ActiveDps = () => {
  const { data: dpsData, isLoading: dpsDataQueryLoading } = useGetAllDpsQuery();

  if (dpsDataQueryLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-5 py-2">
          <h1>Active DPS List</h1>
          <button>
            <NavLink
              to="/dashboard/dps-create"
              className="border-2 border-slate-300 px-3 py-1 rounded hover:bg-slate-500 hover:text-white font-semibold transition-all duration-300 ease-in-out"
            >
              Add New DPS
            </NavLink>
          </button>
        </div>
        <div className="border-b my-1"></div>

        <div className="px-5">
          <table className="employeeTable">
            <thead className="bg-slate-600 text-white uppercase">
              <tr>
                <th>SL</th>
                <th>Member Name</th>
                <th>Member Id</th>
                <th>A/C No</th>
                <th>Start</th>
                <th>Installment</th>
                <th>Percentage</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dpsData?.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1} </td>
                  <td>
                    <NavLink
                      target="_blank"
                      to={`/dashboard/single-member/${item.memberOfApplying?._id}`}
                      className="border border-lime-900 px-4 py-1 rounded-md hover:bg-slate-800 hover:text-white"
                    >
                      <button>{item.memberOfApplying?.memberName}</button>
                    </NavLink>
                  </td>

                  <td>{item.memberOfApplying.memberId}</td>
                  <td>{item.dpsAcNo}</td>
                  <td>{item.dpsStart}</td>
                  <td>{item.installmentType}</td>
                  <td>{item.returnInterest}</td>
                  <td>{item.durationOfYear} Year</td>
                  <td className="">
                    <div className="flex justify-center items-center">
                      <FaEdit />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveDps;
