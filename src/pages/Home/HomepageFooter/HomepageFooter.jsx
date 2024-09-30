import "./HomepageFooter.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall, MdEmail } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const HomepageFooter = () => {
  return (
    <div className="footer-clipPath">
      <div className="max-w-[1050px] mx-auto py-5 text-white">
        <div className="flex justify-between gap-10 mt-[430px]">
          <div className="max-w-[300px] w-[100%]">
            <h1 className="text-[20px] font-semibold mb-3">আমাদের বার্তা</h1>
            <p className="text-justify text-[15px]">
              এটা একটি সমবায় সমিতির সফটওয়্যর। একজন সমবায় ব্যবসায়ী এই সফটওয়্যার
              ব্যবহার করে তার ব্যবসা কে ডিজিটাল করতে পারবে। আমরা আপনাকে সকল
              প্রকার সুবিধা দিবো যেন আপনিও হতে পারেন একজন দক্ষ সমবায় ব্যবসায়ী।
            </p>
          </div>

          <div className="max-w-[300px] w-[100%]">
            <h1 className="text-[20px] font-semibold mb-3">
              ওয়েবসাইট সংক্রান্ত
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-blue-300 after:bg-blue-500 h-[8px] w-[8px]"></div>
              <p className="text-[16px]">আমাদের প্রধান কোম্পানি LS SOFT</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-300 after:bg-blue-500 h-[8px] w-[8px]"></div>
              <p className="text-[16px]">
                গুরুত্বপূর্ণ লিংক শর্তাবলী, গোপনীয়তা নীতি
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-300 after:bg-blue-500 h-[8px] w-[8px]"></div>
              <p className="text-[16px]"> ট্রেড লাইসেন্স: 00000000000</p>
            </div>
          </div>

          <div className="max-w-[300px] w-[100%]">
            <h1 className="text-[20px] font-semibold mb-3">যোগাযোগের ঠিকানা</h1>
            <div className="flex items-center gap-3">
              <FaLocationDot />
              <p>Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3">
              <MdCall />
              <p>000 111 222 333</p>
            </div>
            <div className="flex items-center gap-3">
              <MdEmail />
              <p>sample@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <BiWorld />
              <p>abcdef.com</p>
            </div>
          </div>
        </div>

        <div className="border-b border-cyan-500 mt-12 mb-5"></div>

        <div className="text-center">
          <p>
            Developed By{" "}
            <span className="hover:text-cyan-300">
              <NavLink to="https://shazan-siraz.web.app/" target="_blank">
                Shazan Siraz
              </NavLink>
            </span>{" "}
            © Software Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomepageFooter;
