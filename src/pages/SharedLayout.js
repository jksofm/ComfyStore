import {Outlet} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from "../components";
function SharedLayout() {
    return (
        <>
        <Navbar />
        <Sidebar />
        <Outlet />
         <Footer />


        </>
    )
}

export default SharedLayout;