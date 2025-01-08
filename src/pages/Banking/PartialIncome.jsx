import { useForm } from "react-hook-form";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { toast, ToastContainer } from "react-toastify";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import isToday from "../../utils/isToday/isToday";
import {
  useCreatePartialIncomeMutation,
  useGetAllPartialIncomeQuery,
} from "../../redux/features/partialIncome/partialIncomeApi";
import PartialIncomeModal from "./PartialIncomeModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";

const PartialIncome = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(clearToastMessage()); // টোস্ট মেসেজটি ক্লিয়ার করুন
    }
  }, [toastMessage, dispatch]);

  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);

  const { data: partialIncomeData } = useGetAllPartialIncomeQuery(branchEmail);

  const [createPartialIncom, { isLoading: partialIncomeCreateLoading }] =
    useCreatePartialIncomeMutation();

  const onSubmit = async (data) => {
    try {
      const partialIncomeData = {
        incomeType: data?.incomeType,
        date: data?.date,
        amount: Number(data?.amount),
        note: data?.note,
        branchEmail: branchEmail,
        companyEmail: singleBranchData?.data?.companyEmail,
      };

      const res = await createPartialIncom(partialIncomeData);

      if (res?.data) {
        toast.success("Partial Income Created successfully!");
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
          Partial Income List
        </h1>
        <hr className="border" />
      </div>

      <div className="mx-[20px] my-[10px]">
        <ToastContainer></ToastContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 items-center">
            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="text"
                placeholder="Income Type"
                {...register("incomeType")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                type="date"
                defaultValue={todayDateFormated()}
                {...register("date")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Enter Amount"
                type="number"
                {...register("amount")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Enter Note"
                type="text"
                {...register("note")}
                required={true}
              />
            </div>
            <div className="text-center">
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-10 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
                type="submit"
                value={partialIncomeCreateLoading ? "Loading..." : "Submit"}
                disabled={partialIncomeCreateLoading}
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
              <th className="text-center">Income Type</th>
              <th className="text-center">Date</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Note</th>
              <th className="text-center">Created</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {partialIncomeData?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item?.incomeType}</td>
                <td>{item?.date}</td>
                <td>{item?.amount}</td>
                <td>{item?.note}</td>
                <td>{singleBranchData?.data?.branchName}</td>
                <td className="text-center">
                  {isToday(item?.date) && (
                    <button>
                      <PartialIncomeModal modalData={item}></PartialIncomeModal>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartialIncome;
