import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllSavingMembershipQuery } from "../../redux/features/membership/membershipApi";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { useGetSingleEmployeeQuery } from "../../redux/features/employee/employeeApi";

const SavingsAccount = () => {
  const { email, role } = useSelector(useCurrentUser);

  const { data: singleBranchData, isLoading: singleBranchQueryLoading } =
    useGetSingleBranchQuery(email);
  const { data: singleEmployeeData, isLoading: singleEmployeeLoading } =
    useGetSingleEmployeeQuery(email);

  // Conditionally use the data based on the role
  let data;
  if (role === "branch") {
    data = singleBranchData;
  } else if (role === "manager") {
    data = singleEmployeeData;
  }

  const branchEmail = data?.data?.branchEmail;

  const { data: savingMemberData, isLoading: savingMemberQueryLoading } =
    useGetAllSavingMembershipQuery(branchEmail);

  if (
    singleBranchQueryLoading ||
    singleEmployeeLoading ||
    savingMemberQueryLoading
  ) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <div className="bg-slate-100 min-h-lvh ">
      <div className="flex justify-around py-4">
        <h1 className="text-[20px] font-semibold">Saving A/C List</h1>
        <NavLink to="/dashboard/saving-transaction">
          <button className="border px-5 py-1 rounded font-semibold hover:bg-slate-500 hover:text-white transi ease-in-out duration-300">
            Make A Saving A/C
          </button>
        </NavLink>
      </div>
      <hr className="py-2" />

      <div>
        <table className="w-[95%] mx-auto">
          <thead>
            <tr>
              <td>SL</td>
              <td>Name</td>
              <td>Member ID</td>
              <td>Phone</td>
              <td>Gender</td>
              <td>Relative</td>
              <td>Net Savings</td>
            </tr>
          </thead>
          <tbody>
            {savingMemberData?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item?.memberName}</td>
                <td>{item?.memberId}</td>
                <td>{item?.phoneNo}</td>
                <td>{item?.gender}</td>
                <td>{item?.profession}</td>
                <td>{item?.accountBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavingsAccount;
