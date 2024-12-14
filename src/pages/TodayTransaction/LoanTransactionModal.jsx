/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useUpdateLoanCollectionMutation } from "../../redux/features/loanCollection/loanCollectionApi";

const LoanTransactionModal = ({ loanTxnData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const showModal = () => {
    setOpen(true);
  };

  const [updateLoanCollection, { isLoading: updateLoanCollectionLoading }] =
    useUpdateLoanCollectionMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateLoanData = {
        id: loanTxnData?._id,
        installmentAmount: Number(data.amount),
        penaltyAmount: Number(data.penaltyAmount),
        transactionNote: data.transactionNote,
      };

      await updateLoanCollection(updateLoanData);

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
        title={`${loanTxnData?.memberId?.memberName} Loan Transaction Edit`}
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
                  defaultValue={loanTxnData?.installmentAmount}
                  placeholder="Enter Amount"
                  {...register("amount")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="amount">
                  Penalty Amount
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="number"
                  id="amount"
                  defaultValue={loanTxnData?.penaltyAmount}
                  placeholder="Enter Penalty Amount"
                  {...register("penaltyAmount")}
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
                  defaultValue={loanTxnData?.transactionNote}
                  placeholder="Transaction Note"
                  {...register("transactionNote")}
                />
              </div>
            </div>

            <div className="text-center">
              <input
                onClick={updateLoanCollectionLoading ? null : handleCancel}
                className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                type="submit"
                value={updateLoanCollectionLoading ? "Loading..." : "Submit"}
                disabled={updateLoanCollectionLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoanTransactionModal;
