import { useForm } from "react-hook-form";
import { useCreateRegisterPackageMutation } from "../../redux/features/registerPackage/registerPackage";
import { toast, ToastContainer } from "react-toastify";

const RegisterPackage = () => {
  const { register, handleSubmit, reset } = useForm();

  const [addRegisterPackage, { isLoading: packageCreateLoading }] =
    useCreateRegisterPackageMutation();

  const onSubmit = async (data) => {
    try {
      const registerPackageData = {
        packageId: Number(data?.packageId),
        packageName: data?.packageName,
        packagePrice: Number(data?.packagePrice),
        memberLimit: Number(data?.maximumCreatedMember),
        branchLimit: Number(data?.maximumCreatedBranch),
        userLimit: Number(data?.userLimit),
      };

      const res = await addRegisterPackage(registerPackageData);

      if (res?.data?.data) {
        toast.success("Register Package Created Successfully");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bg-[#EBECED] h-screen">
        <div className="text-center px-5 pt-2">
          <h1 className="font-bold text-[30px]">Make a New Register Package</h1>
        </div>

        <div className="border-b border-slate-300 my-3"></div>

        <div className="px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="packageId">
                  Package ID*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Package ID"
                  type="number"
                  id="packageId"
                  {...register("packageId")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="packageName">
                  Package Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Package Name"
                  type="text"
                  id="packageName"
                  {...register("packageName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="packagePrice">
                  Package Price*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Package Price"
                  type="number"
                  id="packagePrice"
                  {...register("packagePrice")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="maximumCreatedMember">
                  Maximum Created Member*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Maximum Created Member"
                  type="number"
                  id="maximumCreatedMember"
                  {...register("maximumCreatedMember")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="maximumCreatedBranch">
                  Maximum Created Branch*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Maximum Created Branch"
                  type="number"
                  id="maximumCreatedBranch"
                  {...register("maximumCreatedBranch")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="userLimit">
                  User Limit*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="User Limit"
                  type="number"
                  id="userLimit"
                  {...register("userLimit")}
                  required={true}
                />
              </div>
            </div>

            <div className="border-b border-slate-300 my-10"></div>

            <div className="text-center py-10">
              <input
                className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
                type="submit"
                value={packageCreateLoading ? "Loading..." : "Create Package"}
                disabled={packageCreateLoading}
              />
              <ToastContainer></ToastContainer>
            </div>
          </form>
        </div>
      </div>

      <h1>Branch Create page</h1>
    </div>
  );
};

export default RegisterPackage;