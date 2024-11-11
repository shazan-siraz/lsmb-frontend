import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken/verifyToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";

const Login = () => {
  const [isError, setIsError] = useState(null);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastMessage = useSelector((state) => state.toast.message);


  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(clearToastMessage()); // টোস্ট মেসেজটি ক্লিয়ার করুন
    }

  }, [toastMessage, dispatch]);


  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res?.data?.accessToken);

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      navigate("/dashboard/dashboard-home");
    } catch (err) {
      console.log(err);
      setIsError(err?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#f8f9fb]">
      <ToastContainer></ToastContainer>
      <div className="max-w-[500px] w-[95%] bg-white p-5 mx-auto shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="text-[30px] text-center font-bold pb-8">
              Soft Bank BD
            </h1>
            <p className="text-center text-red-600 font-semibold text-[20px]">
              {isError}
            </p>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="email">
                Email*
              </label>
              <input
                className="py-2 px-2 my-1 border rounded-sm membershipInput"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email")}
                required={true}
              />
            </div>

            <div className="flex flex-col mt-5">
              <label className="font-semibold" htmlFor="password">
                Password*
              </label>
              <input
                className="py-2 px-2 my-1 border rounded-sm membershipInput"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
                required={true}
              />
            </div>

            <div className="text-center py-10">
              <input
                className="font-semibold transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
                type="submit"
                value={isLoading ? "Loading..." : "LOG IN"}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
