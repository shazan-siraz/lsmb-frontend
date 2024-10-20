const Footer = () => {
  return (
    <div>
      <div className="w-full py-2 bg-gradient-to-b from-green-600 to-slate-700 text-white text-center bottom-0 fixed left-0">
        <div className="flex gap-2  justify-center items-center">
          <p className="header-btn transition-all duration-300 ease-in-out">
            Transaction
          </p>
          <p className="header-btn transition-all duration-300 ease-in-out">
            Savings TXN
          </p>
          <p className="header-btn transition-all duration-300 ease-in-out">
            Loan TXN
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
