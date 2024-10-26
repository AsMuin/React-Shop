import { assets } from '@/assets/assets';
import NewsletterBox from '@/components/NewsletterBox';
import Title from '@/components/Title';

export default function About() {
    return (
        <>
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1="ABOUT" text2="US" />
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        Forever was born out of the need for a simple and affordable e-commerce platform that can be easily managed by non-technical
                        the way that businesses need. We are a team of developers and designers who are passionate about creating products that are
                        both functional and engaging. We are dedicated to providing the best possible service to our clients, and we are always
                        looking for new ways to improve our products and services.
                    </p>
                    <p>
                        Since our inception, we're dedicated to curating a diverse range of products that are tailored to meet the needs of our
                        clients and business partners. We believe that the best way to create a great product is to focus on the user experience and
                        design, and we're always looking for new ways to improve our products and services.
                    </p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>
                        Our mission is to provide a platform that is easy to use, affordable, and reliable. We strive to provide a platform that is
                        user-friendly, responsive, and secure. We aim to provide a platform that is easy to manage and customize, and that can be used
                        by anyone, anywhere, anytime.
                    </p>
                </div>
            </div>
            <div className="text-xl py-4 ">
                <Title text1="WHY" text2="CHOOSE US" />
            </div>
            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Quality Assurance</b>
                    <p className="text-gray-600">
                        We have a team of experienced developers and designers who are dedicated to providing the best possible service to our clients
                        and business partners. We have a rigorous testing process to ensure that our products meet the highest standards of quality.
                    </p>
                </div>{' '}
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Convenience:</b>
                    <p className="text-gray-600">
                        With our easy-to-use platform, you can shop from anywhere, anytime, and on any device. You can access your orders, track your
                        deliveries, and manage your account all from your smartphone or computer.
                    </p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Exceptional Customer Service</b>
                    <p className="text-gray-600">
                        Our team of customer service representatives are available to assist you with any questions or concerns you may have about
                        your order or any other aspect of your experience with Forever E Commerce Platform Services and products and services we offer
                        to you through our website or mobile app or other channels of communication with us or our{' '}
                    </p>
                </div>
            </div>
            <NewsletterBox />
        </>
    );
}
