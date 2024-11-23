import { NavLink } from "react-router-dom";
import { useGetAllFdrQuery } from "../../redux/features/fdr/fdrApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { FaEdit } from "react-icons/fa";

const ActiveFdr = () => {
  const { data: fdrData, isLoading: fdrDataQueryLoading } = useGetAllFdrQuery();

  if (fdrDataQueryLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  console.log(fdrData.data.map(item => console.log(item.memberOfFdrApplying
  )));

  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-5 pb-3 pt-5">
          <h1 className="text-[20px] font-semibold">Active FDR List</h1>
          <div className="grid grid-cols-2 gap-5">
            <input
              className="py-2 px-2 my-1 rounded-sm membershipInput"
              type="text"
            />
            <button
              className="bg-slate-500 py-2 px-2 text-white font-semibold my-1 rounded-md max-w-[100px] hover:bg-slate-600"
              type="Submit"
            >
              Search
            </button>
          </div>
          <button>
            <NavLink
              className="text-[20px] font-semibold"
              to="/dashboard/fdr-create"
            >
              Add New FDR
            </NavLink>
            ,
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
                  <td>
                    <NavLink
                      target="_blank"
                      to={`/dashboard/single-member/${item?.memberOfFdrApplying?._id}`}
                      className="border border-lime-900 px-4 py-1 rounded-md hover:bg-slate-800 hover:text-white"
                    >
                      <button>{item?.memberOfFdrApplying?.memberName}</button>
                    </NavLink>
                  </td>
                  <td>{item.memberOfFdrApplying.memberId}</td>
                  <td>{item.FdrAcNo}</td>
                  <td>{timeFormat(item.FdrStart)}</td>
                  <td>{item.FixedDepositAmount}</td>
                  <td>{item.returnInterest}</td>
                  <td>{item.revenueType}</td>
                  <td>{item.durationOfYear} Year</td>
                  <td>
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

export default ActiveFdr;
