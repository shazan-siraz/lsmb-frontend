import { useForm } from "react-hook-form";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { useGetAllBankingQuery } from "../../redux/features/banking/bankingApi";
import { toast, ToastContainer } from "react-toastify";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import {
  useCreateBankTransactionMutation,
  useGetAllBankTransactionQuery,
} from "../../redux/features/bankTransaction/bankTransactionApi";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import isToday from "../../utils/isToday/isToday";
import BankTxnModal from "./BankTxnModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";
import { useBranchWallet } from "../../hooks/useBranchWallet";

const BankTransaction = () => {
  const { branchEmail } = useGetBranchEmail();
  const { branchWallet } = useBranchWallet();
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(clearToastMessage()); // টোস্ট মেসেজটি ক্লিয়ার করুন
    }
  }, [toastMessage, dispatch]);

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: bankingQueryData, isLoading: bankingQueryLoading } =
    useGetAllBankingQuery(branchEmail);

  const { data: bankTransactionData } =
    useGetAllBankTransactionQuery(branchEmail);

  const [createBankTransaction, { isLoading: createBankTransactionLoading }] =
    useCreateBankTransactionMutation();

  const onSubmit = async (data) => {
    try {
      if (data.txnType === "cashOut" && data.amount > branchWallet) {
        toast.error("Insufficient Balance!");
      } else {
        const bankTxnData = {
          bankId: data.bankId,
          txnType: data.txnType,
          date: data.date,
          amount: Number(data.amount),
          note: data.note,
          branchEmail: branchEmail,
          companyEmail: singleBranchData?.data?.companyEmail,
        };

        const res = await createBankTransaction(bankTxnData);

        if (res?.data) {
          toast.success("Bank Transaction Successfully!");
          reset();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div>
        <h1 className="font-bold text-[22px] px-[20px] py-[10px]">
          Bank Transaction
        </h1>
        <hr className="border" />
      </div>

      <div className="mx-[20px] my-[10px]">
        <ToastContainer></ToastContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 items-center">
            <div className="flex-1">
              <select
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                required
                defaultValue=""
                {...register("bankId")}
              >
                <option value="" disabled>
                  Select Bank A/C
                </option>
                {bankingQueryLoading
                  ? "Loading..."
                  : bankingQueryData?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item?.shortName} - {item?.acNo}
                      </option>
                    ))}
              </select>
            </div>

            <div className="flex-1">
              <select
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                required
                defaultValue=""
                {...register("txnType")}
              >
                <option value="" disabled>
                  Txn Type
                </option>
                <option value="addMoney">Add Money</option>
                <option value="cashOut">Cash Out</option>
              </select>
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="date"
                defaultValue={todayDateFormated()}
                {...register("date")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Enter Amount"
                type="number"
                {...register("amount")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Enter Note"
                type="text"
                {...register("note")}
              />
            </div>
            <div className="text-center">
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-10 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
                type="submit"
                value={createBankTransactionLoading ? "Loading..." : "Submit"}
                disabled={createBankTransactionLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="px-5 py-8">
        <table className="employeeTable">
          <thead className="bg-slate-600 text-white uppercase">
            <tr>
              <th className="text-center">SL</th>
              <th className="text-center">TxnId</th>
              <th className="text-center">Bank Name</th>
              <th className="text-center">Holder Name</th>
              <th className="text-center">A/C No</th>
              <th className="text-center">Date</th>
              <th className="text-center">Txn Type</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Note</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bankTransactionData?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item?._id}</td>
                <td>{item?.bankId?.bankName}</td>
                <td>{item?.bankId?.holderName}</td>
                <td>{item?.bankId?.acNo}</td>
                <td>{timeFormat(item?.date)}</td>
                <td className="text-red-500 font-semibold">
                  {item?.txnType === "addMoney" ? "Add Money" : "Cash Out"}
                </td>
                <td>{item?.amount}</td>
                <td>{item?.note}</td>
                <td className="text-center">
                  {isToday(item?.date) && (
                    <button>
                      <BankTxnModal modalData={item}></BankTxnModal>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankTransaction;
