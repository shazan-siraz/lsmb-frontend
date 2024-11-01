/* eslint-disable react/prop-types */


const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h3 className="text-red-500 font-semibold text-[30px]">Congratulation!</h3>
        <p className="mt-5 mb-2 text-[20px] ">আপনার রেজিস্ট্রেশন সম্পূর্ণ হয়েছে। কিছুক্ষণের মধ্যে আপনার সাথে যোগাযোগ করা হবে, ধন্যবাদ।</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
