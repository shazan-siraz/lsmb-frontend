import { NavLink } from "react-router-dom";

const HomePageHeader = () => {
  return (
    <div>
      <div className="bg-[#294394] h-[80px] flex items-center">
        <div className="max-w-[1350px] w-[95%] mx-auto">
          <div className="flex justify-between items-center">
            <NavLink to="/">
              <h1 className="text-yellow-300 font-bold text-4xl uppercase">
                soft bank bd
              </h1>
            </NavLink>
            <div>
              <ul className="flex gap-5 text-white items-center">
                <NavLink to="/">হোম</NavLink>
                <li>মডিউল</li>
                <li>টিউটোরিয়াল</li>
                <li>ব্যবহারকারী</li>
                <li>মূল্য তালিকা</li>
                <li>ব্যালেন্স চেক</li>
                <NavLink to="/article">আর্টিকেল</NavLink>
                <li>
                  <NavLink to="./login">
                    <button className="border-2 px-5 rounded-xl hover:bg-white hover:text-[#294394] transition-all duration-300 ease-in-out">
                      লগইন
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeader;
