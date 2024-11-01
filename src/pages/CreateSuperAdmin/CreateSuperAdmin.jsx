import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import { useState } from "react";
import { useCreateSuperAdminMutation } from "../../redux/features/superAdmin/superAdmin";

const CreateSuperAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [createSuperAdmin, { isLoading: createSuperAdminLoading }] =
    useCreateSuperAdminMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const adminPhotoUrl = await uploadImageToCloudinary(data.adminImage[0]);
      setIsLoading(false);

      const superAdminData = {
        password: data?.superAdminPassword,
        superAdmin: {
          name: {
            firstName: data?.firstName,
            lastName: data?.lastName,
          },
          gender: data?.gender,
          dateOfBirth: data?.dateOfBirth,
          email: data?.superAdminEmail,
          contactNo: data?.contactNo,
          bloodGroup: data?.bloodGroup,
          presentAddress: data?.presentAddress,
          permanentAddress: data?.permanentAddress,
          profileImage: adminPhotoUrl,
        },
      };


      const res = await createSuperAdmin(superAdminData);

      if (res?.data?.data) {
        toast.success("Super Admin Created Successfully");
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
          <h1 className="font-bold text-[30px]">Create Super Admin</h1>
        </div>

        <div className="border-b border-slate-300 my-3"></div>

        <div className="px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="superAdminEmail">
                  Super Admin Email*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Super Admin Email"
                  type="email"
                  id="superAdminEmail"
                  {...register("superAdminEmail")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="superAdminPassword">
                  Super Admin Password*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Super Admin Password"
                  type="password"
                  id="superAdminPassword"
                  {...register("superAdminPassword")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="firstName">
                  First Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Last Name"
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="dateOfBirth">
                  Date Of Birth*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Date Of Birth"
                  type="Date"
                  id="dateOfBirth"
                  {...register("dateOfBirth")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="gender">
                  Gender*
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="gender"
                  {...register("gender")}
                  required={true}
                >
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="contactNo">
                  Mobile No*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Mobile No"
                  type="number"
                  id="contactNo"
                  {...register("contactNo")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="bloodGroup">
                  Blood Group*
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="bloodGroup"
                  {...register("bloodGroup")}
                  required={true}
                >
                  <option>Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="presentAddress">
                  Present Address*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Present Address"
                  type="text"
                  id="presentAddress"
                  {...register("presentAddress")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="permanentAddress">
                  Permanent Address*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Permanent Address"
                  type="text"
                  id="permanentAddress"
                  {...register("permanentAddress")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="adminImage">
                  Profile Image*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="file"
                  id="adminImage"
                  {...register("adminImage")}
                  required={true}
                />
              </div>
            </div>

            <div className="border-b border-slate-300 my-10"></div>

            <div className="text-center ">
              <input
                className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
                type="submit"
                value={
                  isLoading || createSuperAdminLoading
                    ? "Loading..."
                    : "Create Super Admin"
                }
                disabled={isLoading || createSuperAdminLoading}
              />
              <ToastContainer></ToastContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSuperAdmin;
