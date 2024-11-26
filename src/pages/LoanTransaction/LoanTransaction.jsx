import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleLoanQuery } from "../../redux/features/loan/loanApi";
import { FaIdCardClip } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import {
  useCreateLoanCollectionMutation,
  useLastLoanCollectionQuery,
  useTotalLoanCollectionQuery,
} from "../../redux/features/loanCollection/loanCollectionApi";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { ToastContainer } from "react-toastify";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import generateUniqueTxnId from "../../utils/createTransactionId/generateTransactionId";

const LoanTransaction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { data: loanData, isLoading: LoanDataQueryLoading } =
    useGetSingleLoanQuery(id);

  const {
    data: totalLoanCollectionData,
    isLoading: totalLoanCollectionLoading,
  } = useTotalLoanCollectionQuery(loanData?.data?.memberOfApplying?.email);

  const { data: lastLoanCollectionData, isLoading: lastLoanCollectionLoading } =
    useLastLoanCollectionQuery(loanData?.data?.memberOfApplying?.email);

  const [createLoanCollection, { isLoading: createLoanCollectionLoading }] =
    useCreateLoanCollectionMutation();

  if (
    LoanDataQueryLoading ||
    totalLoanCollectionLoading ||
    lastLoanCollectionLoading
  ) {
    return <LoadingComponent></LoadingComponent>;
  }

  const {
    _id,
    loanAmount,
    loanNo,
    startDate,
    installmentMode,
    branchEmail,
    companyEmail,
  } = loanData?.data || {};

  const onSubmit = async (data) => {
    const loanTransactionData = {
      loanId: _id,
      memberId: loanData?.data?.memberOfApplying?._id,
      transactionId: generateUniqueTxnId(),
      memberEmail: loanData?.data?.memberOfApplying?.email,
      branchEmail: branchEmail,
      companyEmail: companyEmail,
      date: data.date,
      installmentAmount: Number(data.installmentAmount),
      penaltyAmount: Number(data.penaltyAmount),
      transactionNote: data.transactionNote,
    };

    const res = await createLoanCollection(loanTransactionData);

    if (res?.data?.success === true) {
      dispatch(setToastMessage("Loan Collection Successfully!"));
      reset();
      navigate("/dashboard/loan-transaction");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <h1 className="text-center font-bold text-[35px] py-2 uppercase">
        Loan Transaction
      </h1>

      <div>
        <hr />
        <div className="flex justify-around py-1">
          <div className="flex items-center gap-3">
            <img
              className="w-[70px]"
              src={loanData?.data?.memberOfApplying?.memberPhoto}
              alt=""
            />
            <h1 className="text-[30px] font-semibold">
              {loanData?.data?.memberOfApplying?.memberName}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <FaIdCardClip className="text-[30px]" />
            <p className="text-[30px] font-semibold">
              {loanData?.data?.memberOfApplying?.memberId}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlinePhoneIphone className="text-[30px]" />
            <p className="text-[30px] font-semibold">
              {loanData?.data?.memberOfApplying?.phoneNo}
            </p>
          </div>
        </div>
        <hr />
      </div>

      <div className="grid grid-cols-4 gap-4 px-8 py-5">
        <div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Disbursement
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">
              {loanAmount}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Outstanding
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">
              {loanAmount - totalLoanCollectionData?.data}
            </p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Interest
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">
              {(installmentMode?.totalReceivable - loanAmount).toFixed(2)}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Loan No
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1 up">{loanNo}</p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Receivable
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">
              {installmentMode?.totalReceivable}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Loan Start
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">{startDate}</p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Received
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">
              {totalLoanCollectionData?.data}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <h2 className="border bg-white text-[18px] font-semibold px-4 py-1 uppercase">
              Last Txn
            </h2>
            <p className="border bg-white text-[18px] px-4 py-1">
              {timeFormat(lastLoanCollectionData?.data?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4 px-8">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="date">
                Date*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="date"
                {...register("date")}
                required={true}
                value={todayDateFormated()}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="installmentAmount">
                Installment Amount (কিস্তির পরিমাণ)*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Installment Amount"
                type="number"
                id="installmentAmount"
                {...register("installmentAmount")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="penaltyAmount">
                Penalty Amount (জরিমানা)
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Penalty Amount"
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
              disabled={createLoanCollectionLoading}
            >
              {createLoanCollectionLoading ? (
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

export default LoanTransaction;
