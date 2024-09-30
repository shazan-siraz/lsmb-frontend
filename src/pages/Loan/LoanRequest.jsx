import { useGetPendingLoanQuery } from "../../redux/features/loan/loanApi";
import LoanList from "./LoanList";

const LoanRequest = () => {
  const { data: loanQueryData, isLoading: loanQueryLoading } =
    useGetPendingLoanQuery();

  if (loanQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <div className="px-5 py-2 font-semibold text-[20px]">
          <h1>Pending Loan List</h1>
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
