import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getImageUrl } from "../utils/api";

export default function Navbar({ data }) {
  const [open, setOpen] = useState(false);

  const nav = data || {};

  const links = nav.links || [
    { name: "Home", path: "/" },
    { name: "About-Us", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Clients", path: "/clients" },
    { name: "Services", path: "/services" },
    { name: "Contact-Us", path: "/contact" },
  ];

  return (
    <nav className="w-full fixed bg-white z-50 shadow-sm">
      <div className="w-full px-4 py-4 flex items-center justify-around">

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4">

          <img
            src={nav.logo ? getImageUrl(nav.logo) : "/dras-logo.jpeg"}
            alt="logo"
            className="h-16"
            onError={(e) => {
              e.target.src = "/dras-logo.jpeg";
            }}
          />

          <div>
            {/* Mobile Title */}
            <h1 className="text-xl font-bold text-[#1c6c8c] md:hidden">
              {nav.mobileTitle || "DRAS"}
            </h1>

            {/* Desktop Title */}
            <h1 className="hidden md:block font-bold text-2xl text-[#1c6c8c]">
              {nav.title || "DRAS Engineers and Contractors"}
            </h1>

            {/* Tagline */}
            <p className="text-xs text-[#1c6c8c]">
              {nav.tagline || "Building Excellence. Managing Success."}
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 font-medium text-gray-800">
          {links.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-sky-600 pb-1 text-sky-600"
                    : "hover:text-sky-600 pb-1"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Call Section */}
        <div className="hidden md:flex items-center border-l pl-6 ml-6">
          <div>
            <p className="text-xs text-gray-500">Call Us:</p>
            <p className="font-semibold text-black text-lg">
              {nav.phone || "+91 XXXXXXXX"}
            </p>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col text-gray-700 font-medium">
            {links.map((item, index) => (
              <li key={index} className="border-b">
                <Link
                  to={item.path}
                  className="block px-6 py-3"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}