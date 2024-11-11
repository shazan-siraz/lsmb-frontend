import { NavLink } from "react-router-dom";
import BusinessMonitoringPic from "../../../assets/images/BusinessMonitoring.svg";

const BusinessMonitoring = () => {
  return (
    <div className="py-[100px]">
      <div className="flex justify-center items-center gap-20">
        <div>
          <h1 className="text-[30px] font-semibold mb-5">
            এখনই সময় আপনার সমবায় ব্যবসাকে <br /> সফটওয়্যার দিয়ে পরিচালনা করার।
          </h1>
          <p className="max-w-[480px] text-[16px] text-justify mb-5">
            আপনি অনেক দিন ধরে ভাবছেন আমার সমিতির জন্য একটা সফটওয়্যার নিলে কেমন
            হয়?? কোন ভাবনা চিন্তা ছাড়াই আপনি আমাদের সফটওয়্যার টা সার্ভিস নিয়ে
            নিতে পারেন। আপনার সমিতির হিসাব করতে হবেনা বরং হিসাব হয়েই আছে আপনি
            শুধু দেখবেন।
          </p>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 after:bg-blue-500 h-[8px] w-[8px]"></div>
              <p className="text-[16px]">খাতা কলম এর চাইতে সফটওয়্যার ব্যবহার অনেকটা সময় উপযোগী</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 after:bg-blue-500 h-[8px] w-[8px]"></div>
              <p>
                আমরাই আপনাকে ট্রেনিং দিয়ে সফটওয়্যার ব্যবহার এর উপযোগী করে তুলবো।
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 after:bg-blue-500 h-[8px] w-[8px]"></div>
              <p>এক পলকে দেখে নিতে পারেন আপনার সমিতির সকল হিসাব।</p>
            </div>
          </div>

          <NavLink to="/register">
          <div className="py-5">
            <button className="px-5 border-2  border-blue-500 bg-blue-500 rounded-full font-semibold text-white py-1 hover:bg-transparent hover:text-blue-500 transition-all duration-300 ease-in-out">
              রেজিস্ট্রেশন করুন
            </button>
          </div>
          </NavLink>
        </div>
        <div>
          <img width="500px" src={BusinessMonitoringPic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BusinessMonitoring;
