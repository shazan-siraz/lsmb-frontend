import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateDpsMutation } from "../../redux/features/dps/dpsApi";

const DpsCreate = () => {
  const { email } = useSelector(useCurrentUser);
  const { register, handleSubmit, reset } = useForm();
  const [isStartingBalance, setIsStartingBalance] = useState("");
  const [durationOfYear, setDurationOfYear] = useState("");
  const [installmentType, setInstallmentType] = useState("");
  const [totalAmount, setTotalAmount] = useState();

  const handleStartingBalance = (event) => {
    const value = event.target.value;
    setIsStartingBalance(value);
  };

  const handleDurationOfYear = (event) => {
    const value = event.target.value;
    setDurationOfYear(value);

    if (value === "1" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12);
    } else if (value === "2" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 2);
    } else if (value === "3" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 3);
    } else if (value === "4" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 4);
    } else if (value === "5" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 5);
    } else if (value === "6" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 6);
    } else if (value === "7" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 7);
    } else if (value === "8" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 8);
    } else if (value === "9" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 9);
    } else if (value === "10" && installmentType === "Monthly") {
      setTotalAmount(isStartingBalance * 12 * 10);
    } else if (value === "1" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 52);
    } else if (value === "2" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 2 * 52);
    } else if (value === "3" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 3 * 52);
    } else if (value === "4" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 4 * 52);
    } else if (value === "5" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 5 * 52);
    } else if (value === "6" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 6 * 52);
    } else if (value === "7" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 7 * 52);
    } else if (value === "8" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 8 * 52);
    } else if (value === "9" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 9 * 52);
    } else if (value === "10" && installmentType === "Weeakly") {
      setTotalAmount(isStartingBalance * 12 * 10 * 52);
    } else if (value === "1" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365);
    } else if (value === "2" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 2);
    } else if (value === "3" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 3);
    } else if (value === "4" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 4);
    } else if (value === "5" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 5);
    } else if (value === "6" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 6);
    } else if (value === "7" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 7);
    } else if (value === "8" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 8);
    } else if (value === "9" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 9);
    } else if (value === "10" && installmentType === "Daily") {
      setTotalAmount(isStartingBalance * 365 * 10);
    }
  };

  const handleInstallmentType = (event) => {
    const value = event.target.value;
    setInstallmentType(value);

    if (value === "Monthly" && durationOfYear === "1") {
      setTotalAmount(isStartingBalance * 12);
    } else if (value === "Monthly" && durationOfYear === "2") {
      setTotalAmount(isStartingBalance * 24);
    } else if (value === "Monthly" && durationOfYear === "3") {
      setTotalAmount(isStartingBalance * 36);
    } else if (value === "Monthly" && durationOfYear === "4") {
      setTotalAmount(isStartingBalance * 48);
    } else if (value === "Monthly" && durationOfYear === "5") {
      setTotalAmount(isStartingBalance * 60);
    } else if (value === "Monthly" && durationOfYear === "6") {
      setTotalAmount(isStartingBalance * 72);
    } else if (value === "Monthly" && durationOfYear === "7") {
      setTotalAmount(isStartingBalance * 84);
    } else if (value === "Monthly" && durationOfYear === "8") {
      setTotalAmount(isStartingBalance * 96);
    } else if (value === "Monthly" && durationOfYear === "9") {
      setTotalAmount(isStartingBalance * 108);
    } else if (value === "Monthly" && durationOfYear === "10") {
      setTotalAmount(isStartingBalance * 120);
    } else if (value === "Weeakly" && durationOfYear === "1") {
      setTotalAmount(isStartingBalance * 52 - 200);
    } else if (value === "Weeakly" && durationOfYear === "2") {
      setTotalAmount(isStartingBalance * 52 * 2 - 200);
    } else if (value === "Weeakly" && durationOfYear === "3") {
      setTotalAmount(isStartingBalance * 52 * 3 - 200);
    } else if (value === "Weeakly" && durationOfYear === "4") {
      setTotalAmount(isStartingBalance * 52 * 4 - 200);
    } else if (value === "Weeakly" && durationOfYear === "5") {
      setTotalAmount(isStartingBalance * 52 * 5 - 200);
    } else if (value === "Weeakly" && durationOfYear === "6") {
      setTotalAmount(isStartingBalance * 52 * 6 - 200);
    } else if (value === "Weeakly" && durationOfYear === "7") {
      setTotalAmount(isStartingBalance * 52 * 7 - 200);
    } else if (value === "Weeakly" && durationOfYear === "8") {
      setTotalAmount(isStartingBalance * 52 * 8 - 200);
    } else if (value === "Weeakly" && durationOfYear === "9") {
      setTotalAmount(isStartingBalance * 52 * 9 - 200);
    } else if (value === "Weeakly" && durationOfYear === "10") {
      setTotalAmount(isStartingBalance * 52 * 10 - 200);
    } else if (value === "Daily" && durationOfYear === "1") {
      setTotalAmount(isStartingBalance * 365);
    } else if (value === "Daily" && durationOfYear === "2") {
      setTotalAmount(isStartingBalance * 365 * 2);
    } else if (value === "Daily" && durationOfYear === "3") {
      setTotalAmount(isStartingBalance * 365 * 3);
    } else if (value === "Daily" && durationOfYear === "4") {
      setTotalAmount(isStartingBalance * 365 * 4);
    } else if (value === "Daily" && durationOfYear === "5") {
      setTotalAmount(isStartingBalance * 365 * 5);
    } else if (value === "Daily" && durationOfYear === "6") {
      setTotalAmount(isStartingBalance * 365 * 6);
    } else if (value === "Daily" && durationOfYear === "7") {
      setTotalAmount(isStartingBalance * 365 * 7);
    } else if (value === "Daily" && durationOfYear === "8") {
      setTotalAmount(isStartingBalance * 365 * 8);
    } else if (value === "Daily" && durationOfYear === "9") {
      setTotalAmount(isStartingBalance * 365 * 9);
    } else if (value === "Daily" && durationOfYear === "10") {
      setTotalAmount(isStartingBalance * 365 * 10);
    }
  };

  const handleInterestPercentChange = (event) => {
    const value = event.target.value;
   

    if (durationOfYear === "1" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 12) / 100) * value + isStartingBalance * 12
      );
    } else if (durationOfYear === "2" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 24) / 100) * value + isStartingBalance * 24
      );
    } else if (durationOfYear === "3" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 36) / 100) * value + isStartingBalance * 36
      );
    } else if (durationOfYear === "4" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 48) / 100) * value + isStartingBalance * 48
      );
    } else if (durationOfYear === "5" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 60) / 100) * value + isStartingBalance * 60
      );
    } else if (durationOfYear === "6" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 72) / 100) * value + isStartingBalance * 72
      );
    } else if (durationOfYear === "7" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 84) / 100) * value + isStartingBalance * 84
      );
    } else if (durationOfYear === "8" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 96) / 100) * value + isStartingBalance * 96
      );
    } else if (durationOfYear === "9" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 108) / 100) * value + isStartingBalance * 108
      );
    } else if (durationOfYear === "10" && installmentType === "Monthly") {
      setTotalAmount(
        ((isStartingBalance * 120) / 100) * value + isStartingBalance * 120
      );
    } else if (durationOfYear === "1" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 - 200) / 100) * value +
          (isStartingBalance * 52 - 200)
      );
    } else if (durationOfYear === "2" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 2 - 200) / 100) * value +
          (isStartingBalance * 52 * 2 - 200)
      );
    } else if (durationOfYear === "3" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 3 - 200) / 100) * value +
          (isStartingBalance * 52 * 3 - 200)
      );
    } else if (durationOfYear === "4" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 4 - 200) / 100) * value +
          (isStartingBalance * 52 * 4 - 200)
      );
    } else if (durationOfYear === "5" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 5 - 200) / 100) * value +
          (isStartingBalance * 52 * 5 - 200)
      );
    } else if (durationOfYear === "6" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 6 - 200) / 100) * value +
          (isStartingBalance * 52 * 6 - 200)
      );
    } else if (durationOfYear === "7" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 7 - 200) / 100) * value +
          (isStartingBalance * 52 * 7 - 200)
      );
    } else if (durationOfYear === "8" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 8 - 200) / 100) * value +
          (isStartingBalance * 52 * 8 - 200)
      );
    } else if (durationOfYear === "9" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 9 - 200) / 100) * value +
          (isStartingBalance * 52 * 9 - 200)
      );
    } else if (durationOfYear === "10" && installmentType === "Weeakly") {
      setTotalAmount(
        ((isStartingBalance * 52 * 10 - 200) / 100) * value +
          (isStartingBalance * 52 * 10 - 200)
      );
    } else if (durationOfYear === "1" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366) / 100) * value + isStartingBalance * 366
      );
    } else if (durationOfYear === "2" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 2) / 100) * value +
          isStartingBalance * 366 * 2
      );
    } else if (durationOfYear === "3" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 3) / 100) * value +
          isStartingBalance * 366 * 3
      );
    } else if (durationOfYear === "4" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 4) / 100) * value +
          isStartingBalance * 366 * 4
      );
    } else if (durationOfYear === "5" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 5) / 100) * value +
          isStartingBalance * 366 * 5
      );
    } else if (durationOfYear === "6" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 6) / 100) * value +
          isStartingBalance * 366 * 6
      );
    } else if (durationOfYear === "7" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 7) / 100) * value +
          isStartingBalance * 366 * 7
      );
    } else if (durationOfYear === "8" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 8) / 100) * value +
          isStartingBalance * 366 * 8
      );
    } else if (durationOfYear === "9" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 9) / 100) * value +
          isStartingBalance * 366 * 9
      );
    } else if (durationOfYear === "10" && installmentType === "Daily") {
      setTotalAmount(
        ((isStartingBalance * 366 * 10) / 100) * value +
          isStartingBalance * 366 * 10
      );
    }
  };

  const { data: memberShipData, isLoading: membersDataLoading } =
    useGetAllMembershipQuery();
  const { data: employeeData, isLoading: employeeDataLoading } =
    useGetAllEmployeeQuery();

  const [createDPS, {isLoading: dpsCreateLoading, error}] = useCreateDpsMutation();

  if (membersDataLoading || employeeDataLoading) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data) => {
    try {
      const dpsData = {
        memberOfApplying: data.memberOfDpsApplying,
        branchEmail: email,
        dpsStart: data.dpsStart,
        dpsAcNo: data.dpsAcNo,
        startingBalance: Number(data.startingBalance),
        durationOfYear: Number(data.durationOfYear),
        installmentType: data.installmentType,
        returnInterest: Number(data.returnInterest),
        returnAmount: totalAmount,
        referenceEmployee: data.referenceEmployee,
        referenceMember: data.referenceMember,
      };


      const res = await createDPS(dpsData);

      if (res?.data) {
        toast.success(`DPS created Successfully`);
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
        <h1 className="font-semibold text-[20px]">Make A New DPS</h1>
        <NavLink to="/dashboard/all-members">
          <button>Add New Member</button>
        </NavLink>
      </div>

      <div className="border-b border-slate-300 my-3"></div>

      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberOfDpsApplying">
                Member Of DPS Applying*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="memberOfDpsApplying"
                {...register("memberOfDpsApplying")}
                required={true}
              >
                <option>Select DPS Member</option>
                {memberShipData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item?.memberName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="DpsStart">
                DPS Start*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="date"
                id="DpsStart"
                defaultValue={formattedToday} // Set default value to today's date
                {...register("dpsStart")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="DpsAcNo">
                DPS A/C No.*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="DpsAcNo"
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
                placeholder="Enter Starting Balance"
                {...register("startingBalance")}
                onChange={handleStartingBalance}
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
                <option>Select DPS Term</option>
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
              <label className="font-semibold" htmlFor="installmentType">
                Installment Type*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="installmentType"
                {...register("installmentType")}
                onChange={handleInstallmentType}
                required={true}
              >
                <option>Select Installment Type</option>
                <option value="Daily">Daily</option>
                <option value="Weeakly">Weeakly</option>
                <option value="Monthly">Monthly</option>
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

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="returnAmount">
                Return Amount
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="returnAmount"
                value={totalAmount}
                {...register("returnAmount")}
                required={true}
                readOnly // This makes the input read-only
              />
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
              className="w-[100%] border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out"
              type="submit"
              value={dpsCreateLoading ? "Loading..." : "Create DPS"}
              disabled={dpsCreateLoading}
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DpsCreate;
