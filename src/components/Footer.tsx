import { assets } from '@/assets/assets';

export default function Footer() {
    return (
        <>
            <div className="my-10 mt-40 flex grid-cols-[3fr_1fr_1fr] flex-col gap-14 text-sm sm:grid">
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <p className="w-full text-gray-600 md:w-2/3">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus sed ut dicta reprehenderit minima id deserunt non,
                        incidunt corrupti architecto numquam rem illo pariatur inventore exercitationem quis blanditiis, aliquid ducimus!
                    </p>
                </div>
                <div>
                    <p className="mb-5 text-xl font-medium">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+86-137-988-16552</li>
                        <li>asmuins@foxmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-center text-sm"> Copyright 2024@ forever.com - All Right Reserved</p>
            </div>
        </>
    );
}
