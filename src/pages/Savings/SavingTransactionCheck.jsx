import { useForm } from "react-hook-form";
import { FaDatabase, FaIdCardAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetSingleMembershipQuery } from "../../redux/features/membership/membershipApi";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { useCreateSavingTransactionMutation } from "../../redux/features/savingTransaction/savingTransactionApi";
import { ToastContainer, toast } from "react-toastify";

const SavingTransactionCheck = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { data: singleMemberData, isLoading: singleMemberDataQueryLoading, refetch } =
    useGetSingleMembershipQuery(id);

  const [addSavingTransaction, { isLoading: addSavingTransactionLoading }] =
    useCreateSavingTransactionMutation();

  if (singleMemberDataQueryLoading) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data) => {
    try {
      const savingTransactionData = {
        memberId: id,
        dateOfCollection: data.dateOfCollection,
        savingAmount: Number(data.savingAmount),
        savingTransactionInfo: data.savingTransactionInfo,
      };

      const res = await addSavingTransaction(savingTransactionData);

      if (res?.data?.data) {
        toast.success("Saving Transaction Successfully Completed");
        reset();
        refetch();
        navigate("/dashboard/savings-transaction")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-evenly items-center py-5">
        <h1 className="uppercase font-bold text-[35px]">Savings Transaction</h1>
        <NavLink
          to="/dashboard/savings-transaction"
          className="border border-slate-500 rounded-md px-3 py-1 hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out"
        >
          <button>Check Savings A/C</button>
        </NavLink>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="flex justify-around items-center  py-4">
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaUser />
          <p className="text-[20px]">{singleMemberData?.data.memberName}</p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaIdCardAlt />
          <p>{singleMemberData?.data.memberId}</p>
        </div>
        <div className="flex items-center gap-2 text-[20px] font-semibold">
          <FaDatabase />
          <p>{singleMemberData?.data.accountBalance}</p>
        </div>
      </div>

      <div className="border-b border-slate-300"></div>

      <div className="px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-5 py-10">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dateOfCollection">
                Date of Collection*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="date"
                id="dateOfCollection"
                defaultValue={todayDateFormated()} // Set default value to today's date
                {...register("dateOfCollection")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="savingAmount">
                Savings Amount*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="number"
                id="savingAmount"
                placeholder="Enter Saving Amount"
                {...register("savingAmount")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="savingTransactionInfo">
                Transaction Note*
              </label>
              <input
                className="py-2 px-2 my-2 rounded-sm membershipInput"
                type="text"
                id="savingTransactionInfo"
                placeholder="Enter Transaction Note"
                {...register("savingTransactionInfo")}
                required={true}
              />
            </div>
          </div>

          <div className="text-center pb-10">
            <input
              className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              value={addSavingTransactionLoading ? "Loading..." : "Submit"}
              disabled={addSavingTransactionLoading}
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavingTransactionCheck;
