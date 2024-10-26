import { useForm } from "react-hook-form";
import { useCreateVideoTutorialMutation } from "../../redux/features/videoTutorial/videoTutorial";
import { toast, ToastContainer } from "react-toastify";

const AddedAdVideoTutorial = () => {
  const { register, handleSubmit, reset } = useForm();

  const [addVideoTutorial, { isLoading: createVideoTutorialLoading }] =
    useCreateVideoTutorialMutation();

  const onSubmit = async (data) => {
    try {
      const res = await addVideoTutorial(data);

      if (res?.data) {
        toast.success("Video Tutorial Uploaded Successfully");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="text-center text-[40px] font-semibold py-5 bg-blue-100">
          Added Video Tutorial
        </h1>

        <div className="px-10 py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-[700px] mx-auto flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="videoTitle">
                  Video Title *
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Video Title"
                  type="text"
                  id="videoTitle"
                  {...register("videoTitle")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="videoLink">
                  Video Link *
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  placeholder="Video Link"
                  type="text"
                  id="videoLink"
                  {...register("videoLink")}
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
                  createVideoTutorialLoading
                    ? "Loading..."
                    : "Uploaded Video Tutorial"
                }
                disabled={createVideoTutorialLoading}
              />
              <ToastContainer></ToastContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddedAdVideoTutorial;
