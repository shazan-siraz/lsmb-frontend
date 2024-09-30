import description1 from "../../../assets/images/description-1.png"
import description2 from "../../../assets/images/description-2.png"
import description3 from "../../../assets/images/description-3.png"

const SoftwareInfo = () => {
    return (
        <div className="-mt-[100px]">

            <div className="flex justify-center text-center text-[30px] font-semibold mb-10">
                <h1>সমবায় সমিতির সকল হিসাব অটোম্যাটিক করার <br /> একটা নির্ভরযোগ্য সফটওয়্যার।</h1>
            </div>

            <div className="flex justify-center items-center gap-[100px]">
                <div className="w-[300px] flex flex-col items-center">
                    <img className="mb-5" width="200px" src={description1} alt="Description 1 Image" />
                    <div className="text-center">
                        <h1 className="font-semibold text-[20px] py-3">সমবায় সমিতির সমাধান</h1>
                        <p className="text-[16px]">আপনার ব্যবসা ঠিক যত বড়, ঠিক ততটুকু দিয়েই আপনি শুরু করতে পারেন। আমাদের সফটওয়্যার টা সকল প্রকার সমবায় সমিতির জন্য। খুব বেশি শিক্ষাগত যোগ্যতা একদম দরকার নেই।</p>
                    </div>
                </div>
                <div className="w-[300px] flex flex-col items-center">
                    <img className="mb-5" width="200px" src={description2} alt="Description 2 Image" />
                    <div className="text-center">
                        <h1 className="font-semibold text-[20px] py-3">অর্থনৈতিক সেবা সমূহ</h1>
                        <p className="text-[16px]">১০০% নিশ্চিত্ত আপনার প্রতিটি ট্রানজেকশন। যেমন- সেভিং, লোন, ডিপিএস, এফ ডি আর সহ সকল প্রকার প্রাতিষ্ঠানিক হিসাব হবে সফটওয়্যার দিয়ে। ফিলড অফিসারদের জন্য থাকছে মোবাইল অ্যাপ।</p>
                    </div>
                </div>
                <div className="w-[300px] flex flex-col items-center">
                    <img className="mb-5" width="200px" src={description3} alt="Description 3 Image" />
                    <div className="text-center">
                        <h1 className="font-semibold text-[20px] py-3">ব্যবসার নীতি</h1>
                        <p className="text-[16px]">আপনার ব্যবসার প্রসার অনুযায়ী আপনি প্যাকেজ পরিবর্তন করে নিতে পারবেন। প্যাকেজ গুলোর মাধ্যমে এই সফটওয়্যার লক্ষ লক্ষ ডেটা পরিচালনা করতে পারে। আপনাকে ব্যবসার পরিস্থিতি এবং প্রয়োজনীয় পদক্ষেপ নিতে সাহায্য করবে।</p>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default SoftwareInfo;