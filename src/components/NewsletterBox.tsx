export default function NewsletterBox() {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Submitting newsletter form');
    }
    return (
        <>
            <div className="text-center">
                <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
                <p className="text-gray-400 mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <form onSubmit={onSubmit} className="w-full sm:w1/2 flex items-center gap-3 mx-auto my-6 border pl-3" action="">
                    <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email address" required />
                    <button type="submit" className="bg-black text-white text-xs px-10 py-4"></button>
                </form>
            </div>
        </>
    );
}
