/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import { useGetAllExpenseCategoryQuery } from "../../redux/features/expenseCategory/expenseCategoryApi";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useUpdateExpenseMutation } from "../../redux/features/expense/expenseApi";

const BranchExpenseModal = ({ modalData }) => {
  const { branchEmail } = useGetBranchEmail();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { data: expenseCategoryData, isLoading: expenseCategoryLoading } =
    useGetAllExpenseCategoryQuery(branchEmail);

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const [updateExpense, { isLoading: updateExpenseLoading }] =
    useUpdateExpenseMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateBranchExpenseData = {
        id: modalData._id,
        expenseData: {
          date: data.date,
          expenseType: data.expenseType,
          amount: Number(data.amount),
          note: data.note,
          preparedBy: data.preparedBy,
          approvedBy: data.approvedBy,
          mrSlipNo: data.mrSlipNo,
        },
      };

      const res = await updateExpense(updateBranchExpenseData);

      if (res?.data) {
        dispatch(setToastMessage("Expense Updated Successfully!"));
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
        title="Branch Expense Modal Update"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <hr className="my-[15px]" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-1 mx-5 items-center">
              <div className="flex-1">
                <label className="font-bold" htmlFor="date">
                  Date*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="date"
                  defaultValue={modalData?.date}
                  type="date"
                  {...register("date")}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="expenseType">
                  Expense Type*
                </label>
                <select
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="expenseType"
                  defaultValue={modalData?.expenseType?.categoryTitle}
                  type="date"
                  {...register("expenseType")}
                >
                  <option value="" disabled>
                    Select Expense Type
                  </option>
                  {expenseCategoryLoading
                    ? "Loading..."
                    : expenseCategoryData?.data?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item?.categoryTitle}
                        </option>
                      ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="amount">
                  Amount*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="amount"
                  defaultValue={modalData?.amount}
                  type="number"
                  {...register("amount")}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="note">
                  Note*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="note"
                  defaultValue={modalData?.note}
                  type="text"
                  {...register("note")}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="preparedBy">
                  Prepared By*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="preparedBy"
                  defaultValue={modalData?.preparedBy}
                  type="text"
                  {...register("preparedBy")}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="approvedBy">
                  Approved By*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="approvedBy"
                  defaultValue={modalData?.approvedBy}
                  type="text"
                  {...register("approvedBy")}
                />
              </div>

              <div className="flex-1">
                <label className="font-bold" htmlFor="mrSlipNo">
                  Slip No*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="mrSlipNo"
                  defaultValue={modalData?.mrSlipNo}
                  type="text"
                  {...register("mrSlipNo")}
                />
              </div>

              <div className="text-center">
                <input
                  className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                  type="submit"
                  value={updateExpenseLoading ? "Loading..." : "Submit"}
                  disabled={updateExpenseLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BranchExpenseModal;
