import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { useGetAllSavingTransactionQuery } from "../../redux/features/savingTransaction/savingTransactionApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";

const SavingTransaction = () => {
  const transactionRef = useRef();
  const [istransactionRef, setIsTransactionRef] = useState();

  const { data: membershipData, isLoading: membershipQueryLoading } =
    useGetAllMembershipQuery();
  const { data: savingTxnData, isLoading: savingTxnQueryLaoding } =
    useGetAllSavingTransactionQuery();

  if (membershipQueryLoading || savingTxnQueryLaoding) {
    return <p>Loading...</p>;
  }

  const handleSelectChange = () => {
    const selectedValue = transactionRef.current.value;
    setIsTransactionRef(selectedValue);
  };

  return (
    <div className="pt-[60px]">
      <div className="max-w-[580px] mx-auto bg-white p-8 rounded-lg">
        <div>
          <h1 className="text-[40px] font-bold text-center">
            Saving Transaction
          </h1>
          <div className="flex flex-col my-8">
            <select
              className="py-2 px-2 my-1 rounded-sm membershipInput border"
              onChange={handleSelectChange}
              ref={transactionRef}
              aria-required
            >
              <option>Select Member</option>
              {membershipData?.data.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.memberName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-center">
          <NavLink
            to={
              istransactionRef === undefined
                ? ""
                : `/dashboard/saving-transaction-check/${istransactionRef}`
            }
            className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointerm transition-all duration-300 ease-in-out"
          >
            Find Saving A/C
          </NavLink>
        </div>
      </div>

      <div className="p-10">
        <table className="max-w-[100%] w-[100%] mx-auto">
          <thead className="bg-slate-600 text-white uppercase">
            <tr>
              <th className="text-center">TxnId</th>
              <th className="text-center">Member</th>
              <th className="text-center">Date</th>
              <th className="text-center">Txn Type</th>
              <th className="text-center">Txn Note</th>
              <th className="text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {savingTxnData?.data?.map((item) => (
              <tr key={item._id}>
                <td className="text-center">{item.transactionId}</td>
                <td className="text-center">{item.memberId.memberName}</td>
                <td className="text-center">{timeFormat(item.createdAt)}</td>
                <td className="text-center">{item.transactionType}</td>
                <td className="text-center">{item.savingTransactionInfo}</td>
                <td className="text-center">{item.savingAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavingTransaction;
