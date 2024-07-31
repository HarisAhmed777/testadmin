// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './components/startpage';
import Alldatatable from './components/alldatatable';
import Bookings from './components/Bookings';
import Allusers from './components/Users';
import Allforms from './components/allforms';
import CalenderPage from './components/CalenderPage';
import AdminOffers from './components/Offers';
import Login from './components/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Logout from './components/Login/Logout';
import Blogpage from './components/Blogpage/Blogpage';
import AllBlogs from './components/Blogpage/AllBlogs';
import PackageAddPage from './components/Packages/AddPackage';
import Allpackages from './components/Packages/AllPackages';
import Earnings from './components/TotalEarnings';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoute element={<Login />} />} />
                <Route path="/admin" element={<ProtectedRoute element={<StartPage />} />} />
                <Route path="/datatables" element={<ProtectedRoute element={<Alldatatable />} />} />
                <Route path="/allbookings" element={<ProtectedRoute element={<Bookings />} />} />
                <Route path="/allusers" element={<ProtectedRoute element={<Allusers />} />} />
                <Route path="/allforms" element={<ProtectedRoute element={<Allforms />} />} />
                <Route path="/CalenderPage" element={<ProtectedRoute element={<CalenderPage />} />} />
                <Route path="/offers" element={<ProtectedRoute element={<AdminOffers />} />} />
                <Route path="/blogpage" element={<ProtectedRoute element={<Blogpage />} />} />
                <Route path="/allblogs" element={<ProtectedRoute element={<AllBlogs />} />} />
                <Route path="/packageaddpage" element={<ProtectedRoute element={<PackageAddPage />} />} />
                <Route path="/allpackages" element={<ProtectedRoute element={<Allpackages />} />} />
                <Route path="/totalearnings" element={<ProtectedRoute element={<Earnings/>} />} />



                <Route path="/logout" element={<Logout/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
