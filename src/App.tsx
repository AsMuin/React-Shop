import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import ShopContextProvider from './service/context/ShopContext';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './service/store';
export default function App() {
    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <ShopContextProvider>
                    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                        <Navbar></Navbar>
                        <SearchBar />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                        <Footer />
                    </div>
                </ShopContextProvider>
            </Provider>
        </>
    );
}
