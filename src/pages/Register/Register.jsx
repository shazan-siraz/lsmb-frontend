import { useForm } from "react-hook-form";
import LogoSoftbankBD from "../../../src/assets/icons/LogoSoftbankBD.png";
import { useGetAllRegisterPackageQuery } from "../../redux/features/registerPackage/registerPackage";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import { useCreateCompanyMutation } from "../../redux/features/company/company";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Popup from "./Popup";

const Register = () => {
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const { data: registerPackageData, isLoading: registerPackageLoading } =
    useGetAllRegisterPackageQuery();

  const [
    createCompany,
    { isLoading: companyCreateLoading, error: companyCreateError },
  ] = useCreateCompanyMutation();

  useEffect(() => {
    if (companyCreateError) {
      setIsError(companyCreateError?.data?.message || "Something went wrong");
    }
  }, [companyCreateError]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const profileImageUrl = await uploadImageToCloudinary(
        data.profileImage[0]
      );

      const companyData = {
        password: data?.password,
        company: {
          companyName: data.name,
          companyEmail: data.email,
          companyMobile: data.mobile,
          companyAddress: data.address,
          registeredPackage: data.registeredPackage,
          profileImage: profileImageUrl,
          status: "Enable",
        },
      };

      setLoading(false);

      const res = await createCompany(companyData);

      if (res?.data) {
        toast.success("Registration Successfully");
        reset();
        setIsError(""); // Clear error if successful
        openPopup();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#EBECED] h-screen flex justify-center items-center">
      <div className="max-w-[850px] mx-auto bg-[#F0F2F5] rounded-lg shadow-lg py-10">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-[90px]"
            src={LogoSoftbankBD}
            alt="Logo SoftbankBD"
          />
          <h2 className="font-bold text-[40px]">SoftbankBD</h2>
          <p className="text-red-500 font-semibold">
            {companyCreateError && isError}
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-5 px-10 max-w-[850px] w-[850px] mx-auto">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="name">
                  Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Name"
                  type="text"
                  id="name"
                  {...register("name")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="email">
                  Email*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Name"
                  type="text"
                  id="email"
                  {...register("email")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="password">
                  Password*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="mobile">
                  Mobile*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Mobile"
                  type="text"
                  id="mobile"
                  {...register("mobile")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="address">
                  Address*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Address"
                  type="text"
                  id="address"
                  {...register("address")}
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
                          [ {item.packageName} - Monthly {item.packagePrice} BDT
                          - {item.memberLimit} Member ]
                        </option>
                      ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="profileImage">
                  Profile Image
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="file"
                  id="profileImage"
                  {...register("profileImage")}
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
                  loading | companyCreateLoading ? "Loading..." : "Register"
                }
                disabled={loading | companyCreateLoading}
              />
              <ToastContainer></ToastContainer>

              {isPopupOpen && <Popup onClose={closePopup} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
