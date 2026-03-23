import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";

import { Home, Building2, School, Factory } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function KeyServices({ data }) {
  const sectionRef = useRef(null);

  const services = data?.items || [];
  const title = data?.title || "OUR KEY SERVICES";

  const iconMap = {
    Home: <Home size={40} />,
    Building2: <Building2 size={40} />,
    School: <School size={40} />,
    Factory: <Factory size={40} />,
  };

  useLayoutEffect(() => {
    if (!services.length) return;

    const ctx = gsap.context(() => {

      gsap.from(".services-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".service-card", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* TITLE */}
        <h2 className="services-heading text-3xl md:text-4xl font-semibold">
          {title}
        </h2>

        <div className="w-40 h-[3px] bg-blue-600 mx-auto mt-4 mb-16"></div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {services.map((service, index) => (
            <div key={service.id || index} className="service-card">

              <ServiceCard
                icon={iconMap[service.icon] || <Home size={40} />}
                title={service.title}
                description={service.description}
              />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}