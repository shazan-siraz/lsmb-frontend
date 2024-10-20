import { useState } from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  const [errorMessage, setErrorMessage] = useState('');

  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  // Watch the newPassword and confirmPassword fields
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

   // Check if the passwords match and set error message accordingly
   const checkPasswordsMatch = () => {
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setErrorMessage("New Password and Confirm Password do not match!");
      } else {
        setErrorMessage(""); // Clear error message when they match
      }
    } else {
      setErrorMessage(""); // Clear error message if either field is empty
    }
  };

  const onSubmit = async (data) => {
    

    const changePasswordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      // Call the mutation
      const res = await changePassword(changePasswordData).unwrap(); // Unwrap to handle errors

      // If the API call is successful, show success message
      if (res) {
        toast.success("Password Changed Successfully");
        reset(); // Reset the form or input fields as needed
      }
    } catch (err) {
      console.error("Failed to change password:", err);
      // Handle the error from the API response
      if (err?.data?.message) {
        alert(err.data.message); // Display the backend error message
      } else {
        alert("An unknown error occurred!"); // Fallback message
      }
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-[800px] mx-auto bg-white px-10 border-t-4 border-slate-500 rounded-lg">
        <h1 className="text-center font-bold text-[40px] py-5">
          Change Your Password
        </h1>
        <p className="text-center text-red-500 font-semibold py-2">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-col py-3">
              <label
                className="font-bold text-[15px] uppercase text-slate-700"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <input
                className="py-2 px-2 my-1 border rounded-sm employeeInput"
                type="password"
                id="oldPassword"
                placeholder="Old Password"
                {...register("oldPassword")}
                required={true}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="font-bold text-[15px] uppercase text-slate-700"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                className="py-2 px-2 my-1 border rounded-sm employeeInput"
                type="password"
                id="newPassword"
                placeholder="New Password"
                {...register("newPassword", { onChange: checkPasswordsMatch })}
                required={true}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="font-bold text-[15px] uppercase text-slate-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="py-2 px-2 my-1 border rounded-sm employeeInput"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  onChange: checkPasswordsMatch,
                })}
                required={true}
              />
            </div>

            <div className="flex justify-center py-5">
              <input
                className="max-w-[200px] w-[100%] border border-slate-500 py-2 px-5 rounded hover:bg-slate-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
                type="submit"
                value={changePasswordLoading ? "Loading..." : "Change Password"}
                disabled={changePasswordLoading}
              />
            </div>
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
