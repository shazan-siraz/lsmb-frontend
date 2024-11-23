import { useParams } from "react-router-dom";
import { useGetSingleMembershipQuery } from "../../redux/features/membership/membershipApi";
import { FaIdCardClip } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { FaDatabase } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import generateUniqueTxnId from "../../utils/createTransactionId/generateTransactionId";
import { useCreateSavingCollectionMutation } from "../../redux/features/savingCollection/savingCollectionApi";

const SavingTransaction = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  const { data: singleMemberData, isLoading: singleMemberQueryLoading } =
    useGetSingleMembershipQuery(id);

  const [createSavingCollection, { isLoading: createSavingCollectionLoading }] =
    useCreateSavingCollectionMutation();

  if (singleMemberQueryLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const onSubmit = async (data) => {
    const SavingCollectionData = {
      memberId: singleMemberData?.data._id,
      memberEmail: singleMemberData?.data?.email,
      branchEmail: singleMemberData?.data?.branchEmail,
      companyEmail: singleMemberData?.data?.companyEmail,
      dateOfCollection: data.dateOfCollection,
      savingsAmount: Number(data.savingsAmount),
      transactionId: generateUniqueTxnId(),
      transactionNote: data.transactionNote,
    };

    const res = await createSavingCollection(SavingCollectionData);

    if (res?.data) {
      toast.success(`Saving Collection Successfully`);
      reset();
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-[35px] py-2 uppercase">
        Savings Transaction
      </h1>

      <div>
        <hr />
        <div className="flex justify-around py-1">
          <div className="flex items-center gap-3">
            <img
              className="w-[70px]"
              src={singleMemberData?.data?.memberPhoto}
              alt=""
            />
            <h1 className="text-[30px] font-semibold">
              {singleMemberData?.data?.memberName}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <FaIdCardClip className="text-[30px]" />
            <p className="text-[30px] font-semibold">
              {singleMemberData?.data?.memberId}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlinePhoneIphone className="text-[30px]" />
            <p className="text-[30px] font-semibold">
              {singleMemberData?.data?.phoneNo}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaDatabase className="text-[30px]" />
            <p className="text-[30px] font-semibold">
              {singleMemberData?.data?.accountBalance}
            </p>
          </div>
        </div>
        <hr />
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4 px-8">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="date">
                Date Of Collection*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="date"
                {...register("dateOfCollection")}
                required={true}
                value={todayDateFormated()}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="installmentAmount">
                Savings Amount*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Savings Amount"
                type="number"
                id="installmentAmount"
                {...register("savingsAmount")}
                required={true}
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
              disabled={createSavingCollectionLoading}
            >
              {createSavingCollectionLoading ? (
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

export default SavingTransaction;
