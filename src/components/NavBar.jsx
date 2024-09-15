import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import DOMPurify from 'dompurify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]); // State to store resources

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const db = getDatabase();
    const workshopRef = ref(db, "workshops");

    onValue(workshopRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const workshopList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setWorkshops(workshopList.reverse());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const eventsRef = ref(db, "events");

    onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const eventList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEvents(eventList.reverse());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  // Fetch resources from the database
  useEffect(() => {
    const db = getDatabase();
    const resourcesRef = ref(db, "resources");

    onValue(resourcesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const resourceList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setResources(resourceList.reverse()); // Store the resources
      } else {
        console.log("No data available");
      }
    });
  }, []);

  const sanitizeContent = (content) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  const navItems = [
    {
      name: "About",
      path: "/about/story",
      dropdown: [
        { name: "Our Team", path: "/about/team" },
        { name: "Our Story", path: "/about/story" },
        { name: "Publications", path: "/about/library" }, // Added link to Research Papers
      ],
    },
    {
      name: "Initiatives",
      path: "/initiatives",
      dropdown: [
        {
          name: "The Internet College",
          path: "/initiatives/internetCollege",
          subDropdown: [
            { name: "Engineering Kitchen", path: "/initiatives/internetCollege/engineeringKitchen" },
          ],
        },
        { name: "The College of Startups", path: "/initiatives/startup" },
      ],
    },
    {
      name: "Online Courses",
      path: "/courses",
      dropdown: [
        { name: "Courses for Students", path: "courses/students" },
        { name: "Courses for Teachers", path: "courses/teachers" },
      ],
    },
    {
      name: "Workshops",
      path: `/workshop/${workshops[0]?.id}`,
      dropdown: workshops.map((workshop) => ({
        name: workshop.headerTitle,
        path: `/workshop/${workshop.id}`,
      })),
    },
    {
      name: "Events",
      path: `/event/${events[0]?.id}`,
      dropdown: events.map((event) => ({
        name: event.headerTitle,
        path: `/event/${event.id}`,
      })),
    },
    {
      name: "Others",
      path: `/activities`,
      dropdown: [
        {
          name:"Activities",
          path:'/activities'
        },
        {
          name:"Resources",
          path:"/resources"
        }
      ]
    },

    {
      name: "Gallery",
      path: "/gallery",
    },
    { name: "Latest", path: "/latest" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md relative z-50">
      <div className="mx-auto px-3 py-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between relative">
          <Link to="/" className="relative z-10" onClick={() => setIsOpen(false)}>
            <img src="/msflogo.png" alt="Logo" className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-28 sm:-mb-12" />
          </Link>
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              aria-label="toggle menu"
              onClick={toggleNavbar}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.36 6.64a1 1 0 00-1.41 0L12 11.59 7.05 6.64a1 1 0 00-1.41 1.41L10.59 13l-4.95 4.95a1 1 0 001.41 1.41L12 14.41l4.95 4.95a1 1 0 001.41-1.41L13.41 13l4.95-4.95a1 1 0 000-1.41z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a 1 1 0 010 2H4a1 1 0 010-2z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`lg:flex items-center ${isOpen ? "block" : "hidden"} lg:relative lg:top-0 lg:left-auto absolute top-16 left-0 w-full bg-gray-800 lg:bg-transparent transition-all duration-300`}>
          <div className="flex flex-col lg:flex-row lg:ml-auto lg:mx-2 gap-0">
            {navItems.map((item, index) => (
              <div key={index} className="relative group lg:relative lg:group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "w-fit mt-1 mb-0 text-center text-blue-400 lg:mx-4 lg:my-0 font-bold"
                      : "w-fit mt-1 mb-0 text-gray-200 text-center hover:text-white lg:mx-4 lg:my-0 lg:font-bold"
                  }
                  onClick={() => setIsOpen(false)} // Close the navbar on click
                >
                  {item.name} {item.dropdown && <span className="ml-0">&#9656;</span>}
                </NavLink>
                {item.dropdown && (
                  <div
                    className={`${isOpen ? "block" : "hidden"
                      } lg:absolute lg:group-hover:block bg-gray-800 shadow-md rounded-md mt-0 z-50 lg:w-fit transition-all ease-in-out duration-300`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <div key={subIndex} className="relative group">
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            isActive
                              ? "block px-4 py-2 text-blue-400 hover:bg-gray-700 text-center rounded-md font-medium"
                              : "block px-4 py-2 text-gray-200 hover:bg-gray-700 text-center rounded-md font-medium"
                          }
                          onClick={() => setIsOpen(false)} // Close the navbar on click
                        >
                          <span dangerouslySetInnerHTML={sanitizeContent(subItem.name)} />
                        </NavLink>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-4 lg:flex-row lg:ml-4 lg:space-x-4 space-y-2 lg:space-y-0">
            <a href="https://www.facebook.com/MathSciFound" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/company/mathematical-sciences-foundation/people/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
