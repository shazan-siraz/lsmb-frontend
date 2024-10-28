import { useForm } from "react-hook-form";
import { useGetAllRegisterPackageQuery } from "../../redux/features/registerPackage/registerPackage";

const CreateCompany = () => {
  const { register, handleSubmit } = useForm();

  const { data: registerPackageData, isLoading: registerPackageLoading } =
    useGetAllRegisterPackageQuery();

  const onSubmit = async (data) => {
    try {
      const companyData = {
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

      console.log(data);

      //   const res = await createBranch(branchData);

      //   if (res?.data?.data) {
      //     toast.success("Branch Created Successfully");
      //     reset();
      //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-center text-[40px] uppercase py-2">
          Create a Company
        </h1>
        <hr className="border my-2" />
      </div>

      <div className="px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="companyName">
                Company Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Company Name"
                type="text"
                id="companyName"
                {...register("companyName")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="companyEmail">
                Company Email*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Company Email"
                type="email"
                id="companyEmail"
                {...register("companyEmail")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="companyPassword">
                Company Password*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Company Password"
                type="password"
                id="companyPassword"
                {...register("companyPassword")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="companyMobile">
                Company Mobile*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Company Mobile"
                type="text"
                id="companyMobile"
                {...register("companyMobile")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="companyAddress">
                Company Address*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                placeholder="Company Address"
                type="text"
                id="companyAddress"
                {...register("companyAddress")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="registeredPackage">
                Registered Package*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="registeredPackage"
                required
                defaultValue=""
                {...register("registeredPackage")}
              >
                <option value="" disabled>
                  Please select a package
                </option>
                {registerPackageLoading
                  ? "Loading..."
                  : registerPackageData?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        [ {item.packageName} - Monthly {item.packagePrice} BDT -{" "}
                        {item.memberLimit} Member ]
                      </option>
                    ))}
              </select>
            </div>
          </div>

          <div className="border-b border-slate-300 my-10"></div>

          <div className="text-center">
            <input
              className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              // value={branchCreateLoading ? "Loading..." : "Create Branch"}
              // disabled={branchCreateLoading}
            />
            {/* <ToastContainer></ToastContainer> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
