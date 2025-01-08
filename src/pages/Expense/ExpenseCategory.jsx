import { useForm } from "react-hook-form";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { toast, ToastContainer } from "react-toastify";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import ExpenseModal from "./ExpenseModal";
import {
  useCreateExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
} from "../../redux/features/expenseCategory/expenseCategoryApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";

const ExpenseCategory = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(clearToastMessage());
    }
  }, [toastMessage, dispatch]);

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: expenseCategoryData } =
    useGetAllExpenseCategoryQuery(branchEmail);

  const [createExpenseCategory, { isLoading: expenseCategoryLoading }] =
    useCreateExpenseCategoryMutation();

  const onSubmit = async (data) => {
    try {
      const expenseCategoryData = {
        categoryTitle: data.categoryTitle,
        branchEmail: branchEmail,
        companyEmail: singleBranchData?.data?.companyEmail,
      };

      const res = await createExpenseCategory(expenseCategoryData);

      if (res?.data) {
        toast.success("Expense Category Successfully!");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div>
        <h1 className="font-bold text-[22px] px-[20px] py-[10px]">
          Expense Category List
        </h1>
        <hr className="border" />
      </div>

      <div className="mx-[20px] my-[10px]">
        <ToastContainer></ToastContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="">
              <input
                className="py-2 px-2 w-[450px] my-1 rounded-sm membershipInput"
                placeholder="Category Title"
                type="text"
                {...register("categoryTitle")}
                required={true}
              />
            </div>

            <div className="text-center">
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-10 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
                type="submit"
                value={expenseCategoryLoading ? "Loading..." : "Submit"}
                disabled={expenseCategoryLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="px-5 py-8">
        <table className="employeeTable">
          <thead className="bg-slate-600 text-white uppercase">
            <tr>
              <th className="text-center">SL</th>
              <th className="text-center">Title</th>
              <th className="text-center">Create</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenseCategoryData?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item?.categoryTitle}</td>
                <td>{timeFormat(item?.createdAt)}</td>
                <td className="text-center">
                  <button>
                    <ExpenseModal modalData={item}></ExpenseModal>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseCategory;
