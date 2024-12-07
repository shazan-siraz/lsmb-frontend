import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useGetPendingLoanQuery } from "../../redux/features/loan/loanApi";
import LoanList from "./LoanList";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";

const LoanRequest = () => {
  const { email } = useSelector(useCurrentUser);
  const { data: loanQueryData, isLoading: loanQueryLoading } =
    useGetPendingLoanQuery(email);

  if (loanQueryLoading) {
    return <Loading isLoading="true"></Loading>;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between px-5 py-2 font-semibold text-[20px]">
          <h1>Pending Loan List</h1>
          <NavLink
            to="/dashboard/loan-create"
            className="border-2 rounded hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out px-3"
          >
            <p>Loan Create</p>
          </NavLink>
        </div>
        <div className="border-b my-2"></div>

        <div className="p-5">
          <table className="employeeTable">
            <thead className="bg-slate-600 text-white uppercase">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>ID</th>
                <th>Loan No</th>
                <th>Loan Type</th>
                <th>Disbursement</th>
                <th>Interest</th>
                <th>Interest Amount</th>
                <th>Install Type</th>
                <th>End Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loanQueryData?.data.map((item, index) => (
                <LoanList key={item._id} item={item} index={index}></LoanList>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanRequest;
