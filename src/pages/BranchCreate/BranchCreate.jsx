import { useForm } from "react-hook-form";
import { useGetAllRegisterPackageQuery } from "../../redux/features/registerPackage/registerPackage";
import { toast, ToastContainer } from "react-toastify";
import { useCreateBranchMutation } from "../../redux/features/branch/branchApi";

const BranchCreate = () => {
  const { register, handleSubmit, reset } = useForm();

  const { data: registerPackageData, isLoading: registerPackageLoading } =
    useGetAllRegisterPackageQuery();

  const [createBranch, { isLoading: branchCreateLoading }] =
    useCreateBranchMutation();

  if (registerPackageLoading) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data) => {
    try {
      const branchData = {
        password: data?.branchPassword,
        branch: {
          branchId: data?.branchId,
          branchName: data?.branchName,
          branchEmail: data?.branchEmail,
          branchMobile: data?.branchMobile,
          branchAddress: data?.branchAddress,
          registeredPackage: data?.registeredPackage,
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
                <label className="font-semibold" htmlFor="branchId">
                  Branch ID*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Branch ID"
                  type="text"
                  id="branchId"
                  {...register("branchId")}
                  required={true}
                />
              </div>

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

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="registerdPackage">
                  Registered Package*
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="registerdPackage"
                  {...register("registeredPackage")}
                  required={true}
                >
                  <option>Select Registered Package</option>
                  {registerPackageData?.data?.map((item) => (
                    <option key={item._id} value={item?._id}>
                      [ {item.packageName} - Monthly {item?.packagePrice} BDT -{" "}
                      {item?.memberLimit} Member ]
                    </option>
                  ))}
                </select>
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
