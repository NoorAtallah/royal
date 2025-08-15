import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import img from '../../assets/1.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const closeAll = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  const services = [
    { name: "Technology Solutions", path: "/technology-solutions" },
    { name: "Travel & Tourism", path: "/services/travel" },
    { name: "Food Services", path: "/services/food" },
    { name: "Real Estate", path: "/services/real-estate" },
    { name: "Retail", path: "/services/retail" },
    { name: "Logistics Services", path: "/services/logistics" }
  ];

  return (
    <nav className="bg-gradient-to-b from-gray-900/30 to-gray-900/90 text-white z-50 fixed w-full top-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Reduced space-x from space-x-0 to -space-x-1 to bring elements closer */}
          <div className="flex items-center -space-x-4">
            <Link to="/" className="flex items-center space-x-1">
              <img 
                src={img}
                alt="Royal Delta Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-white text-xl font-bold tracking-wider">
                ROYAL DELTA GROUP
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/" 
              className="px-4 py-2 mx-1 border-b-2 border-transparent hover:border-[#D7BE68] text-sm uppercase tracking-wider font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 mx-1 border-b-2 border-transparent hover:border-[#D7BE68] text-sm uppercase tracking-wider font-medium"
            >
              About Us
            </Link>
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={toggleServices}
                className="px-4 py-2 mx-1 border-b-2 border-transparent hover:border-[#D7BE68] text-sm uppercase tracking-wider font-medium flex items-center"
              >
                Our Industries <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 w-56 bg-gradient-to-b from-gray-900/30 to-gray-900/90 mt-0 shadow-md border border-[#e0e0de]">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      to={service.path}
                      className="block px-4 py-3 text-sm hover:bg-[#D7BE68] hover:text-[#ebebe8] transition-colors"
                      onClick={closeAll}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleNav} className="text-[#D7BE68] hover:text-[#D7BE68]">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-2 bg-gradient-to-b from-gray-900/30 to-gray-900/90 border-t border-[#e0e0de]">
            <div className="flex flex-col">
              <Link 
                to="/" 
                className="py-3 px-4 border-l-4 border-transparent hover:border-[#D7BE68] transition-colors"
                onClick={closeAll}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="py-3 px-4 border-l-4 border-transparent hover:border-[#D7BE68] transition-colors"
                onClick={closeAll}
              >
                About Us
              </Link>
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={toggleServices}
                  className="w-full text-left py-3 px-4 border-l-4 border-transparent hover:border-[#D7BE68] transition-colors flex items-center justify-between"
                >
                  Our Industries 
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {isServicesOpen && (
                  <div className="bg-gradient-to-b from-gray-900/30">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="block py-3 pl-8 pr-4 hover:border-[#D7BE68] transition-colors"
                        onClick={closeAll}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;