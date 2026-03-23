import React, { useLayoutEffect, useRef } from "react";
import useData from "../hooks/useData";

import PageHero from "../components/PageHero";
import ServiceOverview from "../components/ServiceOverview";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageUrl } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const { data, loading, error } = useData();
  const sectionRef = useRef(null);

  const clients = data?.clients?.items || [];
  const clientsData = data?.clients;
  const pageHero = data?.clientsPage?.hero;

  // ✅ HOOK ALWAYS CALLED (NO CONDITION ABOVE)
  useLayoutEffect(() => {
    if (!clients.length || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".client-card");

      gsap.set(cards, { y: 80, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [clients]);

  // 🔄 AFTER HOOK → RETURNS
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load data
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      {/* HERO */}
      {pageHero?.title && (
        <PageHero
          title={pageHero.title}
          backgroundImage={getImageUrl(pageHero.background)}
        />
      )}

      {/* CLIENTS */}
      {clientsData?.visible && (
        <section ref={sectionRef} className="py-20 bg-gray-100">

          <div className="w-[95vw] max-w-7xl mx-auto">

            {!clients.length ? (
              <div className="text-center text-gray-500">
                No clients available
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {clients.map((client, index) => (
                  <div
                    key={client.id || index}
                    className="client-card group bg-white rounded-xl shadow-md hover:shadow-xl transition p-10 flex items-center justify-center relative"
                  >

                    <img
                      src={getImageUrl(client.logo)}
                      alt={client.name}
                      className="max-h-16 object-contain transition duration-300 group-hover:scale-105"
                    />

                    <span className="absolute bottom-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                      {client.name}
                    </span>

                  </div>
                ))}

              </div>
            )}

          </div>

        </section>
      )}

      {/* SERVICE OVERVIEW */}
      {data.serviceOverview?.visible && (
        <ServiceOverview data={data.serviceOverview} />
      )}
    </>
  );
}