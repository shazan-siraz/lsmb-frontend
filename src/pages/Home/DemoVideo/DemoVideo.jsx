import { NavLink } from "react-router-dom";

const DemoVideo = () => {
  return (
    <div className="bg-[#f3f7fd] py-[100px]">
      <div className="flex flex-col items-center">
        <iframe
          width="765"
          height="450"
          src="https://www.youtube.com/embed/ftUYPRMwSkg?start=11"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p className="text-[15px] py-5">
          এই ভিডিওটা দেখার মাধ্যমে আপনি অনেকটা ধারনা পেয়ে যাবেন। দয়া করে ভিডিওটা
          দেখবেন। যোগ্য সফটওয়্যার খুজতে <br /> খুজতে প্রতারিত হবেন না। সিদ্ধান্ত
          আপনার আর আপনার ব্যবসা সম্প্রসারণ দায়িত্ব আমাদের।
        </p>

        <NavLink
          className="bg-blue-500 px-5 py-2 rounded-full border-2 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 transition-all duration-300 ease-in-out"
          to="https://www.youtube.com/@lssoft"
          target="_blank"
        >
          <button>ইউটিউব চ্যানেল</button>
        </NavLink>
      </div>
    </div>
  );
};

export default DemoVideo;
