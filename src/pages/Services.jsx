import React from "react";
import useData from "../hooks/useData";

import PageHero from "../components/PageHero";
import ServiceOverview from "../components/ServiceOverview";
import Sectors from "../components/Sectors";

const Services = () => {

  const { data, loading, error } = useData();

  // 🔄 Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  // ❌ Error
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
      {/* 🔥 HERO (DYNAMIC) */}
      {data?.servicesPage?.hero?.visible !== false && (
        <PageHero
          title={data?.servicesPage?.hero?.title || "Our Services"}
          backgroundImage={
            data?.servicesPage?.hero?.background ||
            "/images/background/abouthero.building1.4f65b51a.jpg"
          }
        />
      )}

      {/* 🔥 SAME COMPONENT (NO UI CHANGE) */}
      {data?.serviceOverview && (
        <ServiceOverview data={data.serviceOverview} />
      )}

      {/* 🔥 SECTORS */}
      {data?.sectors && (
        <Sectors data={data.sectors} />
      )}
    </>
  );
};

export default Services;