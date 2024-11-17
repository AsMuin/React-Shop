import Title from '@/components/Title';
import UpdatePassword from '@/components/UpdatePassword';
import { useState } from 'react';
import { uploadAvatar } from '@/service/api/user';
import { toast } from 'react-toastify';
function Profile() {
    const [edit, setEdit] = useState(false);
    function handleUploadAvatar() {
        const uploader = document.createElement('input');
        uploader.type = 'file';
        uploader.accept = 'image/*';
        uploader.style.display = 'none';
        uploader.onchange = async (event: any) => {
            try {
                const avatar = event.target.files[0];
                const response = await uploadAvatar({ avatar });
                toast.success(response.message);
            } catch (e) {
                console.error(e);
            }
        };
        uploader.click();
    }
    return (
        <>
            <div className="container-sm mx-auto">
                <button
                    className={`ml-auto block cursor-pointer duration-500 ${edit ? 'text-lg text-gray-600' : 'text-sm text-slate-500 hover:text-red-500'}`}
                    onClick={() => setEdit(prev => !prev)}>
                    {edit ? '返回>' : '更改密码'}
                </button>
                {edit ? (
                    <UpdatePassword />
                ) : (
                    <>
                        <Title text1="MY" text2="PROFILE" />
                        <ul className="flex min-h-[15rem] flex-col gap-8 overflow-hidden p-6 shadow-2xl">
                            <li className="group/li p-4">
                                <div className="group/img relative mx-auto h-14 w-14 duration-500 group-hover/li:scale-125">
                                    <img
                                        className="h-full w-full rounded-full shadow-md shadow-slate-700"
                                        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.TuQ08mXWbqN_vZ1EKEIpSgHaEc?w=288&h=180&c=7&r=0&o=5&pid=1.7"
                                        alt=""
                                    />
                                    <div
                                        onClick={handleUploadAvatar}
                                        className="absolute top-0 h-14 w-14 cursor-pointer rounded-full bg-slate-300 text-center text-xs leading-[3.5rem] text-slate-800 opacity-0 duration-500 group-hover/img:opacity-80">
                                        修改头像
                                    </div>
                                </div>
                            </li>
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
                    </>
                )}
            </div>
        </>
    );
}
export default Profile;
