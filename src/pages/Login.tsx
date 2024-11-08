import { login, register } from '@/api/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '@/hook/context';
export default function Login() {
    const [currentState, setCurrentState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { getUserCartData } = useShopContext();
    const navigate = useNavigate();
    async function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Form submitted');
        try {
            if (currentState === 'Login') {
                const response = await login({ email, password });
                if (response.token && response.success) {
                    setName('');
                    setEmail('');
                    setPassword('');
                    getUserCartData();
                    navigate('/');
                    toast.success(response.message);
                }
            } else {
                const response = await register({ name, email, password });
                if (response.success) {
                    setName('');
                    setEmail('');
                    setPassword('');
                    setCurrentState('Login');
                }
                toast.success(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handelSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="text-3xl">{currentState}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>
                {currentState === 'Login' ? (
                    ''
                ) : (
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Name"
                    />
                )}
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Email"
                    required
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Password"
                    required
                />
                <div className="w-full  flex justify-between text-sm mt-[-8px]">
                    <p className="cursor-pointer">Forgot your password?</p>
                    {currentState === 'Login' ? (
                        <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
                            Create account
                        </p>
                    ) : (
                        <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
                            Login Here
                        </p>
                    )}
                </div>
                <button className="bg-black text-white py-2 px-8 font-light mt-4">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
            </form>
        </>
    );
}
