import { NavLink } from "react-router-dom";
import { useGetAllDpsQuery } from "../../redux/features/dps/dpsApi";

const ActiveDps = () => {
  const { data: dpsData, isLoading: dpsDataQueryLoading } = useGetAllDpsQuery();

  if (dpsDataQueryLoading) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-5 py-2">
          <h1>Active DPS List</h1>
          <button>
            <NavLink to="/dashboard/dps-create">Add New DPS</NavLink>,
          </button>
        </div>
        <div className="border-b my-2"></div>

        <div className="p-5">
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
                  <td>{item.memberOfApplying.memberName}</td>
                  <td>{item.memberOfApplying.memberId}</td>
                  <td>{item.dpsAcNo}</td>
                  <td>{item.dpsStart}</td>
                  <td>{item.installmentType}</td>
                  <td>{item.returnInterest}</td>
                  <td>{item.durationOfYear}</td>
                  <td>...</td>
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
