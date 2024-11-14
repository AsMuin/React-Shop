import Title from "@/components/Title";
function Profile() {
    return (
        <>
            <div className="container-sm mx-auto">
                <Title text1="MY" text2="PROFILE" />
                <ul className="min-h-[15rem] p-6 flex flex-col gap-8 shadow-xl  overflow-hidden" >
                    <li className=" md:flex md:gap-8 md:justify-center p-4 text-gray-400 hover:scale-110 hover:shadow-lg hover:text-gray-600 hover:font-bold text-center duration-500 group">
                        <p className="mb-1">昵称</p>
                        <p className="block group-hover:hidden md:hidden">...</p>
                        <p className="hidden group-hover:block md:block">2133213</p>
                    </li>
                    <li className=" md:flex md:gap-8 md:justify-center p-4 text-gray-400 hover:scale-110 hover:shadow-lg hover:text-gray-600 hover:font-bold text-center duration-500 group">
                        <p className="mb-1">邮箱</p>
                        <p className="block group-hover:hidden md:hidden">...</p>
                        <p className="hidden group-hover:block md:block">2133213</p>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Profile;