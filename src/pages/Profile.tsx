import Title from '@/components/Title';
import UpdatePassword from '@/components/UpdatePassword';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/service/store';
import { getUserInfo, updateUserEmail, updateUserName } from '@/service/store/user';
import { useShopContext } from '@/hook/context';
function Profile() {
    const { dispatch } = useShopContext();
    const userInfo = useAppSelector(getUserInfo);
    const [editPassword, setEditPassword] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editName, setEditName] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    function handleUploadAvatar() {
        const uploader = document.createElement('input');
        uploader.type = 'file';
        uploader.accept = 'image/*';
        uploader.style.display = 'none';
        uploader.onchange = async (event: any) => {
            try {
                const avatar = event.target.files[0];
                // const response = await uploadAvatar({ avatar });
                // toast.success(response.message);
            } catch (e) {
                console.error(e);
            }
        };
        uploader.click();
    }
    async function handleUpdateName() {
        if (editName) {
            try {
                if(name){
                    const response = await dispatch(updateUserName({ name }));
                    console.log(response);
                }else{
                    toast.error('昵称不能为空');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setEditName(true);
        }
    }
    async function handleUpdateEmail() {
        if (editEmail) {
            try {
                if(email){
                    const response = await dispatch(updateUserEmail({ email }));
                    console.log(response);
                }else{
                    toast.error('邮箱不能为空');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setEditEmail(true);
        }
    }
    return (
        <>
            <div className="container-sm mx-auto">
                <button
                    className={`ml-auto block cursor-pointer duration-500 ${editPassword ? 'text-lg text-gray-600' : 'text-sm text-slate-500 hover:text-red-500'}`}
                    onClick={() => setEditPassword(prev => !prev)}>
                    {editPassword ? '返回>' : '更改密码'}
                </button>
                {editPassword ? (
                    <UpdatePassword />
                ) : (
                    <>
                        <Title text1="MY" text2="PROFILE" />
                        <ul className="flex min-h-[15rem] flex-col gap-8 overflow-hidden p-6 shadow-2xl">
                            <li className="group/li p-4">
                                <div className="group/img relative mx-auto h-14 w-14 duration-500 group-hover/li:scale-125 ">
                                    <img
                                        className="h-full w-full rounded-full shadow-md shadow-slate-700"
                                        src={userInfo.avatar || 'src/assets/about_img.png'}
                                        alt=""
                                    />
                                    <div
                                        onClick={handleUploadAvatar}
                                        className="absolute top-0 h-14 w-14 cursor-pointer rounded-full bg-slate-300 text-center text-xs leading-[3.5rem] text-slate-800 opacity-0 duration-500 group-hover/img:opacity-80">
                                        修改头像
                                    </div>
                                </div>
                            </li>
                            <li className="group flex flex-col items-center gap-2 p-4 text-center text-gray-400 duration-500  hover:scale-110 hover:font-bold hover:text-gray-600 hover:shadow-lg md:flex-row md:justify-center md:gap-8">
                                <p>用户名</p>
                                <p className="block group-hover:hidden md:hidden">...</p>
                                <div className="hidden flex-col gap-2 group-hover:flex md:flex-row md:items-center md:gap-4 font-medium">
                                    <p className="text-sky-600">{userInfo.name || '暂未设置'}</p>
                                    <input
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                        placeholder='请输入用户名'
                                        className={`mx-auto block rounded-md border border-slate-500 px-2 outline-none focus:border-pink-400 ${editName ? '' : 'hidden'}`}
                                        type="text"
                                    />
                                    <button onClick={handleUpdateName} className=" text-sm text-red-400">
                                        {editName ? '确定修改' : '修改用户名'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditName(false);
                                        }}
                                        className={`text-xs leading-[normal] mt-2 md:ml-4 md:mt-0 text-slate-400 ${editName ? '' : 'hidden'}`}>
                                        取消修改
                                    </button>
                                </div>
                            </li>
                            <li className="group flex flex-col gap-2 p-4 text-center text-gray-400 duration-500 hover:scale-110 hover:font-bold hover:text-gray-600 hover:shadow-lg md:flex-row md:justify-center md:gap-8">
                                <p>邮箱</p>
                                <p className="block group-hover:hidden md:hidden">...</p>
                                <div className="hidden flex-col gap-2 group-hover:flex md:flex-row md:items-center md:gap-4 font-medium">
                                <p className="text-sky-600">{userInfo.email || '暂未设置'}</p>
                                    <input
                                        value={email}
                                        onChange={e => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder='请输入邮箱'
                                        className={`mx-auto block rounded-md border border-slate-500 px-2 outline-none focus:border-pink-400  ${editEmail ? '' : 'hidden'}`}
                                        type="email"
                                    />
                                    <button onClick={handleUpdateEmail} className=" text-sm text-red-400">
                                        {editEmail ? '确定修改' : '修改邮箱'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditEmail(false);
                                        }}
                                        className={`text-xs leading-[normal] mt-2 md:ml-4 md:mt-0 text-slate-400 ${editEmail ? '' : 'hidden'}`}>
                                        取消修改
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}
export default Profile;
