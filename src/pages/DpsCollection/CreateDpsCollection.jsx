import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleDpsByIdQuery } from "../../redux/features/dps/dpsApi";
import { FaIdCard } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import {
  useCreateDpsCollectionMutation,
  useGetTotalDpsBalaceByOneDpsAcQuery,
} from "../../redux/features/dpsCollection/dpsCollectionApi";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import generateUniqueTxnId from "../../utils/createTransactionId/generateTransactionId";

const CreateDpsCollection = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: singleDpsData } = useGetSingleDpsByIdQuery(id);
  const [createDpsCollection, { isLoading: dpsCollectionMutationLoading }] =
    useCreateDpsCollectionMutation();
  const { data: totalDpsBalance } = useGetTotalDpsBalaceByOneDpsAcQuery(
    singleDpsData?.data?.dpsAcNo,
    {
      skip: !singleDpsData?.data?.dpsAcNo,
    }
  );

  const onSubmit = async (data) => {
    try {
      const dpsCollectionData = {
        memberOfApplying: singleDpsData?.data?.memberOfApplying?._id,
        memberName: singleDpsData?.data?.memberName,
        memberPhoneNo: singleDpsData?.data?.memberPhoneNo,
        branchEmail: singleDpsData?.data?.branchEmail,
        companyEmail: singleDpsData?.data?.companyEmail,
        dpsId: singleDpsData?.data?._id,
        transactionId: generateUniqueTxnId(),
        dateOfCollection: data.dateOfCollection,
        dpsAcNo: singleDpsData?.data?.dpsAcNo,
        dpsCollectionAmount: Number(data.dpsCollectionAmount),
        penaltyAmount: Number(data.penaltyAmount),
        transactionNote: data.transactionNote,
      };

      const res = await createDpsCollection(dpsCollectionData);

      if (res?.data?.success === true) {
        dispatch(setToastMessage("DPS Collection Successfully!"));
        reset();
        navigate("/dashboard/dps-collection");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div>
        <h1 className="text-center uppercase font-bold text-[30px] py-1">
          Dps Transaction
        </h1>
      </div>

      <hr />
      <div className="flex justify-evenly">
        <div>
          <div className="flex items-center gap-3">
            <img
              className="w-[60px] h-[60px]"
              src={singleDpsData?.data?.memberOfApplying?.memberPhoto}
              alt=""
            />
            <h3 className="font-semibold text-[25px]">
              {singleDpsData?.data?.memberName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaIdCard className="text-[25px]"></FaIdCard>
          <p className="font-semibold text-[25px]">
            {singleDpsData?.data?.memberOfApplying?.memberId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MdPhoneAndroid className="text-[25px]"></MdPhoneAndroid>
          <p className="font-semibold text-[25px]">
            {singleDpsData?.data?.memberOfApplying?.phoneNo}
          </p>
        </div>
      </div>
      <hr />

      <div className="flex justify-around py-5">
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-[18px] font-semibold">
            DPS Balance
          </p>
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            {totalDpsBalance?.data}
          </p>
        </div>
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-[18px] font-semibold">
            {singleDpsData?.data?.installmentType}
          </p>
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            {singleDpsData?.data?.startingBalance}
          </p>
        </div>
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-[18px] font-semibold">
            Last Transaction
          </p>
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            0
          </p>
        </div>
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            0
          </p>
          <p className="border px-5 py-2 text-[18px] font-semibold">Days Ago</p>
        </div>
      </div>
      <hr />

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4 px-8">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dateOfCollection">
                Date*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="dateOfCollection"
                {...register("dateOfCollection")}
                required={true}
                value={todayDateFormated()}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dpsAcNo">
                DPS A/C No*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="dpsAcNo"
                {...register("dpsAcNo")}
                required={true}
                value={singleDpsData?.data?.dpsAcNo || ""}
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dpsCollectionAmount">
                Amount*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Enter Deposit Amount"
                type="number"
                id="dpsCollectionAmount"
                {...register("dpsCollectionAmount")}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="penaltyAmount">
                Penalty Amount*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Enter Penalty Amount"
                type="number"
                id="penaltyAmount"
                {...register("penaltyAmount")}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="transactionNote">
                Transaction Note
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Transaction Note"
                type="text"
                id="transactionNote"
                {...register("transactionNote")}
              />
            </div>
          </div>

          <div className="border-b border-slate-300 my-5"></div>

          <div className="text-center">
            <button
              className="border border-blue-500 py-2 px-20 rounded hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
              type="submit"
              disabled={dpsCollectionMutationLoading}
            >
              {dpsCollectionMutationLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <ToastContainer></ToastContainer>
        </form>
      </div>
    </div>
  );
};

export default CreateDpsCollection;
