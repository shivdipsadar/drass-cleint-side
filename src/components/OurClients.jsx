import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageUrl } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

export default function OurClients({ data }) {

  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

  const clients = data?.items || [];

  // ✅ GSAP Animation
  useLayoutEffect(() => {
    if (!clients.length) return;

    const ctx = gsap.context(() => {

      // Heading animation
      gsap.from(".clients-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Marquee animation
      gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 25,
        ease: "linear",
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();

  }, [clients]);

  // ❗ Empty state
  if (!clients.length) {
    return (
      <section className="py-24 text-center text-gray-500">
        No Clients Available
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 flex justify-center">

      <div className="w-[95vw] bg-white rounded-3xl shadow-xl py-20 px-6 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        <div className="max-w-7xl mx-auto text-center">

          {/* Title */}
          <h2 className="clients-heading text-3xl md:text-4xl font-bold text-gray-900">
            OUR <span className="text-blue-700">INDUSTRIAL CLIENTS</span>
          </h2>

          <div className="w-40 h-[3px] bg-blue-700 mx-auto mt-4 mb-16"></div>

          {/* Marquee */}
          <div className="overflow-hidden">

            <div
              ref={marqueeRef}
              className="flex gap-20 items-center"
              style={{ width: "200%" }}
            >
              {[...clients, ...clients].map((client, index) => (
                <img
                  key={(client.id || index) + "-" + index}
                  src={getImageUrl(client.logo)}
                  alt={client.name}
                  className="h-16 object-contain opacity-70 hover:opacity-100 hover:scale-105 transition duration-300"
                />
              ))}
            </div>

          </div>

          {/* Button */}
          <Link
            to="/clients"
            className="inline-block mt-16 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition shadow"
          >
            See All Clients
          </Link>

        </div>

      </div>

    </section>
  );
}