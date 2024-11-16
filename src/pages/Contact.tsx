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
                    <p className="text-xl font-semibold text-gray-600">店铺地址</p>
                    <p className="text-gray-500">
                        翻斗花园二号楼一零零一室
                        <br />
                        Shen zheng, Guangdong, China
                    </p>
                    <p className="text-gray-500">
                        Tel:(256) 897-0123
                        <br />
                        Email: asmuins@foxmail.com
                    </p>
                    <p className="text-xl font-semibold text-gray-600">Careers at Forever</p>
                    <p className="text-gray-500">了解更多关于我们的团队</p>
                    <button className="translate-all border border-black px-8 py-4 text-sm duration-500 hover:bg-black hover:text-white">
                        加入我们
                    </button>
                </div>
            </div>
            <NewsletterBox />
        </>
    );
}
