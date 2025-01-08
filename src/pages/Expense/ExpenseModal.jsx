/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";
import { useUpdateExpenseCategoryMutation } from "../../redux/features/expenseCategory/expenseCategoryApi";

const ExpenseModal = ({ modalData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const [updateExpenseCategory, { isLoading: updateExpenseCategoryLoading }] =
    useUpdateExpenseCategoryMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateExpenseData = {
        id: modalData._id,
        expenseData: {
          categoryTitle: data.categoryTitle,
        },
      };

      const res = await updateExpenseCategory(updateExpenseData);

      if (res?.data) {
        dispatch(setToastMessage("Expense Category Updated Successfully!"));
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
        title="Expense Modal Update"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <hr className="my-[15px]" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3 mx-5 items-center">
              <div className="flex-1">
                <label className="font-bold" htmlFor="categoryTitle">
                  Category Title*
                </label>
                <input
                  className="py-2 px-2 my-1 border w-full rounded-sm membershipInput"
                  id="categoryTitle"
                  defaultValue={modalData?.categoryTitle}
                  type="text"
                  {...register("categoryTitle")}
                />
              </div>

              <div className="text-center">
                <input
                  className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                  type="submit"
                  value={updateExpenseCategoryLoading ? "Loading..." : "Submit"}
                  disabled={updateExpenseCategoryLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseModal;
