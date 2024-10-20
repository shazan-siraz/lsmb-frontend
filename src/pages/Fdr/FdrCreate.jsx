import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import { useCreateFdrMutation } from "../../redux/features/fdr/fdrApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const FdrCreate = () => {
  const { email } = useSelector(useCurrentUser);
  const { register, handleSubmit, reset } = useForm();
  const [inputDepositValue, setInputDepositValue] = useState("");
  const [interestPercent, setInterestPercent] = useState("");
  const [durationOfYear, setDurationOfYear] = useState("");
  const [revenueType, setRevenueType] = useState("");
  const [totalInterest, setTotalInterest] = useState("");

  const handleFixedDepositChange = (event) => {
    const value = event.target.value;
    setInputDepositValue(value);
  };

  const handleInterestPercentChange = (event) => {
    const value = event.target.value;
    const calculatedInterest = (inputDepositValue / 100) * value;
    setInterestPercent(calculatedInterest);

    if (value === "1" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 12);
    } else if (value === "1" && revenueType === "Yelarly") {
      setTotalInterest(interestPercent * 1);
    } else if (value === "2" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 24);
    } else if (value === "2" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 2);
    } else if (value === "3" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 36);
    } else if (value === "3" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 3);
    } else if (value === "4" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 48);
    } else if (value === "4" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 4);
    } else if (value === "5" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 60);
    } else if (value === "5" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 5);
    } else if (value === "6" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 72);
    } else if (value === "6" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 6);
    } else if (value === "7" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 84);
    } else if (value === "7" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 7);
    } else if (value === "8" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 96);
    } else if (value === "8" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 8);
    } else if (value === "9" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 108);
    } else if (value === "9" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 9);
    } else if (value === "10" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 120);
    } else if (value === "10" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 10);
    }
  };

  const handleDurationOfYear = (event) => {
    const value = event.target.value;
    setDurationOfYear(value);

    if (value === "1" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 12);
    } else if (value === "1" && revenueType === "Yelarly") {
      setTotalInterest(interestPercent * 1);
    } else if (value === "2" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 24);
    } else if (value === "2" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 2);
    } else if (value === "3" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 36);
    } else if (value === "3" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 3);
    } else if (value === "4" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 48);
    } else if (value === "4" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 4);
    } else if (value === "5" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 60);
    } else if (value === "5" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 5);
    } else if (value === "6" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 72);
    } else if (value === "6" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 6);
    } else if (value === "7" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 84);
    } else if (value === "7" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 7);
    } else if (value === "8" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 96);
    } else if (value === "8" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 8);
    } else if (value === "9" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 108);
    } else if (value === "9" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 9);
    } else if (value === "10" && revenueType === "Monthly") {
      setTotalInterest(interestPercent * 120);
    } else if (value === "10" && revenueType === "Yearly") {
      setTotalInterest(interestPercent * 10);
    }
  };

  const handleRevenueType = (event) => {
    const value = event.target.value;
    setRevenueType(value);

    if (value === "Monthly" && durationOfYear === "1") {
      setTotalInterest(interestPercent * 12);
    } else if (value === "Yearly" && durationOfYear === "1") {
      setTotalInterest(interestPercent * 1);
    } else if (value === "Monthly" && durationOfYear === "2") {
      setTotalInterest(interestPercent * 24);
    } else if (value === "Yearly" && durationOfYear === "2") {
      setTotalInterest(interestPercent * 2);
    } else if (value === "Monthly" && durationOfYear === "3") {
      setTotalInterest(interestPercent * 36);
    } else if (value === "Yearly" && durationOfYear === "3") {
      setTotalInterest(interestPercent * 3);
    } else if (value === "Monthly" && durationOfYear === "4") {
      setTotalInterest(interestPercent * 48);
    } else if (value === "Yearly" && durationOfYear === "4") {
      setTotalInterest(interestPercent * 4);
    } else if (value === "Monthly" && durationOfYear === "5") {
      setTotalInterest(interestPercent * 60);
    } else if (value === "Yearly" && durationOfYear === "5") {
      setTotalInterest(interestPercent * 5);
    } else if (value === "Monthly" && durationOfYear === "6") {
      setTotalInterest(interestPercent * 72);
    } else if (value === "Yearly" && durationOfYear === "6") {
      setTotalInterest(interestPercent * 6);
    } else if (value === "Monthly" && durationOfYear === "7") {
      setTotalInterest(interestPercent * 84);
    } else if (value === "Yearly" && durationOfYear === "7") {
      setTotalInterest(interestPercent * 7);
    } else if (value === "Monthly" && durationOfYear === "8") {
      setTotalInterest(interestPercent * 96);
    } else if (value === "Yearly" && durationOfYear === "8") {
      setTotalInterest(interestPercent * 8);
    } else if (value === "Monthly" && durationOfYear === "9") {
      setTotalInterest(interestPercent * 108);
    } else if (value === "Yearly" && durationOfYear === "9") {
      setTotalInterest(interestPercent * 9);
    } else if (value === "Monthly" && durationOfYear === "10") {
      setTotalInterest(interestPercent * 120);
    } else if (value === "Yearly" && durationOfYear === "10") {
      setTotalInterest(interestPercent * 10);
    } else if (value === "Fixed") {
      setTotalInterest(interestPercent);
    }
  };

  const { data: memberShipData, isLoading: membersDataLoading } =
    useGetAllMembershipQuery();
  const { data: employeeData, isLoading: employeeDataLoading } =
    useGetAllEmployeeQuery();

  const [addFdr, {isLoading: fdrCreateLoading, error}] = useCreateFdrMutation();

  if (membersDataLoading || employeeDataLoading) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data) => {
    try {
      const fdrData = {
        memberOfFdrApplying: data.memberOfFdrApplying,
        branchEmail: email,
        FdrStart: data.FdrStart,
        FdrAcNo: data.FdrAcNo,
        FixedDepositAmount: parseInt(data.FixedDepositAmount),
        durationOfYear: data.durationOfYear,
        revenueType: data.revenueType,
        returnInterest: parseInt(data.returnInterest),
        interest: interestPercent,
        totalInterest: totalInterest,
        referenceEmployee: data.referenceEmployee,
        referenceMember: data.referenceMember,
      };

      const res = await addFdr(fdrData);

      if (res?.data) {
        toast.success(`FDR is created Successfully`);
        reset();
      }
    } catch (err) {
      console.log(error);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  return (
    <div className="bg-[#EBECED] h-screen">
      <div className="flex justify-between px-5 pt-2">
        <h1 className="font-semibold text-[20px]">Make A New FDR</h1>
        <NavLink to="/dashboard/all-members">
          <button>Add New Member</button>
        </NavLink>
      </div>

      <div className="border-b border-slate-300 my-3"></div>

      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberOfFdrApplying">
                Member Of Applying*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="memberOfFdrApplying"
                {...register("memberOfFdrApplying")}
                required={true}
              >
                <option>Select FDR Member</option>
                {memberShipData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item?.memberName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="FdrStart">
                FDR Start*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="date"
                id="FdrStart"
                defaultValue={formattedToday} // Set default value to today's date
                {...register("FdrStart")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="FdrAcNo">
                FDR A/C No.*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="FdrAcNo"
                placeholder="FDR A/C No"
                {...register("FdrAcNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="FixedDepositAmount">
                Fixed Deposit Amount*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="FixedDepositAmount"
                placeholder="Enter Fixed Amount"
                {...register("FixedDepositAmount")}
                onChange={handleFixedDepositChange}
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
                onChange={handleDurationOfYear}
                required={true}
              >
                <option>Select FDR Term</option>
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
                <option value="5">5 Year</option>
                <option value="6">6 Year</option>
                <option value="7">7 Year</option>
                <option value="8">8 Year</option>
                <option value="9">9 Year</option>
                <option value="10">10 Year</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="revenueType">
                Revenue Type*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="revenueType"
                {...register("revenueType")}
                onChange={handleRevenueType}
                required={true}
              >
                <option>Select Revenue Type</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="returnInterest">
                Return Interest (%)*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="returnInterest"
                placeholder="Return Interest Percentage"
                {...register("returnInterest")}
                // value={interestPercent} // Controlled input value
                onChange={handleInterestPercentChange} // Capture the value on change
                required={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="interest">
                  Interest*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="number"
                  id="interest"
                  {...register("interest")}
                  value={interestPercent}
                  readOnly // This makes the input read-only
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="totalInterest">
                  Total Interest*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="number"
                  id="totalInterest"
                  {...register("totalInterest")}
                  value={totalInterest}
                  required={true}
                  readOnly // This makes the input read-only
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="referenceEmployee">
                Reference Employee*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="referenceEmployee"
                {...register("referenceEmployee")}
                required={true}
              >
                <option>Select Reference Employee</option>
                {employeeData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item?.employeeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="referenceMember">
                Reference Member*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="referenceMember"
                {...register("referenceMember")}
                required={true}
              >
                <option>Select Reference Member</option>
                {memberShipData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item?.memberName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-b border-slate-300 my-5"></div>

          <div className="text-center py-10 max-w-[500px] mx-auto">
            <input
              className="w-[100%] transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              value={fdrCreateLoading ? "Loading..." : "Create FDR"}
              disabled={fdrCreateLoading}
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FdrCreate;
