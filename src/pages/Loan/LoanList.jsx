/* eslint-disable react/prop-types */
import { useUpdateLoanMutation } from "../../redux/features/loan/loanApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const LoanList = ({ item, index }) => {
  const [activeLoan, { isLoading: activeLoanLoading }] =
    useUpdateLoanMutation();

  const handleUpdateStatus = async (id) => {
    const updatedStatusData = {
      id: id,
      status: "Active",
    };

    const res = await activeLoan(updatedStatusData);

    if (res?.data?.data) {
      toast.success(
        `${item.memberOfApplying?.groupName} Loan is Active Successfully`
      );
      window.location.reload();
    }
  };

  return (
    <tr>
      <td>{index + 1} </td>
      <td>
        <NavLink
          target="_blank"
          to={`/dashboard/single-member/${item.memberOfApplying?._id}`}
          className="border border-lime-900  px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white"
        >
          <button>{item.memberOfApplying?.memberName}</button>
        </NavLink>
      </td>
      <td>{item.memberOfApplying?.memberId} </td>
      <td>{item.loanNo} </td>
      <td>{item.loanType} </td>
      <td>{item.loanAmount} </td>
      <td>{item.percentageOfInterest}</td>
      <td>{(item.loanAmount * 10) / 100} tk</td>
      <td>{item.installmentMode?.installType}</td>
      <td>{item.endDate}</td>
      <td>{item.status}</td>
      <td>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handleUpdateStatus(item._id)}
            className="border rounded-md bg-green-600 hover:bg-green-700 text-white px-2"
          >
            {activeLoanLoading ? "Lading..." : "Active"}
            <ToastContainer />
          </button>
          <button className="border rounded-md bg-red-600 hover:bg-red-700 text-white px-2">
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LoanList;
