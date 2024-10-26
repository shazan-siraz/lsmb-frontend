import { NavLink } from "react-router-dom";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import {
  useDeleteSoftwareUsersMutation,
} from "../../redux/features/softwareUsers/softwareUsers";
import { useDeleteArticleMutation, useGetAllArticleQuery } from "../../redux/features/article/article";

const ArticleList = () => {
  const {data: articleData, isLoading: articleDataQueryLoading} = useGetAllArticleQuery();

const [deleteArticle] = useDeleteArticleMutation();

  if (articleDataQueryLoading) {
    return <p>Loading...</p>;
  }

  const handleDeleteArticle = async (id) => {
    const res = await deleteArticle(id);
    if (res?.data) {
      toast.success("Article is Deleted Successfully");
    }
  };

  return (
    <div className="py-3 px-10">
      <ToastContainer></ToastContainer>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">
          Article List: {articleData?.data?.length}
        </h1>
        <NavLink
          to="/dashboard/tinymceEditor"
          className="border border-slate-500 text-slate-600 hover:bg-slate-500 px-5 py-2 hover:text-white font-semibold rounded transition-all duration-300 ease-in-out"
        >
          Add Article
        </NavLink>
      </div>

      <div className="my-5">
        <table className="w-full">
          <thead className="bg-slate-500 text-white">
            <tr className="">
              <th>#</th>
              <th>Article Image</th>
              <th>Article Title</th>
              <th>Uploaded At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {articleData?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-[50px]"
                    src={item.articleImage}
                    alt=""
                  />
                </td>
                <td>{item.articleTitle}</td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.status}</td>
                <td onClick={() => handleDeleteArticle(item._id)}>
                  <div className="flex justify-center items-center text-[20px] border border-red-500 py-1 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                    <RiDeleteBin6Fill />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleList;
