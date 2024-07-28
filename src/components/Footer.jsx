import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  const footerItems = [
    {
      title: "Organisation",
      links: [
        { name: "About", path: "/about/story" },
        { name: "Meet the Team", path: "/about/team" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { name: "Contact", path: "/contact" },
        { name: "Admin login", path: "/admin/login" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/PrivacyPolicy" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 shadow-md relative z-50 py-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="mb-6 lg:mb-0 flex flex-col items-center lg:items-start">
            <Link to="/" className="mb-4">
              <img src="/msflogo.png" alt="Logo" className="sm:h-24 sm:w-24 h-12 w-12" />
            </Link>
            <div className="flex space-x-4">
              <FaFacebook className="text-gray-200 hover:text-white" />
              <FaTwitter className="text-gray-200 hover:text-white" />
              <FaInstagram className="text-gray-200 hover:text-white" />
              <FaLinkedin className="text-gray-200 hover:text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto lg:gap-60 w-full lg:w-auto ">
            {footerItems.map((item, index) => (
              <div key={index}>
                <p className="font-medium text-blue-400">{item.title}</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-200">
                  {item.links.map((link, subIndex) => (
                    <Link key={subIndex} className="hover:text-white" to={link.path}>
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-8 text-xs text-gray-400 text-center">
        © {currentYear} Mathematical Sciences Foundation. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
