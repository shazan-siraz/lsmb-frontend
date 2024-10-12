import { useGetOverdueLoanQuery } from "../../redux/features/loan/loanApi";
import ActiveLoanList from "./ActiveLoanList";

const OverdueLoan = () => {
  const { data: overdueLoanData, isLoading: overdueLoanQueryLoading } =
    useGetOverdueLoanQuery();

  if (overdueLoanQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <div className="px-5 py-2 font-semibold text-[20px]">
          <h1 >Active Loan List</h1>
        </div>
        <div className="border-b my-2"></div>

        <div className="p-5">
          <table className="employeeTable">
            <thead>
              <tr className="bg-slate-600 text-white uppercase">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {overdueLoanData?.data.map((item, index) => (
                <ActiveLoanList key={item._id} index={index} item={item}></ActiveLoanList>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverdueLoan;
