const CompanyApprovedMessage = () => {
  return (
    <div className="pt-[100px]">
      <div className="flex justify-center items-center max-w-[800px] mx-auto rounded-lg p-10 shadow-lg">
        <div className="flex justify-center items-center flex-col gap-4">
          <h1 className="text-[40px] font-semibold text-red-500">
            আপনার একাউন্টটি অনুমোদিত নয়!
          </h1>
          <p className="text-[30px] text-center">
            অনুগ্রহ করে পেমেন্ট করে, <br /> একাউন্টটি অনুমোদিত করে নিন।
          </p>
          <p className="text-[25px] font-semibold">অথবা যোগাযোগ করুন, মোবাইল: 01734-327110</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyApprovedMessage;
