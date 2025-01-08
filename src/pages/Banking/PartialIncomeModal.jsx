/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import { useUpdatePartialIncomeMutation } from "../../redux/features/partialIncome/partialIncomeApi";

const PartialIncomeModal = ({ modalData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const [updatePartialIncome, { isLoading: partialIncomeUpdateLoading }] =
    useUpdatePartialIncomeMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateData = {
        id: modalData._id,
        partialIncomeUpdateData: {
          incomeType: data?.incomeType,
          date: data?.date,
          amount: Number(data?.amount),
          note: data?.note,
        },
      };

      const res = await updatePartialIncome(updateData);

      if (res?.data) {
        dispatch(setToastMessage("Partial Income Updated Successfully!"));
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
        title="Update Partial Income"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3 items-center py-5 px-5">
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="incomeType">
                  Income Type*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="text"
                  id="incomeType"
                  defaultValue={modalData?.incomeType}
                  placeholder="Bank Name"
                  {...register("incomeType")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="amount">
                  Date*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="date"
                  id="amount"
                  defaultValue={modalData?.date}
                  placeholder="Bank Name"
                  {...register("date")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="amount">
                  Amount*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="number"
                  id="amount"
                  defaultValue={modalData?.amount}
                  placeholder="Amount"
                  {...register("amount")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="note">
                  Note*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="text"
                  id="note"
                  defaultValue={modalData?.note}
                  placeholder="Note"
                  {...register("note")}
                  required={true}
                />
              </div>
            </div>

            <div className="text-center">
              <input
                className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                type="submit"
                value={partialIncomeUpdateLoading ? "Loading..." : "Update"}
                disabled={partialIncomeUpdateLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PartialIncomeModal;
