import { useGetAllArticleQuery } from "../../redux/features/article/article";
import HomepageFooter from "../Home/HomepageFooter/HomepageFooter";
import HomePageHeader from "../Home/HomePageHeader";
import RenderHtmlContent from "./RenderHtmlContent";

const Article = () => {
  const { data: articleData } = useGetAllArticleQuery();

  return (
    <div>
      <HomePageHeader></HomePageHeader>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-3 gap-5 py-5">
          {articleData?.data?.map((item) => (
            <RenderHtmlContent key={item._id} htmlContent={item} />
          ))}
        </div>
      </div>
      <HomepageFooter></HomepageFooter>
    </div>
  );
};

export default Article;
