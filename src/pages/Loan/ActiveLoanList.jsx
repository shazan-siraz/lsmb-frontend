/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ActiveLoanList = ({ item, index }) => {
  return (
    <tr>
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
      <td>
        <NavLink
          target="_blank"
          to={`/dashboard/single-member/${item.memberOfApplying?._id}`}
          className="border border-lime-900 px-4 py-1 rounded-md hover:bg-slate-800 hover:text-white"
        >
          <button>{item.memberOfApplying?.memberId}</button>
        </NavLink>
      </td>
   
      <td>{item.loanNo} </td>
      <td>{item.loanType} </td>
      <td>{item.loanAmount} </td>
      <td>{item.percentageOfInterest}</td>
      <td>{(item.loanAmount * 10) / 100} tk</td>
      <td>{item.installmentMode?.installType}</td>
      <td>{item.endDate}</td>
      <td>{item.status}</td>
      <td>
        <div className="flex justify-center items-center">
          <FaEdit />
        </div>
      </td>
    </tr>
  );
};

export default ActiveLoanList;
