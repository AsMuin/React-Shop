import { register } from '@/service/api/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo, userLogin } from '@/service/store/user';
import { getUserCartData } from '@/service/store/cart';
import { useAppDispatch } from '@/service/store';
export default function Login() {
    const [currentState, setCurrentState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    async function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Form submitted');
        try {
            if (currentState === 'Login') {
                await dispatch(userLogin({ email, password }));
                dispatch(getUserCartData());
                dispatch(fetchUserInfo());
                setName('');
                setEmail('');
                setPassword('');
                navigate('/');
                toast.success('登录成功');
            } else {
                const [Response] = register({ name, email, password });
                const { data: response } = await Response;
                setName('');
                setEmail('');
                setPassword('');
                setCurrentState('Login');
                toast.success(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form onSubmit={handelSubmit} className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96">
                <div className="mb-2 mt-10 inline-flex items-center gap-2">
                    <p className="text-3xl">{currentState}</p>
                    <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
                </div>
                {currentState === 'Login' ? (
                    ''
                ) : (
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        className="w-full border border-gray-800 px-3 py-2"
                        placeholder="请输入用户名"
                    />
                )}
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="w-full border border-gray-800 px-3 py-2"
                    placeholder="请输入邮箱地址"
                    required
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="w-full border border-gray-800 px-3 py-2"
                    placeholder="请输入密码"
                    required
                />
                <div className="mt-[-8px] flex w-full justify-between text-sm">
                    <p className="cursor-pointer">忘记你的密码?</p>
                    {currentState === 'Login' ? (
                        <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-gray-500">
                            现在就创建账户
                        </p>
                    ) : (
                        <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-gray-500">
                            点击这里登录
                        </p>
                    )}
                </div>
                <button className="mt-4 bg-black px-8 py-2 font-light text-white">{currentState === 'Login' ? '登录' : '注册'}</button>
            </form>
        </>
    );
}
