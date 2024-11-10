import { assets } from '@/assets/assets';
import NewsletterBox from '@/components/NewsletterBox';
import Title from '@/components/Title';

export default function Contact() {
    return (
        <>
            <div className="border-t pt-10 text-center text-2xl">
                <Title text1="CONTACT" text2="US" />
            </div>
            <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
                <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
                <div className="flex flex-col items-start justify-center gap-6">
                    <p className="text-xl font-semibold text-gray-600">Our Store</p>
                    <p className="text-gray-500">
                        54709 Willms Station <br />
                        SUITE 350, Washington, USA
                    </p>
                    <p className="text-gray-500">
                        Tel:(256) 897-0123
                        <br />
                        Email: asmuins@foxmail.com
                    </p>
                    <p className="text-xl font-semibold text-gray-600">Careers at Forever</p>
                    <p className="text-gray-500">Learn more about our teams and job openings</p>
                    <button className="translate-all border border-black px-8 py-4 text-sm duration-500 hover:bg-black hover:text-white">
                        Explore Jobs
                    </button>
                </div>
            </div>
            <NewsletterBox />
        </>
    );
}
