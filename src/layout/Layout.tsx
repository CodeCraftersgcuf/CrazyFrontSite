import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Heart, X, LogOut, User as UserIcon } from 'lucide-react';
import SocialLogin from '../components/SocialLogin';
import SearchBar from '../components/SearchBar';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [imageError, setImageError] = useState(false);
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorite";
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Listen to Firebase auth state changes directly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser); // Debug log
      setUser(firebaseUser);
      setImageError(false); // Reset image error when user changes
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    console.log('Login successful:', loggedInUser); // Debug log
    setUser(loggedInUser);
    setShowLogin(false);
    setImageError(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setShowProfileDropdown(false);
      setImageError(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageError = () => {
    console.log('Profile image failed to load'); // Debug log
    setImageError(true);
  };

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
              </div>

              {/* search bar */}
              <div className='SearchBar relative hidden lg:block'>
                <SearchBar 
                  placeholder="Search games..." 
                  className="min-w-[400px]"
                />
              </div>

              {/* login like etc */}
              <div className='flex items-center gap-2'>
                <Link to={'/favorite'}>
                  <div className='w-10 h-10 rounded-full bg-[#373952] flex items-center justify-center'>
                    <Heart 
                      size={24}
                      fill="currentColor"
                      className={`transition-all duration-200 ${
                        isFavoritePage
                          ? 'fill-purple-600 text-purple-600 scale-110'
                          : 'text-gray-300 hover:text-purple-400'
                      }`}
                    />
                  </div>
                </Link>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="flex items-center gap-2 hover:bg-[#373952] p-2 rounded-lg transition-colors"
                    >
                      {user.photoURL && !imageError ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                          onError={handleImageError}
                          onLoad={() => console.log('Image loaded successfully')}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#8668FF] flex items-center justify-center">
                          <UserIcon size={16} className="text-white" />
                        </div>
                      )}
                      <span className="text-white text-sm hidden lg:block">
                        {user.displayName || user.email?.split('@')[0] || 'User'}
                      </span>
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[#1F2030] border border-gray-600 rounded-lg shadow-lg z-50">
                        <div className="p-3 border-b border-gray-600">
                          <div className="flex items-center gap-3 mb-2">
                            {user.photoURL && !imageError ? (
                              <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                onError={handleImageError}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#8668FF] flex items-center justify-center">
                                <UserIcon size={20} className="text-white" />
                              </div>
                            )}
                            <div>
                              <p className="text-white font-medium text-sm">
                                {user.displayName || user.email?.split('@')[0] || 'User'}
                              </p>
                              <p className="text-gray-400 text-xs">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left text-white hover:bg-[#373952] rounded transition-colors"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowLogin(true)}
                    className='bg-[#8668FF] text-white text-nowrap lg:text-wrap px-4 py-2 rounded-full hover:bg-[#8668FF]/80 transition duration-300 capitalize font-bold'
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Search Bar */}
            <div className="lg:hidden p-4 bg-[#1F2030]">
              <SearchBar placeholder="Search games..." />
            </div>
            
            <div className="p-8 text-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
          <div className="bg-[#1F2030] rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <SocialLogin 
              onLoginSuccess={handleLoginSuccess}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
