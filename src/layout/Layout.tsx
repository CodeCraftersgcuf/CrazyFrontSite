import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="lg:flex bg-[#0C0D14]">
        {/* Sidebar */}
        <div
          className={`fixed lg:relative lg:top-0 lg:left-0 z-[1000] transition-transform duration-75 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:w-fit`}
        >
          <Sidebar setMobileOpen={setMobileOpen} />
        </div>
        {/* Main Content */}
        <div className={`w-full h-screen overflow-auto transition-all duration-300`}>
          <div className="">
            <div className="min-h-[72px] sticky top-0 z-[100] flex justify-between items-center px-4 md:px-8 md:pl-4 py-2 bg-[#1F2030]">
              <div className="flex items-center gap-2">
                <button
                  className="block lg:hidden"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <i className="bi bi-list text-white text-4xl"></i>
                </button>
                <h1 className='font-medium text-sm lg:text-xl text-white'>Crazy Gaming</h1>
                {/* <Agents agents={Topbar_profile_Left} /> */}
              </div>

              {/* search bar */}
              <div className='SearchBar relative hidden lg:hidden'>
                <input type="text" placeholder="Search" className='bg-[#373952] text-white py-2 outline-none border-none px-4 pr-8 rounded-full min-w-[400px]' />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <i className="bi bi-search text-white"></i>
                </button>
              </div>

              {/* login like etc */}
              <div className='flex items-center gap-2'>
                {/* <div className='w-10 h-10 rounded-full bg-[#373952] flex items-center justify-center'>
                  <i className="bi bi-people text-white"></i>
                </div> */}
                <Link to={'/favorite'}>
                  <div className='w-10 h-10 rounded-full bg-[#373952] flex items-center justify-center'>
                    <i className="bi bi-heart text-white"></i>
                  </div>
                </Link>
                <button className='bg-[#8668FF] text-white text-nowrap lg:text-wrap px-4 py-2 rounded-full hover:bg-[#8668FF]/80 transition duration-300 capitalize font-bold'>
                  Log in
                </button>
              </div>

            </div>
            <div className="p-8 text-white">
              {/* <span className='text-red-500 lg:text-yellow-500'>hello world</span> */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;