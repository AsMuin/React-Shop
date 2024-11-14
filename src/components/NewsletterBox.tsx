export default function NewsletterBox() {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Submitting newsletter form');
    }
    return (
        <>
            <div className="text-center">
                <p className="text-2xl font-medium text-gray-800">现在关注店铺尊享8折优惠❗</p>
                <p className="mt-3 text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <form onSubmit={onSubmit} className="sm:w1/2 mx-auto my-6 flex w-full items-center gap-3 border pl-3" action="">
                    <input className="w-full outline-none sm:flex-1" type="email" placeholder="Enter your email address" required />
                    <button type="submit" className="bg-black px-10 py-4 text-xs text-white">
                        即刻关注
                    </button>
                </form>
            </div>
        </>
    );
}
