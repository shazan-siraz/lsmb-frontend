import { useForm } from "react-hook-form";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useState } from "react";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import getOneMonthAgo from "../../utils/getOneMonthAgoDate/getOneMonthAgoDate";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import formatDateAndTimeForPrint from "../../utils/dateAndTimeForPrint/dateAndTimeForPrint";
import { useGetAllExpenseCategoryQuery } from "../../redux/features/expenseCategory/expenseCategoryApi";
import { useSearchExpenseWithCategoryQuery } from "../../redux/features/expense/expenseApi";

const ExpenseReport = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit } = useForm();
  const [category, setCategory] = useState();
  const [startDate, setStartDate] = useState(getOneMonthAgo());
  const [endDate, setEndDate] = useState(todayDateFormated());

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: expenseCategoryData, isLoading: expenseCategoryLoading } =
    useGetAllExpenseCategoryQuery(branchEmail);

  const { data: searchExpenseQueryData, isLoading: searchExpenseLoading } =
    useSearchExpenseWithCategoryQuery(
      {
        expenseType: category,
        startDate: startDate,
        endDate: endDate,
      },
      { skip: !category }
    );

  const onSubmit = async (data) => {
    try {
      setCategory(data.category);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="py-[30px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-5 px-10 mx-auto">
            <div className="flex-1">
              <select
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                defaultValue=""
                {...register("category")}
              >
                <option value="" disabled>
                  Select Category
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

            <div>
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="date"
                {...register("startDate")}
                required={true}
              />
            </div>

            <div>
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="date"
                defaultValue={todayDateFormated()}
                {...register("endDate")}
                required={true}
              />
            </div>

            <div>
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-10 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
                type="submit"
                value={searchExpenseLoading ? "Loading..." : "Submit"}
                disabled={searchExpenseLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white py-[30px] px-[20px]" ref={contentRef}>
        <div className="px-6 flex justify-between">
          <div>
            <h2 className="font-bold text-[25px]">
              {singleBranchData?.data?.branchName}
            </h2>
            <p className="font-semibold">
              Address: {singleBranchData?.data?.branchAddress}
            </p>
            <p>Email: {singleBranchData?.data?.branchEmail}</p>
            <p>Phone: {singleBranchData?.data?.branchMobile}</p>
          </div>
          <div>
            <h1 className="font-bold text-[25px]">Expense Statement</h1>
            <p>Reporting Date: {formatDateAndTimeForPrint()}</p>
          </div>
        </div>

        <hr className="border my-[20px]" />

        <div>
          <div className="px-5">
            <table className="employeeTable">
              <thead className="bg-slate-600 text-white uppercase text-[14px]">
                <tr>
                  <th className="text-center">SL</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Note</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Prepared</th>
                  <th className="text-center">Approved</th>
                  <th className="text-center">Created By</th>
                </tr>
              </thead>
              <tbody>
                {searchExpenseQueryData?.data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1} </td>
                    <td>{timeFormat(item?.date)}</td>
                    <td>{item?.expenseType?.categoryTitle}</td>
                    <td>{item?.note}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.preparedBy}</td>
                    <td>{item?.approvedBy}</td>
                    <td>{singleBranchData?.data?.branchName}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="font-semibold text-right">
                    Net Expense
                  </td>
                  <td className="font-semibold">
                    {searchExpenseQueryData?.data?.reduce(
                      (total, item) => total + (item?.amount || 0), 0
                    )}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white pb-3 pr-9 flex justify-between">
        <div></div>
        <button
          className="bg-slate-50 border rounded-sm px-3 py-1 text-right flex items-center gap-2"
          onClick={() => reactToPrintFn()}
        >
          <FaPrint />
          Print
        </button>
      </div>
    </div>
  );
};

export default ExpenseReport;
