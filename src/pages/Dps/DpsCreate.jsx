import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";

const DpsCreate = () => {
  const { register, handleSubmit } = useForm();

  const { data: employeeData } = useGetAllEmployeeQuery();
  const { data: membershipData } = useGetAllMembershipQuery();

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#EBECED] h-screen">
      <div className="flex justify-between px-5 pt-2">
        <h1 className="font-bold text-[20px]">Make a New DPS</h1>
        <NavLink to="/dashboard/all-members">
          <button>Active Loan List</button>
        </NavLink>
      </div>

      <div className="border-b border-slate-300 my-3"></div>

      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberOfApplying">
                Member Of Applying*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="memberOfApplying"
                {...register("memberOfApplying")}
                required={true}
              >
                <option>Select DPS Member</option>
                {membershipData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item.memberName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dpsStart">
                DPS Start*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="Date"
                id="dpsStart"
                {...register("dpsStart")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dpsAcNo">
                DPS A/C No.*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="dpsAcNo"
                placeholder="DPS A/C No"
                {...register("dpsAcNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="startingBalance">
                Starting Balance*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="startingBalance"
                placeholder="Enter Initial Amount"
                {...register("startingBalance")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="durationOfYear">
                Duration Of Year*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="durationOfYear"
                {...register("durationOfYear")}
                required={true}
              >
                <option>Select DPS Term</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="installmentType">
                Installment Type*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="installmentType"
                {...register("installmentType")}
                required={true}
              >
                <option>Select Installment Type</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="returnInterest">
                Return Interest*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="returnInterest"
                placeholder="Return Interest"
                {...register("returnInterest")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="returnAmount">
                Return Amount
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="returnAmount"
                placeholder="Maturity Account Balance"
                {...register("returnAmount")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="referenceUser">
                Reference User
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="referenceUser"
                {...register("referenceUser")}
                required={true}
              >
                <option>Select Reference User</option>
                {employeeData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="referenceMember">
                Reference Member
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="referenceMember"
                {...register("referenceMember")}
                required={true}
              >
                <option>Select Reference Member</option>
                {membershipData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item.memberName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-b border-slate-300 my-10"></div>

          <div className="text-center py-10">
            <input
              className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              //   value={createLoanLoading ? "Loading..." : "Submit"}
              //   disabled={createLoanLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DpsCreate;
