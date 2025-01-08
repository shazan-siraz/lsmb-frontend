import { useForm } from "react-hook-form";
import { FaDatabase, FaIdCardAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { ToastContainer, toast } from "react-toastify";
import { useRef, useState } from "react";
import {
  useCreateSavingWithdrawMutation,
  useGetOneMemberAllSavingWithdrawQuery,
} from "../../redux/features/savingWithdraw/savingWithdraw";
import Swal from "sweetalert2";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import {
  useGetSingleMemberSavingTransactionQuery,
  useGetTotalSavingAmountByOneMemberQuery,
} from "../../redux/features/savingCollection/savingCollectionApi";
import generateUniqueTxnId from "../../utils/createTransactionId/generateTransactionId";
import { useBranchWallet } from "../../hooks/useBranchWallet";

const SavingWithdraw = () => {
  const { id } = useParams();
  const { branchWallet } = useBranchWallet();
  const dispatch = useDispatch();
  const withdrawAmountRef = useRef();
  const [withdrawAmountState, setWithdrawAmountState] = useState("");
  const [serviceCharge, setServiceCharge] = useState(0);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: singleSavingMember, isLoading: singleSavingMemberLoading } =
    useGetSingleMemberSavingTransactionQuery(id);

  const { data: totalSavingAmount } = useGetTotalSavingAmountByOneMemberQuery(
    singleSavingMember?.data?.memberId?._id
  );

  const { data: totalSavingWithdraw } = useGetOneMemberAllSavingWithdrawQuery(
    singleSavingMember?.data?.memberId?._id
  );

  const [addSavingWithdraw, { isLoading: withdrawLoading }] =
    useCreateSavingWithdrawMutation();

  if (singleSavingMemberLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const handleWithdrawAmountChange = () => {
    const value = withdrawAmountRef.current?.value;
    setWithdrawAmountState(value);
  };

  const onSubmit = async (data) => {
    try {
      const savingWithdrawData = {
        memberId: singleSavingMember?.data?.memberId?._id,
        branchEmail: singleSavingMember?.data.branchEmail,
        companyEmail: singleSavingMember?.data.companyEmail,
        dateOfWithdraw: data.dateOfWithdraw,
        mrSlipNo: data.mrSlipNo,
        withdrawAmount: withdrawAmountState,
        serviceCharge: data.serviceCharge || 0,
        totalPayableAmount: withdrawAmountState,
        transactionId: generateUniqueTxnId(),
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
        if (
          withdrawAmountState >
          totalSavingAmount?.data - totalSavingWithdraw?.data
        ) {
          toast.error("Insufficient Balance");
        } else if (withdrawAmountState > branchWallet) {
          toast.error("Insufficient Balance in Branch Wallet");
        } else {
          const res = await addSavingWithdraw(savingWithdrawData);

          if (res?.data) {
            dispatch(
              setToastMessage(
                `${withdrawAmountState} Amount withdraw successfully`
              )
            );
            navigate("/dashboard/withdraw");
          }

          if (res?.error) {
            toast.error(res?.error?.data?.message);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex justify-evenly items-center py-5">
        <h1 className="uppercase font-bold text-[35px]">Savings Withdraw</h1>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="flex justify-around items-center  py-4">
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <img
            className="w-[50px]"
            src={singleSavingMember?.data?.memberId?.memberPhoto}
            alt=""
          />
          <p className="text-[20px]">
            {singleSavingMember?.data?.memberId?.memberName}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <p>Signature:</p>
          <img
            className="w-[80px] h-[40px]"
            src={singleSavingMember?.data?.memberId?.signature}
            alt=""
          />
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaIdCardAlt />
          <p>{singleSavingMember?.data.memberId?.memberId}</p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaDatabase />
          <p>{totalSavingAmount?.data - totalSavingWithdraw?.data}</p>
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
                onChange={(e) => setServiceCharge(e.target.value)}
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
                value={withdrawAmountState - serviceCharge}
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
