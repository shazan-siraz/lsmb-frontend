import { useForm } from "react-hook-form";
import { useGetAllLoanQuery } from "../../redux/features/loan/loanApi";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

const FindLoanMember = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: loanData, isLoading: LoanDataQueryLoading } =
    useGetAllLoanQuery();

  if (LoanDataQueryLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const onSubmit = async (data) => {
    navigate(`/dashboard/loan-transaction/${data.selectedMember}`);
  };

  return (
    <div className="rounded pt-[30px]">
      <div className="max-w-[600px] w-full mx-auto bg-white rounded border-t-[5px] border-slate-500">
        <h1 className="uppercase font-bold text-center text-[30px] p-8">
          Loan Transaction
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-8">
            <select
              className="py-2 px-2 my-1 rounded membershipInput border"
              required
              defaultValue=""
              {...register("selectedMember")}
            >
              <option value="" disabled>
                Select Member
              </option>
              {loanData?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item?.memberOfApplying?.memberName} [{" "}
                  {item?.memberOfApplying?.phoneNo} ]
                </option>
              ))}
            </select>
          </div>
          <div className="text-center py-8">
            <input
              className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-10 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindLoanMember;
