import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import {
  useDeleteSavingTransactionMutation,
  useTodaySavingCollectionQuery,
} from "../../redux/features/savingCollection/savingCollectionApi";
import { isoDateToTime } from "../../utils/isoDateToTime/isoDateToTime";
import { MdDelete } from "react-icons/md";
import SavingTransactionModal from "./SavingTransactionModal";
import Swal from "sweetalert2";
import { useDeleteLoanCollectionMutation, useTodayLoanCollectionQuery } from "../../redux/features/loanCollection/loanCollectionApi";
import LoanTransactionModal from "./LoanTransactionModal";
import { useTodayDpsCollectionQuery } from "../../redux/features/dpsCollection/dpsCollectionApi";

const TodayTransaction = () => {
  const { branchEmail } = useGetBranchEmail();

  const { data: toadySavingTxnData } =
    useTodaySavingCollectionQuery(branchEmail);

  const { data: toadyLoanTxnData } = useTodayLoanCollectionQuery(branchEmail);
  const {data: todayDpsTxnData} = useTodayDpsCollectionQuery(branchEmail);

  console.log(todayDpsTxnData?.data);

  const [deleteSavingTxn] = useDeleteSavingTransactionMutation();
  const [deleteLoanCollection] = useDeleteLoanCollectionMutation();

  const handleDeleteSavingTxn = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure Delete SavingTxn?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteSavingTxn({ id });

        if (res?.data) {
          await Swal.fire({
            title: "Deleted!",
            text: "Saving Transaction is deleted.",
            icon: "success",
          });
        }

        if (res?.error) {
          Swal.fire({
            title: "Error!",
            text: `${res?.error?.message}`,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);

        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the transaction.",
          icon: "error",
        });
      }
    }
  };

  const handleDeleteLoanTxn = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure Delete Loan Txn?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteLoanCollection({ id });

        if (res?.data) {
          await Swal.fire({
            title: "Deleted!",
            text: "Loan Transaction is deleted!",
            icon: "success",
          });
        }

        if (res?.error) {
          Swal.fire({
            title: "Error!",
            text: `${res?.error?.message}`,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);

        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the transaction.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className="mb-[20px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          Today Saving Transaction: {toadySavingTxnData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[60px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>TxnID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>Txn Note</td>
              <td>Amount</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {toadySavingTxnData?.data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.memberId?.memberName}</td>
                <td>{item?.memberId?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Saving</td>
                <td>{item?.transactionNote}</td>
                <td>{item?.savingsAmount}</td>
                <td>
                  <div className="flex justify-center gap-5">
                    <button className="hover:text-blue-500">
                      <SavingTransactionModal
                        savingModalData={item}
                      ></SavingTransactionModal>
                    </button>
                    <button
                      onClick={() => handleDeleteSavingTxn(item?._id)}
                      className="hover:text-blue-500"
                    >
                      <MdDelete className="text-[22px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-[20px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          Today Loan Transaction: {toadyLoanTxnData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[60px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>TxnID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>Txn Note</td>
              <td>penaltyAmount</td>
              <td>Amount</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {toadyLoanTxnData?.data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.memberId?.memberName}</td>
                <td>{item?.memberId?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Loan</td>
                <td>{item?.transactionNote}</td>
                <td>{item?.penaltyAmount}</td>
                <td>{item?.installmentAmount}</td>
                <td>
                  <div className="flex justify-center gap-5">
                    <button className="hover:text-blue-500">
                      <LoanTransactionModal loanTxnData={item}></LoanTransactionModal>
                    </button>
                    <button
                      onClick={() => handleDeleteLoanTxn(item?._id)}
                      className="hover:text-blue-500"
                    >
                      <MdDelete className="text-[22px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-[20px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          Today DPS Transaction: {todayDpsTxnData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[60px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>TxnID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>Txn Note</td>
              <td>penaltyAmount</td>
              <td>Amount</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {todayDpsTxnData?.data.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.memberOfApplying?.memberName}</td>
                <td>{item?.memberOfApplying?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>DPS</td>
                <td>{item?.transactionNote}</td>
                <td>{item?.penaltyAmount}</td>
                <td>{item?.dpsCollectionAmount}</td>
                <td>
                  <div className="flex justify-center gap-5">
                    <button className="hover:text-blue-500">
                      <LoanTransactionModal loanTxnData={item}></LoanTransactionModal>
                    </button>
                    <button
                      onClick={() => handleDeleteLoanTxn(item?._id)}
                      className="hover:text-blue-500"
                    >
                      <MdDelete className="text-[22px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayTransaction;
