import { useGetAllLoanQuery } from "../../redux/features/loan/loanApi";



const OverdueLoan = () => {

    const { data: loanQueryData, isLoading: loanQueryLoading } =
    useGetAllLoanQuery();

  if (loanQueryLoading) {
    return <p>Loading...</p>;
  }


    return (
        <div>
      <div>
        <div className="px-5 py-2">
          <h1>OverDue Loan List</h1>
        </div>
        <div className="border-b my-2"></div>

        <div className="p-5">
          <table className="employeeTable">
            <thead>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loanQueryData?.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1} </td>
                  <td>{item.memberOfApplying?.groupName} </td>
                  <td>{item.memberOfApplying?.memberId} </td>
                  <td>{item.loanNo} </td>
                  <td>{item.loanType} </td>
                  <td>{item.loanAmount} </td>
                  <td>{item.percentageOfInterest}</td>
                  <td>{(item.loanAmount * 10) / 100} tk</td>
                  <td>{item.installmentMode?.installType}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
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

export default OverdueLoan;