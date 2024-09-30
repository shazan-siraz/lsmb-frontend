import { NavLink } from "react-router-dom";
import { useGetAllFdrQuery } from "../../redux/features/fdr/fdrApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";

const ActiveFdr = () => {
  const { data: fdrData, isLoading: fdrDataQueryLoading } = useGetAllFdrQuery();

  if (fdrDataQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#EBECED]">
      <div>
        <div className="flex justify-between items-center px-5 pb-3 pt-5">
          <h1 className="text-[20px] font-semibold">Active FDR List</h1>
          <div className="grid grid-cols-2 gap-5">
            <input
              className="py-2 px-2 my-1 rounded-sm membershipInput"
              type="text"
            />
            <button className="bg-slate-500 py-2 px-2 text-white font-semibold my-1 rounded-md max-w-[100px] hover:bg-slate-600" type="Submit">Search</button>
          </div>
          <button>
            <NavLink className="text-[20px] font-semibold" to="/dashboard/fdr-create">Add New FDR</NavLink>,
          </button>
        </div>
        <div className="border-b my-2 border-slate-300"></div>

        <div className="p-5">
          <table className="employeeTable">
            <thead className="bg-slate-600 text-white uppercase text-center">
              <tr>
                <th>SL</th>
                <th>Member Name</th>
                <th>Member Id</th>
                <th>A/C No</th>
                <th>Start</th>
                <th>Fixed Amount</th>
                <th>Percentage</th>
                <th>Pay Mode</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fdrData?.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1} </td>
                  <td>{item.memberOfFdrApplying.memberName}</td>
                  <td>{item.memberOfFdrApplying.memberId}</td>
                  <td>{item.FdrAcNo}</td>
                  <td>{timeFormat(item.FdrStart)}</td>
                  <td>{item.FixedDepositAmount}</td>
                  <td>{item.returnInterest}</td>
                  <td>{item.revenueType}</td>
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

export default ActiveFdr;
