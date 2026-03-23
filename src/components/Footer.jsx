import { Phone, MapPin } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageUrl } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ data }) {

  const footerRef = useRef(null);

  const footer = data || {};

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".footer-item", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="text-gray-300 relative overflow-hidden bg-[#120038] bg-no-repeat bg-right bg-contain"
      style={{
        backgroundImage: footer.background
          ? `url(${getImageUrl(footer.background)})`
          : "none"
      }}
    >

      {/* 🔹 Top Line */}
      <div className="absolute top-4 left-0 w-full h-[1px] bg-gray-500/30"></div>

      {/* 🔹 MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* ✅ COLUMN 1 */}
        <div className="footer-item">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            {footer.companyName || "Company Name"}
          </h2>

          <p className="text-sm leading-relaxed text-gray-400">
            {footer.description || "Company description..."}
          </p>
        </div>

        {/* ✅ COLUMN 2 */}
        <div className="footer-item">
          <h3 className="text-lg font-semibold text-gray-200 mb-6">
            Call Us
          </h3>

          {footer.phones?.map((phone, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">
              <Phone size={18} />
              <span>{phone}</span>
            </div>
          ))}

          {/* Service */}
          {footer.servicePhone && (
            <>
              <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">
                Service
              </h3>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>{footer.servicePhone}</span>
              </div>
            </>
          )}
        </div>

        {/* ✅ COLUMN 3 */}
        <div className="footer-item">
          <h3 className="text-lg font-semibold text-gray-200 mb-6">
            Office
          </h3>

          <div className="flex gap-3">
            <MapPin size={20} className="mt-1" />
            <p className="text-sm text-gray-400 leading-relaxed">
              {footer.address || "Office address..."}
            </p>
          </div>
        </div>

        {/* ✅ COLUMN 4 */}
        <div className="footer-item">
          <h3 className="text-lg font-semibold text-gray-200 mb-6">
            Site Map
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            {footer.links?.map((link, index) => (
              <li
                key={index}
                className="hover:text-white cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 🔹 BOTTOM BAR */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400 footer-item">

        {footer.copyright || "Copyright © 2025 | All rights reserved"}{" "}
        <span className="text-white">{footer.brand || "DRAS"}</span> | Designed By{" "}
        <span className="text-cyan-400">
          {footer.designer || "Your Company"}
        </span>

      </div>

    </footer>
  );
}