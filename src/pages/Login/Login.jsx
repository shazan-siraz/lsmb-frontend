import { useForm } from "react-hook-form";
// import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const [login, { data, error }] = useLoginMutation();

  console.log("data =>", data);
  console.log("error =>", error);

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const res = login(data);

      if (res?.data) {
        toast.success(`User Login is Successfully`);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#f8f9fb]">
      <div className="max-w-[500px] w-[95%] bg-white p-5 mx-auto shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="text-[30px] text-center font-bold pb-8">
              LS Micro Banking
            </h1>
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
                className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
                type="submit"
                value={"LOG IN"}
                // value={isLoading ? "Loading..." : "Submit"}
                // disabled={isLoading}
              />
              <ToastContainer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
