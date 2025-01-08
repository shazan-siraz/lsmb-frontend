import { useForm } from "react-hook-form";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import {
  useCreateBankingMutation,
  useGetAllBankingQuery,
} from "../../redux/features/banking/bankingApi";
import { toast, ToastContainer } from "react-toastify";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import BankingModal from "./BankingModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";
import isToday from "../../utils/isToday/isToday";

const BankAc = () => {
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

  const [createBanking, { isLoading: bankingCreateLoading }] =
    useCreateBankingMutation();

  const { data: bankingQueryData } = useGetAllBankingQuery(branchEmail);

  const onSubmit = async (data) => {
    try {
      const bankAcData = {
        bankName: data.bankName,
        shortName: data.shortName,
        holderName: data.holderName,
        acNo: data.acNo,
        branchEmail: branchEmail,
        companyEmail: singleBranchData?.data?.companyEmail,
      };

      const res = await createBanking(bankAcData);

      if (res?.data) {
        toast.success("Banking Created Successfully!");
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
          Bank A/C List
        </h1>
        <hr className="border" />
      </div>

      <div className="mx-[20px] my-[10px]">
        <ToastContainer></ToastContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Bank Name"
                type="text"
                id="bankName"
                {...register("bankName")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Short Name"
                type="text"
                id="shortName"
                {...register("shortName")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="Holder Name"
                type="text"
                id="holderName"
                {...register("holderName")}
                required={true}
              />
            </div>

            <div className="flex-1">
              <input
                className="py-2 px-2 my-1 w-full rounded-sm membershipInput"
                placeholder="A/C No"
                type="text"
                id="acNo"
                {...register("acNo")}
                required={true}
              />
            </div>
            <div className="text-center">
              <input
                className="transition-all duration-300 ease-in-out border border-slate-500 py-2 px-10 rounded hover:bg-slate-500 hover:text-white cursor-pointer"
                type="submit"
                value={bankingCreateLoading ? "Loading..." : "Submit"}
                disabled={bankingCreateLoading}
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
              <th className="text-center">Bank Name</th>
              <th className="text-center">Short Name</th>
              <th className="text-center">Holder Name</th>
              <th className="text-center">A/C No</th>
              <th className="text-center">Created</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bankingQueryData?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item?.bankName}</td>
                <td>{item?.shortName}</td>
                <td>{item?.holderName}</td>
                <td>{item?.acNo}</td>
                <td>{timeFormat(item?.createdAt)}</td>
                <td>{item?.status}</td>
                <td className="text-center">
                  {isToday(item?.createdAt) && (
                    <button>
                      <BankingModal modalData={item}></BankingModal>{" "}
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

export default BankAc;
