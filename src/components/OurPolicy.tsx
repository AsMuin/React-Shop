import { assets } from '@/assets/assets';

export default function OurPolicy() {
    return (
        <>
            <div className="flex flex-col justify-around gap-12 py-20 text-center text-xs text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
                <div>
                    <img src={assets.exchange_icon} className="m-auto mb-5 w-12" alt="" />
                    <p className="font-semibold">轻松退换货</p>
                    <p className="text-gray-400">我们提供无忧换货政策</p>
                </div>

                <div>
                    <img src={assets.quality_icon} className="m-auto mb-5 w-12" alt="" />
                    <p className="font-semibold">7天退换货策略</p>
                    <p className="text-gray-400">我们提供七天内免费退换货</p>
                </div>

                <div>
                    <img src={assets.support_img} className="m-auto mb-5 w-12" alt="" />
                    <p className="font-semibold">最佳的购买体验</p>
                    <p className="text-gray-400">我们提供7*24小时的客服服务</p>
                </div>
            </div>
        </>
    );
}
