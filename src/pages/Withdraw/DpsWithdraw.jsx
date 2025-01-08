import { useForm } from "react-hook-form";
import { FaIdCardAlt, FaMobileAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import {
  useGetAllDpsAcByOneMemberQuery,
  useGetSingleDpsByIdQuery,
  useGetSingleDpsQuery,
} from "../../redux/features/dps/dpsApi";
import { useGetTotalDpsBalaceByOneDpsAcQuery } from "../../redux/features/dpsCollection/dpsCollectionApi";
import { useCreateDpsWithdrawMutation } from "../../redux/features/dpsWithdraw/dpsWithdrawApi";
import { useBranchWallet } from "../../hooks/useBranchWallet";

const DpsWithdraw = () => {
  const { id } = useParams();
  const { branchWallet } = useBranchWallet();
  const [isDpsAcId, setIsDpsAcId] = useState();
  const dispatch = useDispatch();
  const [payableAmount, setPayableAmount] = useState(0);

  const { data: singleDpsData } = useGetSingleDpsQuery(id, {
    skip: !id,
  });

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: dpsAcData, isLoading: dpsAcDataLoading } =
    useGetAllDpsAcByOneMemberQuery(id);

  const { data: singleDpsAcByIdData } = useGetSingleDpsByIdQuery(isDpsAcId, {
    skip: !isDpsAcId,
  });

  const { data: oneAcDpsBalance } = useGetTotalDpsBalaceByOneDpsAcQuery(
    isDpsAcId,
    { skip: !isDpsAcId }
  );

  const [createDpsWithdraw, { isLoading: dpsWithdrawLoading }] =
    useCreateDpsWithdrawMutation();

  const handleSelectDpsAc = (event) => {
    const selectedId = event.target.value;
    setIsDpsAcId(selectedId);
  };

  useEffect(() => {
    if (oneAcDpsBalance?.data && singleDpsAcByIdData?.data?.returnInterest) {
      const calculatedPayable =
        oneAcDpsBalance.data +
        (oneAcDpsBalance.data / 100) * singleDpsAcByIdData.data.returnInterest;

      setPayableAmount(calculatedPayable);
    }
  }, [oneAcDpsBalance, singleDpsAcByIdData]); // Dependencies

  const onSubmit = async (data) => {
    try {
      const dpsWithdrawData = {
        memberOfApplying: singleDpsAcByIdData?.data?.memberOfApplying?._id,
        dpsAcId: singleDpsAcByIdData?.data?._id,
        branchEmail: singleDpsAcByIdData?.data?.branchEmail,
        companyEmail: singleDpsAcByIdData?.data?.companyEmail,
        dateOfWithdraw: data.dateOfWithdraw,
        dpsAcNo: singleDpsAcByIdData?.data?.dpsAcNo,
        mrSlipNo: data.mrSlipNo,
        amount: Number(payableAmount),
        serviceCharge: Number(data.serviceCharge) || 0,
        transactionNote: data.transactionNote,
      };

      const result = await Swal.fire({
        title: `Are you Sure Withdraw ${payableAmount} Amount`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        if (dpsWithdrawData?.amount > branchWallet) {
          toast.error("Insufficient Balance!");
        } else if (
          dpsWithdrawData?.amount >
          oneAcDpsBalance?.data +
            (oneAcDpsBalance?.data / 100) *
              singleDpsAcByIdData?.data.returnInterest
        ) {
          toast.error("Insufficient Balance in DPS Account!");
        } else {
          const res = await createDpsWithdraw(dpsWithdrawData);

          if (res?.data) {
            dispatch(
              setToastMessage(
                `${dpsWithdrawData.amount} Amount withdraw successfully`
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
      <ToastContainer></ToastContainer>
      <div className="flex justify-evenly items-center py-5">
        <h1 className="uppercase font-bold text-[35px]">DPS Withdraw</h1>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="flex justify-around items-center  py-4">
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <img
            className="w-[50px]"
            src={singleDpsData?.data?.memberOfApplying?.memberPhoto}
            alt=""
          />
          <p className="text-[20px]">
            {singleDpsData?.data?.memberOfApplying?.memberName}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <p>Signature:</p>
          <img
            className="w-[80px] h-[40px]"
            src={singleDpsData?.data?.memberOfApplying?.signature}
            alt=""
          />
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaIdCardAlt />
          <p>{singleDpsData?.data?.memberOfApplying?.memberId}</p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaMobileAlt />
          <p>{singleDpsData?.data?.memberOfApplying?.phoneNo}</p>
        </div>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="grid grid-cols-5 mx-10 gap-5 mt-3">
        <div className="grid grid-cols-2 text-center items-center">
          <p className="border bg-white py-1">Package</p>
          <p className="border bg-white py-1">
            {singleDpsAcByIdData?.data?.returnAmount || 0}
          </p>
        </div>
        <div className="grid grid-cols-2 text-center items-center">
          <p className="border bg-white py-1">Depsit</p>
          <p className="border bg-white py-1">{oneAcDpsBalance?.data || 0}</p>
        </div>
        <div className="grid grid-cols-2 text-center items-center">
          <p className="border bg-white py-1">Interest</p>
          <p className="border bg-white py-1">
            {(oneAcDpsBalance?.data / 100) *
              singleDpsAcByIdData?.data?.returnInterest || 0}
          </p>
        </div>
        <div className="grid grid-cols-2 text-center items-center">
          <p className="border bg-white py-1">Payable</p>
          <p className="border bg-white py-1">{payableAmount || 0}</p>
        </div>
        <div className="grid grid-cols-2 text-center items-center">
          <p className="border bg-white py-1">DeadLine</p>
          <p className="border bg-white py-1">
            {singleDpsAcByIdData?.data?.installmentType === "Daily"
              ? singleDpsAcByIdData?.data?.durationOfYear * 365
              : singleDpsAcByIdData?.data?.installmentType === "Weeakly"
              ? singleDpsAcByIdData?.data?.durationOfYear * 52
              : singleDpsAcByIdData?.data?.installmentType === "Monthly"
              ? singleDpsAcByIdData?.data?.durationOfYear * 12
              : 0}
          </p>
        </div>
      </div>

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
              <label className="font-semibold" htmlFor="registeredPackage">
                Select DPS A/C No*
              </label>
              <select
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                id="registeredPackage"
                required
                defaultValue=""
                {...register("registeredPackage")}
                onChange={handleSelectDpsAc}
              >
                <option value="" disabled>
                  Select DPS A/C No
                </option>

                {dpsAcDataLoading
                  ? "Loading..."
                  : dpsAcData?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.dpsAcNo}
                      </option>
                    ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="mrSlipNo">
                Slip / MR. No.*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="text"
                id="mrSlipNo"
                placeholder="Mr Slip No"
                {...register("mrSlipNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="withdrawAmount">
                Amount
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="number"
                id="withdrawAmount"
                value={payableAmount}
                placeholder="Enter Withdraw Amount"
                {...register("withdrawAmount")}
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
                placeholder="Enter Service Charge"
                {...register("serviceCharge")}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="transactionNote">
                Transaction Note
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="text"
                id="transactionNote"
                placeholder="Enter Transaction Note"
                {...register("transactionNote")}
              />
            </div>
          </div>

          <div className="text-center pb-10">
            <input
              className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
              type="submit"
              value={dpsWithdrawLoading ? "Loading..." : "Submit"}
              disabled={dpsWithdrawLoading}
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DpsWithdraw;
