import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import ShopContextProvider from './context/ShopContext';
import SearchBar from './components/SearchBar';

export default function App() {
    return (
        <>
            <ShopContextProvider>
                <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                    <Navbar></Navbar>
                    <SearchBar />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </ShopContextProvider>
        </>
    );
}
