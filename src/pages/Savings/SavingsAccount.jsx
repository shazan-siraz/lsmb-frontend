import { NavLink } from "react-router-dom";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";

const SavingsAccount = () => {
  const { data: membershipData, isLoading: membershipQueryLoading } =
    useGetAllMembershipQuery();

//   console.log(membershipData?.data);

  if (membershipQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <div className="px-5 py-2">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-[22px]">Saving Account List</h1>
            <div className="flex items-center gap-5">
              <input type="text" name="" />
              <button>Search</button>
            </div>
            <NavLink
              className="border px-4 py-2 rounded-md border-slate-600 hover:bg-slate-600 hover:text-white transition-all duration-300 ease-in-out"
              to="/dashboard/savings-transaction"
            >
              Make A Saving A/C
            </NavLink>
          </div>
        </div>
        <div className="border-b my-2"></div>

        <div className="p-5">
          <table className="employeeTable">
            <thead className="bg-slate-600 text-white uppercase">
              <tr>
                <th className="text-center">SL</th>
                <th className="text-center">Name</th>
                <th className="text-center">Member ID</th>
                <th className="text-center">Phone</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Relative</th>
                <th className="text-center">Profession</th>
                <th className="text-center">Net Savings</th>
              </tr>
            </thead>
            <tbody>
              {membershipData?.data.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.memberName}</td>
                  <td className="text-center">{item.memberId}</td>
                  <td className="text-center">{item.phoneNo}</td>
                  <td className="text-center">{item.gender}</td>
                  <td className="text-center">
                    {item.nominee.nomineeRelation}
                  </td>
                  <td className="text-center">{item.profession}</td>
                  <td className="text-center">{item.accountBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavingsAccount;
