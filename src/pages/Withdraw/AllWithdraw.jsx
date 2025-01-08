import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetAllDpsWithdrawQuery } from "../../redux/features/dpsWithdraw/dpsWithdrawApi";
import { useGetAllSavingWithdrawQuery } from "../../redux/features/savingWithdraw/savingWithdraw";
import { isoDateToTime } from "../../utils/isoDateToTime/isoDateToTime";

const AllWithdraw = () => {
  const { branchEmail } = useGetBranchEmail();

  const { data: allSavingWithdrawData } =
    useGetAllSavingWithdrawQuery(branchEmail);

  const {data: allDpsWithdrawData} = useGetAllDpsWithdrawQuery(branchEmail);

  return (
    <div>
      <div className="mt-[20px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          All Savings Withdraw: {allSavingWithdrawData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[30px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>TxnID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>MR/SlipNo</td>
              <td>Amount</td>
              <td>Company Profit</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {allSavingWithdrawData?.data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.memberId?.memberName}</td>
                <td>{item?.memberId?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Savings</td>
                <td>{item?.mrSlipNo}</td>
                <td>{item?.withdrawAmount}</td>
                <td>{item?.serviceCharge}</td>
                <td>{item?.installmentAmount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan="7" className="text-right">
                Total:
              </td>
              <td>
                {allSavingWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.withdrawAmount || 0),
                  0
                )}
              </td>
              <td>
                {allSavingWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.serviceCharge || 0),
                  0
                )}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-[20px] pb-[10px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          All DPS Withdraw: {allDpsWithdrawData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[30px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>ID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>MR/SlipNo</td>
              <td>Amount</td>
              <td>Company Profit</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {allDpsWithdrawData?.data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?._id}</td>
                <td>{item?.memberOfApplying?.memberName}</td>
                <td>{item?.memberOfApplying?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Dps</td>
                <td>{item?.mrSlipNo}</td>
                <td>{item?.amount}</td>
                <td>{item?.serviceCharge}</td>
                <td>{item?.installmentAmount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan="7" className="text-right">
                Total:
              </td>
              <td>
                {allDpsWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.amount || 0),
                  0
                )}
              </td>
              <td>
                {allDpsWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.serviceCharge || 0),
                  0
                )}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllWithdraw;
