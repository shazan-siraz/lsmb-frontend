/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { timeFormat } from "../../utils/timeFormat/timeFormat";

function RenderHtmlContent({ htmlContent }) {
  return (
    <NavLink to={`/article/${htmlContent._id}`}>
      <div className="shadow-lg rounded-md">
        <div className="mb-5">
          <img
            className="w-[550px] h-[230px]"
            src={htmlContent.articleImage}
            alt=""
          />
        </div>
        <h2 className="px-3 mb-3 font-semibold text-[18px]">
          {htmlContent.articleTitle}
        </h2>
        <div className="line-clamp-3 px-3 mb-2">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent.articleContent }}
            style={{ fontFamily: "Helvetica, sans-serif", fontSize: "14px" }}
          />
        </div>
        <div className="px-3 font-semibold text-slate-500 pb-5">
          <p>Published On: {timeFormat(htmlContent.createdAt)}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default RenderHtmlContent;
