import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import { useCreateSoftwareUsersMutation } from "../../redux/features/softwareUsers/softwareUsers";
import { useState } from "react";

const AddedSoftwareUsers = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setIsLoadding] = useState(false);

  const [AddedSoftwareUsers, { isLoading: AddedSoftwareUsersLoading }] =
    useCreateSoftwareUsersMutation();

  const onSubmit = async (data) => {
    setIsLoadding(true);
    try {
      const softwaerUsersUrl = await uploadImageToCloudinary(
        data?.softwareUsersLogo[0]
      );

      const softwareUsersData = {
        softwareUsersLogo: softwaerUsersUrl,
        softwareUsersName: data?.softwareUsersName,
        softwareUsersAddress: data?.softwareUsersAddress,
      };

      setIsLoadding(false);

      const res = await AddedSoftwareUsers(softwareUsersData);

      if (res?.data) {
        toast.success("Added Software Users Successfully");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="text-center text-[40px] font-semibold py-5 border-b">
          Added Software Users
        </h1>

        <div className="px-10 py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-[700px] mx-auto flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <label className="font-semibold" htmlFor="softwareUsersLogo">
                  Software Users Logo/Image*:
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="file"
                  id="softwareUsersLogo"
                  {...register("softwareUsersLogo")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="softwareUsersName">
                  Software Users Name/Title*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Software Users Name/Title*"
                  type="text"
                  id="softwareUsersName"
                  {...register("softwareUsersName")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="softwareUsersAddress">
                  Software Users Address*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Software Users Address"
                  type="text"
                  id="softwareUsersAddress"
                  {...register("softwareUsersAddress")}
                  required={true}
                />
              </div>
            </div>

            <div className="border-b border-slate-300 my-10"></div>

            <div className="text-center">
              <input
                className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
                type="submit"
                value={
                  AddedSoftwareUsersLoading || loading
                    ? "Loading..."
                    : "Added Software Users"
                }
                disabled={AddedSoftwareUsersLoading || loading}
              />
              <ToastContainer></ToastContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddedSoftwareUsers;
