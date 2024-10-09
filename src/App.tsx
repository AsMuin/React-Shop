import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './components/Navbar';

export default function App() {
    return (
        <>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Navbar></Navbar>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    );
}
