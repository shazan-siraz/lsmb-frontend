import { NavLink } from "react-router-dom";
import {
  useDeleteVideoTutorialMutation,
  useGetAllVideoTutorialQuery,
} from "../../redux/features/videoTutorial/videoTutorial";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

const AddVideoTutorialList = () => {
  const { data: videoData, isLoading: videoQueryLoading } =
    useGetAllVideoTutorialQuery();

  const [deleteVideoTutorial] = useDeleteVideoTutorialMutation();

  if (videoQueryLoading) {
    return <p>Loading...</p>;
  }

  const handleDeleteVideoTutorial = async (id) => {
    const res = await deleteVideoTutorial(id);

    if (res?.data) {
      toast.success("Video Tutorial is Deleted Successfully");
    }
  };

  return (
    <div className="py-3 px-10">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">
          Video Tutorial: {videoData?.data?.length}
        </h1>
        <NavLink
          className="border border-slate-500 text-slate-600 hover:bg-slate-500 px-5 py-2 hover:text-white font-semibold rounded transition-all duration-300 ease-in-out"
          to="/dashboard/added-addvideotutorial"
        >
          Added Video Tutorial
        </NavLink>
      </div>

      <div className="my-5">
        <table className="w-full">
          <thead className="bg-slate-500 text-white">
            <tr className="">
              <th>#</th>
              <th>Video Title</th>
              <th>Video Link</th>
              <th>Uploaded At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {videoData?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.videoTitle}</td>
                <td>{item.videoLink}</td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.status}</td>
                <td onClick={() => handleDeleteVideoTutorial(item._id)}>
                  <div className="flex justify-center items-center text-[20px] border border-red-500 py-1 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <RiDeleteBin6Fill />
                  </div>
                  <ToastContainer></ToastContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddVideoTutorialList;
