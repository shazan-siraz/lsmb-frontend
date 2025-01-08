import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { NavLink } from "react-router-dom";
import getOneMonthAgo from "../../utils/getOneMonthAgoDate/getOneMonthAgoDate";
import { useSearchExpenseQuery } from "../../redux/features/expense/expenseApi";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import isToday from "../../utils/isToday/isToday";
import BranchExpenseModal from "./BranchExpenseModal";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";

const BranchExpense = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit } = useForm();
  const [expenseStartDate, setExpenseStartDate] = useState(getOneMonthAgo());
  const [expenseEndDate, setExpenseEndDate] = useState(todayDateFormated());

  const dispatch = useDispatch();

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(clearToastMessage()); // টোস্ট মেসেজটি ক্লিয়ার করুন
    }
  }, [toastMessage, dispatch]);

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: searchExpenseData, isLoading: searchExpenseLoading } =
    useSearchExpenseQuery({
      email: branchEmail,
      startDate: expenseStartDate,
      endDate: expenseEndDate,
    });

  const onSubmit = async (data) => {
    try {
      setExpenseStartDate(data.startDate);
      setExpenseEndDate(data.endDate);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <ToastContainer></ToastContainer>
      <div className="py-[10px] px-[30px] flex items-center justify-between">
        <div>
          <h1 className="font-bold text-[22px]">Expense List</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 items-center gap-5 px-10 mx-auto">
            <div className="flex">
              <label
                className="font-semibold bg-slate-300 my-1 px-2 flex items-center"
                htmlFor="startDate"
              >
                From
              </label>
              <input
                className="py-2 px-2 my-1 w-[250px] rounded-sm membershipInput"
                type="date"
                id="startDate"
                {...register("startDate")}
              />
            </div>

            <div className="flex">
              <label
                className="font-semibold bg-slate-300 my-1 px-2 flex items-center"
                htmlFor="startDate"
              >
                To
              </label>
              <input
                className="py-2 px-2 my-1 w-[250px] rounded-sm membershipInput"
                type="date"
                defaultValue={todayDateFormated()}
                {...register("endDate")}
                required={true}
              />
            </div>

            <div>
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-6 rounded bg-slate-500 text-white hover:bg-slate-600 cursor-pointer"
                type="submit"
                value={searchExpenseLoading ? "Loading..." : "Submit"}
                disabled={searchExpenseLoading}
              />
            </div>
          </div>
        </form>
        <div>
          <NavLink to="/dashboard/expenseCreate">
            <button className="border-2 rounded font-semibold hover:bg-slate-500 hover:text-white px-4 py-2 transition-all duration-300 ease-in-out">
              Add Expense
            </button>
          </NavLink>
        </div>
      </div>
      <hr className="border" />

      <div className="px-5 py-8">
        <table className="employeeTable">
          <thead className="bg-slate-600 text-white uppercase">
            <tr>
              <th className="text-center">SL</th>
              <th className="text-center">Created By</th>
              <th className="text-center">Prepared</th>
              <th className="text-center">Approved</th>
              <th className="text-center">Type</th>
              <th className="text-center">Expense Date</th>
              <th className="text-center">Entry Date</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchExpenseData?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{singleBranchData?.data?.branchName}</td>
                <td>{item?.preparedBy}</td>
                <td>{item?.approvedBy}</td>
                <td>{item?.expenseType?.categoryTitle}</td>
                <td>{timeFormat(item?.date)}</td>
                <td>{timeFormat(item?.createdAt)}</td>
                <td>{item?.amount}</td>
                <td className="text-center">
                  {isToday(item?.createdAt) && (
                    <button>
                      <BranchExpenseModal modalData={item}></BranchExpenseModal>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-right font-semibold" colSpan={7}>
                Total BDT
              </td>
              <td className="font-semibold">
                {searchExpenseData?.data?.reduce(
                  (total, item) => total + (item?.amount || 0),
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

export default BranchExpense;
