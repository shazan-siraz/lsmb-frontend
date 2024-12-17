/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useUpdateSavingTransactionMutation } from "../../redux/features/savingCollection/savingCollectionApi";

const SavingTransactionModal = ({ savingModalData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const showModal = () => {
    setOpen(true);
  };

  const [updateSavingTxn, { isLoading: updateSavingTxnLoading }] =
    useUpdateSavingTransactionMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateSavingTxnData = {
        id: savingModalData._id,
        amount: Number(data.amount),
        transactionNote: data.transactionNote,
      };

      const res = await updateSavingTxn(updateSavingTxnData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p onClick={showModal}>
        <FaEdit className="text-[20px]" />
      </p>
      <Modal
        open={open}
        title="Saving Transaction Edit"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5 items-center py-5 px-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="number"
                  id="amount"
                  defaultValue={savingModalData?.savingsAmount}
                  placeholder="Enter Amount"
                  {...register("amount")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="txnNote">
                  Transaction Note
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded-sm employeeInput"
                  type="text"
                  id="txnNote"
                  defaultValue={savingModalData?.transactionNote}
                  placeholder="Transaction Note"
                  {...register("transactionNote")}
                />
              </div>
            </div>

            <div className="text-center">
              <input
                onClick={updateSavingTxnLoading ? null : handleCancel}
                className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                type="submit"
                value={updateSavingTxnLoading ? "Loading..." : "Submit"}
                disabled={updateSavingTxnLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SavingTransactionModal;
