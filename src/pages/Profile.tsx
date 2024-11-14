import Title from '@/components/Title';
import UpdatePassword from '@/components/UpdatePassword';
function Profile() {
    return (
        <>
            <div className="container-sm mx-auto">
                <Title text1="MY" text2="PROFILE" />
                <ul className="flex min-h-[15rem] flex-col gap-8 overflow-hidden p-6 shadow-xl">
                    <li className="group p-4 text-center text-gray-400 duration-500 hover:scale-110 hover:font-bold hover:text-gray-600 hover:shadow-lg md:flex md:justify-center md:gap-8">
                        <p className="mb-1">昵称</p>
                        <p className="block group-hover:hidden md:hidden">...</p>
                        <p className="hidden group-hover:block md:block">2133213</p>
                    </li>
                    <li className="group p-4 text-center text-gray-400 duration-500 hover:scale-110 hover:font-bold hover:text-gray-600 hover:shadow-lg md:flex md:justify-center md:gap-8">
                        <p className="mb-1">邮箱</p>
                        <p className="block group-hover:hidden md:hidden">...</p>
                        <p className="hidden group-hover:block md:block">2133213</p>
                    </li>
                </ul>
            </div>
            <UpdatePassword />
        </>
    );
}
export default Profile;
