import { useForm } from "react-hook-form";
import { FaDatabase, FaIdCardAlt, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleMembershipQuery } from "../../redux/features/membership/membershipApi";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { ToastContainer, toast } from "react-toastify";
import { useRef, useState } from "react";
import { useCreateSavingWithdrawMutation } from "../../redux/features/savingWithdraw/savingWithdraw";
import Swal from "sweetalert2";

const SavingWithdraw = () => {
  const { id } = useParams();
  const withdrawAmountRef = useRef();
  const [withdrawAmountState, setWithdrawAmountState] = useState("");

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const {
    data: singleMemberData,
    isLoading: singleMemberDataQueryLoading,
    refetch,
  } = useGetSingleMembershipQuery(id);

  const [addSavingWithdraw, { isLoading: withdrawLoading }] =
    useCreateSavingWithdrawMutation();

  if (singleMemberDataQueryLoading) {
    return <p>Loading...</p>;
  }

  const handleWithdrawAmountChange = () => {
    const value = withdrawAmountRef.current?.value;
    setWithdrawAmountState(value);
  };

  const onSubmit = async (data) => {
    try {
      const savingWithdrawData = {
        memberId: singleMemberData?.data._id,
        dateOfWithdraw: data.dateOfWithdraw,
        mrSlipNo: data.mrSlipNo,
        withdrawAmount: withdrawAmountState,
        serviceCharge: data.serviceCharge,
        totalPayableAmount: withdrawAmountState,
        withdrawTransactionInfo: data.withdrawTransactionInfo,
      };

      const result = await Swal.fire({
        title: `Are you Sure Withdraw ${withdrawAmountState} Amount`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const res = await addSavingWithdraw(savingWithdrawData);

        if (res?.data) {
          toast.success(`${withdrawAmountState} Amount withdraw successfully`);
          refetch();
          navigate("/dashboard/withdraw");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-evenly items-center py-5">
        <h1 className="uppercase font-bold text-[35px]">Savings Withdraw</h1>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="flex justify-around items-center  py-4">
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaUser />
          <p className="text-[20px]">{singleMemberData?.data.memberName}</p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaIdCardAlt />
          <p>{singleMemberData?.data.memberId}</p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaDatabase />
          <p>{singleMemberData?.data.accountBalance}</p>
        </div>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-5 py-10">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dateOfWithdraw">
                Date of Withdraw*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="date"
                id="dateOfWithdraw"
                defaultValue={todayDateFormated()} // Set default value to today's date
                {...register("dateOfWithdraw")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="mrSlipNo">
                MR / Slip No.*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="text"
                id="mrSlipNo"
                placeholder="Enter MR / Slip No"
                {...register("mrSlipNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="withdrawAmount">
                Withdraw Amount*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="number"
                id="withdrawAmount"
                placeholder="Enter Withdraw Amount"
                {...register("withdrawAmount")}
                required={true}
                ref={withdrawAmountRef}
                onChange={handleWithdrawAmountChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="serviceCharge">
                Service Charge
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="number"
                id="serviceCharge"
                placeholder="Service Charge"
                {...register("serviceCharge")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="totalPayableAmount">
                Total Payable Amount
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="number"
                id="totalPayableAmount"
                placeholder="Total Payable Amount"
                {...register("totalPayableAmount")}
                required={true}
                value={withdrawAmountState}
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label
                className="font-semibold"
                htmlFor="withdrawTransactionInfo"
              >
                Transaction Note
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="text"
                id="withdrawTransactionInfo"
                placeholder="Enter Transaction Note"
                {...register("withdrawTransactionInfo")}
                required={true}
              />
            </div>
          </div>

          <div className="text-center pb-10">
            <input
              className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
              type="submit"
              value={withdrawLoading ? "Loading..." : "Submit"}
              disabled={withdrawLoading}
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavingWithdraw;
