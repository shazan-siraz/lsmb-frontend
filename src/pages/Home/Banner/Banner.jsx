import "./Banner.css";
import bannerImg from "../../../assets/images/banking.png"
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="custom-clip">
      <div className="flex items-center justify-center gap-[100px] pt-[100px]">
        <div>
          <h1 className="text-white font-bold text-5xl">এনজিও সফটওয়্যার</h1>
          <p className="text-white font-semibold py-5">
            হিসাব হবে স্বচ্ছ, ব্যবসা হবে গুচ্ছ।
          </p>
          <NavLink to="./register">
            <button className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold border-2 hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out">
              রেজিস্ট্রেশন করুন
            </button>
          </NavLink>
        </div>

        <div>
          <img
            src={bannerImg}
            width="650px"
            alt="bankingPic"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
