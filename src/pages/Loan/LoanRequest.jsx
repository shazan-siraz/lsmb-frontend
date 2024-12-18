import { useGetPendingLoanQuery } from "../../redux/features/loan/loanApi";
import LoanList from "./LoanList";
import { NavLink } from "react-router-dom";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";

const LoanRequest = () => {
  const { branchEmail } = useGetBranchEmail();

  const { data: loanQueryData, isLoading: loanQueryLoading } =
    useGetPendingLoanQuery(branchEmail);

  return (
    <div>
      <div>
      <ToastContainer></ToastContainer>
        <div className="flex justify-between px-5 py-2 font-semibold text-[20px]">
          <h1>Pending Loan List</h1>
          <NavLink
            to="/dashboard/loan-create"
            className="text-[18px] border-2 rounded hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out px-3"
          >
            Loan Create
          </NavLink>
        </div>
        
        <div className="border-b"></div>

        <div className="px-5 py-1">
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
              {loanQueryLoading ? (
                // Show loading rows as placeholders
                Array(1)
                  .fill()
                  .map((_, index) => (
                    <tr key={index}>
                      <td colSpan="12" className="text-center">Loading...</td>
                    </tr>
                  ))
                
              ) : (
                loanQueryData?.data.map((item, index) => (
                  <LoanList key={item._id} item={item} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanRequest;
