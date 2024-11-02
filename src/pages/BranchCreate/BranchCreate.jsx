import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useCreateBranchMutation } from "../../redux/features/branch/branchApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleCompanyQuery } from "../../redux/features/company/company";
import { useGetSingleUserQuery } from "../../redux/features/user/user";
import CompanyApprovedMessage from "../CompanyApprovedMessage/CompanyApprovedMessage";

const BranchCreate = () => {
  const { email } = useSelector(useCurrentUser);
  const { register, handleSubmit, reset } = useForm();

  const { data: singleUserData, isLoading: userQueryLoading } =
    useGetSingleUserQuery(email);

  const { data: singleCompanyData, isLoading: singleCompanyDataQueryLoading } =
    useGetSingleCompanyQuery(email);

  const [createBranch, { isLoading: branchCreateLoading }] =
    useCreateBranchMutation();

  if (singleCompanyDataQueryLoading || userQueryLoading) {
    return <p>Loading...</p>;
  }

  const companyId = singleCompanyData?.data._id;

  const onSubmit = async (data) => {
    try {
      const branchData = {
        password: data?.branchPassword,
        branch: {
          branchName: data?.branchName,
          branchEmail: data?.branchEmail,
          branchMobile: data?.branchMobile,
          branchAddress: data?.branchAddress,
          companyEmail: email,
          company: companyId,
        },
      };

      const res = await createBranch(branchData);

      if (res?.data?.data) {
        toast.success("Branch Created Successfully");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (singleUserData?.data.status === "pending") {
    return <CompanyApprovedMessage></CompanyApprovedMessage>;
  }

  return (
    <div>
      <div className="bg-[#EBECED] h-screen">
        <div className="text-center px-10 pt-2">
          <h1 className="font-bold text-[30px]">Make a New Branch</h1>
        </div>

        <div className="border-b border-slate-300 my-3"></div>

        <div className="px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="branchName">
                  Branch Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Branch Name"
                  type="text"
                  id="branchName"
                  {...register("branchName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="branchEmail">
                  Branch Email*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Branch Email"
                  type="email"
                  id="branchEmail"
                  {...register("branchEmail")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="branchPassword">
                  Branch Password*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Branch Password"
                  type="password"
                  id="branchPassword"
                  {...register("branchPassword")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="branchMobile">
                  Branch Mobile*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Branch Mobile"
                  type="text"
                  id="branchMobile"
                  {...register("branchMobile")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="branchAddress">
                  Branch Address*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Branch Address"
                  type="text"
                  id="branchAddress"
                  {...register("branchAddress")}
                  required={true}
                />
              </div>
            </div>

            <div className="border-b border-slate-300 my-10"></div>

            <div className="text-center py-10">
              <input
                className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
                type="submit"
                value={branchCreateLoading ? "Loading..." : "Create Branch"}
                disabled={branchCreateLoading}
              />
              <ToastContainer></ToastContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BranchCreate;
