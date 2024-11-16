import { useState } from 'react';
import { toast } from 'react-toastify';
import { updatePassword } from '@/api/user';
function UpdatePassword() {
    const [form, setForm] = useState({
        originalPassword: '',
        password: '',
        confirmPassword: ''
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error('两次输入的密码必须相同');
            return;
        }
        try {
            const response = await updatePassword({
                originalPassword: form.originalPassword,
                password: form.password,
                confirmPassword: form.confirmPassword
            });
            toast.success(response.message);
            setTimeout(() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    }
    function updateFormData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96">
                    <div className="mb-2 mt-10 inline-flex items-center gap-2">
                        <p className="text-2xl">更改密码</p>
                    </div>
                    <input
                        value={form.originalPassword}
                        onChange={updateFormData}
                        type="password"
                        className="peer w-full border border-gray-800 px-3 py-2"
                        placeholder="请输入原密码"
                        name="originalPassword"
                        required
                    />
                    <input
                        value={form.password}
                        onChange={updateFormData}
                        type="password"
                        className="peer w-full border border-gray-800 px-3 py-2"
                        placeholder="请输入修改后的密码"
                        name="password"
                        required
                    />
                    <input
                        value={form.confirmPassword}
                        onChange={updateFormData}
                        type="password"
                        className="peer w-full border border-gray-800 px-3 py-2"
                        placeholder="请再次确认修改后的密码"
                        name="confirmPassword"
                        required
                    />
                    <p
                        className={`self-start text-xs text-red-500 peer-focus-visible:hidden ${form.password !== form.confirmPassword ? 'block' : 'hidden'}`}>
                        *两次输入的密码必须相同
                    </p>
                    <button type="submit" className="mt-4 bg-black px-8 py-2 font-light text-white">
                        确定
                    </button>
                </form>
            </div>
        </>
    );
}
export default UpdatePassword;
