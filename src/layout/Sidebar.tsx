import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LinkComp from "./components/Link";
import { down_Sidebar_links, top_Sidebar_links } from "../constants/Sidebar";
import logo from '../assets/react.svg'

interface SidebarProps {
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setmenuOpen] = useState(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleMenu = () => {
    setmenuOpen(!menuOpen);
  };

  return (
    <div onMouseEnter={handleMenu} onMouseLeave={handleMenu}
      className={`bg-[#1F2030] text-white overflow-auto hiddenscroll h-screen transition-all duration-300 ease-in-out ${!menuOpen ? "w-[180px]" : "w-[65px]"
        } `}
    >

      {/* Close button for mobile */}
      <div className="flex justify-end lg:hidden">
        <button
          className="text-xl cursor-pointer mx-4 mt-2"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
      </div>
      {/* Sidebar content */}
      <div className="pl-4 flex items-center min-h-[72px] sticky top-0 z-[100] bg-[#1F2030]">
        <Link to="/">
          <h1 className="text-xl md:text-lg font-medium flex items-center gap-2  w-full text-white">
            <img src={logo} alt="Logo" className="size-6" />
            {!menuOpen && "Lets play"}
          </h1>
        </Link>
        {/* <div
          onClick={handleMenu}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#257355] px-1 rounded-l-xl"
        >
          {!menuOpen ? (
            <i className="bi bi-arrow-left-short text-2xl"></i>
          ) : (
            <i className="bi bi-arrow-right-short text-2xl"></i>
          )}
        </div> */}
      </div>
      {/* Menu */}
      <div className={`pt-4`}>
        <nav className="flex flex-col gap-1">
          {top_Sidebar_links.map((x, index) => (
            <LinkComp
              key={index}
              name={x.name}
              link={x.link}
              icon={x.icon}
              sub={x.sublinks}
              isActiveCheck={activeLink === x.link}
              onClick={() => setActiveLink(x.link)}
              menuStatus={menuOpen}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 py-2">
        <hr />
      </div>
      <div className="pb-10">
        <nav className="flex flex-col gap-1">
          {down_Sidebar_links.map((x, index) => (
            <LinkComp
              key={index}
              name={x.name}
              link={"category"+ x.link}
              icon={x.icon}
              sub={x.sublinks}
              isActiveCheck={activeLink === x.link}
              onClick={() => setActiveLink(x.link)}
              menuStatus={menuOpen}
            />
          ))}
        </nav>
      </div>
      {/* <div className="py-4 border-t-2 border-[#093826] mt-4 flex items-center justify-center">
        <button className="flex items-center justify-center p-2 gap-2 text-[#FF0000] font-bold rounded-lg w-full border border-[#F70F0F]">
          <i className="bi bi-box-arrow-left text-2xl"></i>
          {!menuOpen && <span>Logout</span>}
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;