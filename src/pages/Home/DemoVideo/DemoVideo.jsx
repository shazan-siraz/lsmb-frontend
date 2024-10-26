import { NavLink } from "react-router-dom";
import { useGetAllVideoTutorialQuery } from "../../../redux/features/videoTutorial/videoTutorial";

const DemoVideo = () => {
  const { data: videoData, isLoading: videoQueryLoading } =
    useGetAllVideoTutorialQuery();

  if (videoQueryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#f3f7fd] py-[50px]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 gap-5">
          {videoData?.data?.map((item) => {
            const videoId = item.videoLink.includes("watch?v=")
              ? item.videoLink.split("v=")[1].split("&")[0] // Extract video ID from standard link
              : item.videoLink.split("/").pop(); // Extract video ID from shortened link

            const embedLink = `https://www.youtube.com/embed/${videoId}`;

            return (
              <div key={item._id}>
                <h1 className="font-semibold text-[25px] text-center mb-5">
                  {item.videoTitle}
                </h1>
                <iframe
                  width="500"
                  height="300"
                  src={embedLink}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <NavLink
            className="bg-blue-500 px-5 py-2 rounded-full border-2 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 transition-all duration-300 ease-in-out"
            to="https://www.youtube.com/@lssoft"
            target="_blank"
          >
            <button>ইউটিউব চ্যানেল</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DemoVideo;
