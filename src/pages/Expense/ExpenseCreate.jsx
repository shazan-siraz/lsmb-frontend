import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { useGetAllExpenseCategoryQuery } from "../../redux/features/expenseCategory/expenseCategoryApi";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { useCreateExpenseMutation } from "../../redux/features/expense/expenseApi";
import { toast, ToastContainer } from "react-toastify";
import { useBranchWallet } from "../../hooks/useBranchWallet";

const ExpenseCreate = () => {
  const { branchEmail } = useGetBranchEmail();
  const { branchWallet } = useBranchWallet();
  const { register, handleSubmit, reset } = useForm();

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: expenseCategoryData, isLoading: expenseCategoryLoading } =
    useGetAllExpenseCategoryQuery(branchEmail);

  const [createExpense, { isLoading: createExpenseLoading }] =
    useCreateExpenseMutation();

  const onSubmit = async (data) => {
    try {
      const expenseCreateData = {
        date: data.date,
        expenseType: data.expenseType,
        amount: Number(data.amount),
        note: data.note,
        preparedBy: data.preparedBy,
        approvedBy: data.approvedBy,
        mrSlipNo: data.mrSlipNo,
        branchEmail: branchEmail,
        companyEmail: singleBranchData?.data?.companyEmail,
      };

      if (expenseCreateData.amount > branchWallet) {
        toast.error("Insufficient Balance!");
      } else {
        const res = await createExpense(expenseCreateData);

        if (res?.data) {
          toast.success("Expense Create Successfully!");
          reset();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <h1 className="font-bold text-[22px] py-2 px-8">Expense Voucher</h1>
      <hr className="border mb-4 mt-2" />

      <div>
        <ToastContainer></ToastContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-5 px-10 mx-auto">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="date">
                Date*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="date"
                id="date"
                defaultValue={todayDateFormated()}
                {...register("date")}
                required={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="expenseType">
                Expense Type*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                required
                id="expenseType"
                defaultValue=""
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

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="amount">
                Amount*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                placeholder="Enter Amount"
                id="amount"
                {...register("amount")}
                required={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="note">
                Note*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                placeholder="Expense Note"
                id="note"
                {...register("note")}
                required={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="preparedBy">
                Prepared By*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                placeholder="Enter Name"
                id="preparedBy"
                {...register("preparedBy")}
                required={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="approvedBy">
                Approved By*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                placeholder="Enter Name"
                id="approvedBy"
                {...register("approvedBy")}
                required={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="mrSlipNo">
                Slip No.*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="mrSlipNo"
                placeholder="Enter MR or Slip No"
                {...register("mrSlipNo")}
                required={true}
              />
            </div>
          </div>

          <hr className="my-6" />

          <div className="text-center">
            <input
              className="transition-all duration-300 ease-in-out border font-semibold border-slate-500 py-2 px-6 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
              type="submit"
              value={createExpenseLoading ? "Loading..." : "Submit"}
              disabled={createExpenseLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseCreate;
