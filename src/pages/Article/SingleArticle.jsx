import { useParams } from "react-router-dom";
import { useGetSingleArticleQuery } from "../../redux/features/article/article";
import HomePageHeader from "../Home/HomePageHeader";
import HomepageFooter from "../Home/HomepageFooter/HomepageFooter";

const SingleArticle = () => {
  const { id } = useParams();

  const { data: singleArticleData, isLoading } = useGetSingleArticleQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { articleImage, articleTitle, articleContent } = singleArticleData.data;

  return (
    <div>
      <HomePageHeader></HomePageHeader>
      <div className="max-w-[1100px] mx-auto py-5">
        <div>
          <img className="w-[1100px]" src={articleImage} alt="" />
        </div>
        <h1 className="text-center my-5 text-[35px] font-semibold">
          {articleTitle}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: articleContent }} />
      </div>
      <HomepageFooter></HomepageFooter>
    </div>
  );
};

export default SingleArticle;
