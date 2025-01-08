/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useGetAllBankingQuery } from "../../redux/features/banking/bankingApi";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useUpdateBankTransactionMutation } from "../../redux/features/bankTransaction/bankTransactionApi";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";

const BankTxnModal = ({ modalData }) => {
  const { branchEmail } = useGetBranchEmail();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const { data: bankingQueryData, isLoading: bankingQueryLoading } =
    useGetAllBankingQuery(branchEmail);

  const [updateBankingTxn, { isLoading: updateBankTxnLoading }] =
    useUpdateBankTransactionMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateTxnData = {
        id: modalData._id,
        bankTxnData: {
          bankId: data?.bankId,
          txnType: data?.txnType,
          amount: Number(data?.amount),
          note: data?.note,
        },
      };

      const res = await updateBankingTxn(updateTxnData);

      if (res?.data) {
        dispatch(setToastMessage("Bank Txn Updated Successfully!"));
        reset();
        handleCancel();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p onClick={showModal}>
        <FaEdit />
      </p>
      <Modal
        open={open}
        className="text-[25px]"
        title="Bank Transaction Update"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <hr className="my-[15px]" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3 mx-5 items-center">
              <div>
                <label className="font-bold" htmlFor="bankId">
                  Select Bank A/C
                </label>
                <select
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  required
                  defaultValue=""
                  id="bankId"
                  {...register("bankId")}
                >
                  <option value="" disabled>
                    Select Bank A/C*
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
                <label className="font-bold" htmlFor="txnType">
                  Transaction Type*
                </label>
                <select
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  required
                  id="txnType"
                  defaultValue={modalData?.txnType}
                  {...register("txnType")}
                >
                  <option value="" disabled>
                    Txn Type*
                  </option>
                  <option value="addMoney">Add Money</option>
                  <option value="cashOut">Cash Out</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="date">
                  Date*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  type="date"
                  id="date"
                  defaultValue={todayDateFormated()}
                  {...register("date")}
                  required={true}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="amount">
                  Amount*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  placeholder="Enter Amount"
                  id="amount"
                  defaultValue={modalData?.amount}
                  type="number"
                  {...register("amount")}
                  required={true}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="note">
                  Note
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  placeholder="Enter Note"
                  id="note"
                  defaultValue={modalData?.note}
                  type="text"
                  {...register("note")}
                />
              </div>

              <div className="text-center">
                <input
                  // onClick={updateBankTxnLoading ? null : handleCancel}
                  className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                  type="submit"
                  value={updateBankTxnLoading ? "Loading..." : "Submit"}
                  disabled={updateBankTxnLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BankTxnModal;
