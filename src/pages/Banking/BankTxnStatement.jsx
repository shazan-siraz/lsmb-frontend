import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { useGetAllBankingQuery } from "../../redux/features/banking/bankingApi";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useSearchBankTxnQuery } from "../../redux/features/bankTransaction/bankTransactionApi";
import { useState } from "react";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import getOneMonthAgo from "../../utils/getOneMonthAgoDate/getOneMonthAgoDate";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import formatDateAndTimeForPrint from "../../utils/dateAndTimeForPrint/dateAndTimeForPrint";

const BankTxnStatement = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit } = useForm();
  const [bankId, setBankId] = useState();
  const [startDate, setStartDate] = useState(getOneMonthAgo());
  const [endDate, setEndDate] = useState(todayDateFormated());

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: bankingQueryData, isLoading: bankingQueryLoading } =
    useGetAllBankingQuery(branchEmail);

  const { data: searchBankTxnQueryData, isLoading: searchBankTxnLoading } =
    useSearchBankTxnQuery({
      email: branchEmail,
      bankId: bankId || undefined,
      startDate: startDate,
      endDate: endDate,
    });

  const totalAddMoney = searchBankTxnQueryData?.data
    ?.filter((txn) => txn.txnType === "addMoney")
    ?.reduce((sum, txn) => sum + txn.amount, 0); 

  const totalCashOut = searchBankTxnQueryData?.data
    ?.filter((txn) => txn.txnType === "cashOut")
    ?.reduce((sum, txn) => sum + txn.amount, 0); 

  const onSubmit = async (data) => {
    try {
      setBankId(data.bankId);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="py-[30px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-5 px-10 mx-auto">
            <div className="flex-1">
              <select
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
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

            <div>
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="date"
                {...register("startDate")}
                required={true}
              />
            </div>

            <div>
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="date"
                defaultValue={todayDateFormated()}
                {...register("endDate")}
                required={true}
              />
            </div>

            <div>
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-10 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
                type="submit"
                value={searchBankTxnLoading ? "Loading..." : "Submit"}
                disabled={searchBankTxnLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white py-[30px] px-[20px]" ref={contentRef}>
        <div className="px-6 flex justify-between">
          <div>
            <h2 className="font-bold text-[25px]">
              {singleBranchData?.data?.branchName}
            </h2>
            <p className="font-semibold">
              Address: {singleBranchData?.data?.branchAddress}
            </p>
            <p>Email: {singleBranchData?.data?.branchEmail}</p>
            <p>Phone: {singleBranchData?.data?.branchMobile}</p>
          </div>
          <div>
            <h1 className="font-bold text-[25px]">
              Bank Transaction Statement
            </h1>
            <p>
              Reporting Date: {formatDateAndTimeForPrint()}
            </p>
          </div>
        </div>

        <hr className="border my-[20px]" />

        <div>
          <div className="px-5">
            <table className="employeeTable">
              <thead className="bg-slate-600 text-white uppercase text-[14px]">
                <tr>
                  <th className="text-center">SL</th>
                  <th className="text-center">Txn Id</th>
                  <th className="text-center">Txn Date</th>
                  <th className="text-center">Entry Date</th>
                  <th className="text-center">Bank Name</th>
                  <th className="text-center">Holder Name</th>
                  <th className="text-center">Account</th>
                  <th className="text-center">Txn Type</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Txn By</th>
                </tr>
              </thead>
              <tbody>
                {searchBankTxnQueryData?.data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1} </td>
                    <td>{item._id.slice(0, 8)} </td>
                    <td>{timeFormat(item?.date)}</td>
                    <td>{timeFormat(item?.createdAt)}</td>
                    <td>{item?.bankId?.bankName}</td>
                    <td>{item?.bankId?.holderName}</td>
                    <td>{item?.bankId?.acNo}</td>
                    <td className="text-red-500 font-semibold">
                      {item?.txnType === "addMoney" ? "Add Money" : "Cash Out"}
                    </td>
                    <td>{item?.amount}</td>
                    <td>{singleBranchData?.data?.branchName}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="font-semibold">Total Add Money</td>
                  <td className="font-semibold">{totalAddMoney}</td>
                  <td colSpan={2} className="font-semibold">Total Cash Out</td>
                  <td className="font-semibold">{totalCashOut}</td>
                  <td colSpan={2} className="font-semibold">Balance</td>
                  <td className="font-semibold">{totalAddMoney - totalCashOut}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white pb-3 pr-9 flex justify-between">
        <div></div>
        <button
          className="bg-slate-50 border rounded-sm px-3 py-1 text-right flex items-center gap-2"
          onClick={() => reactToPrintFn()}
        >
          <FaPrint />
          Print
        </button>
      </div>
    </div>
  );
};

export default BankTxnStatement;
