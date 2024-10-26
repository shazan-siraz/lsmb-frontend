import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./Editor.css";
import { useForm } from "react-hook-form";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import { useCreateArticleMutation } from "../../redux/features/article/article";
import { toast, ToastContainer } from "react-toastify";

function TinyMCEEditor() {
  const [loading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");

  const handleEditorChange = (content) => {
    setContent(content); // This will capture the HTML content, including styles
  };

  const [addArticle, { isLoading: articleCreateLoading }] =
    useCreateArticleMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const articleImageUrl = await uploadImageToCloudinary(
        data.articleImage[0]
      );

      const articleData = {
        articleImage: articleImageUrl,
        articleTitle: data.articleTitle,
        articleContent: content,
      };
      setIsLoading(false);
      const res = await addArticle(articleData);

      if (res?.data) {
        toast.success("Article Post Successfully");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-10 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="flex items-center gap-5 ml-2 mb-3 flex-1">
              <label
                className="font-semibold text-[20px]"
                htmlFor="articleImage"
              >
                Article Image*:
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="file"
                id="articleImage"
                {...register("articleImage")}
                required={true}
              />
            </div>

            <div className="flex items-center gap-5 ml-2 mb-3 flex-1">
              <label
                className="font-semibold text-[20px] "
                htmlFor="articleTitle"
              >
                Article Title*:
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput w-[80%]"
                placeholder="Article Title"
                type="text"
                id="articleTitle"
                {...register("articleTitle")}
                required={true}
              />
            </div>
          </div>

          <Editor
            apiKey="es0ihhceb6asz40biexkbo774cnd23uapox9hyq9guudla0v"
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family: 'Helvetica', sans-serif; font-size: 14px }",
              font_formats:
                "Arial=arial,helvetica,sans-serif; SutonyMJ= SutonyMJ, sans-serif;",
            }}
          />

          <div className="max-w-[250px] border border-slate-500 cursor-pointer font-semibold py-2 rounded text-center hover:bg-slate-500 hover:text-white transition-all duration-300 ease-in-out mx-auto my-5">
            <input
              className="save-button text-[20px]"
              type="submit"
              value={
                loading || articleCreateLoading ? "Loading..." : "Post Article"
              }
            />
          </div>
          <ToastContainer></ToastContainer>
        </form>
      </div>
    </div>
  );
}

export default TinyMCEEditor;
