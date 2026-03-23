import React from "react";
import useData from "../hooks/useData";

import PageHero from "../components/PageHero";
import ServiceOverview from "../components/ServiceOverview";
import Sectors from "../components/Sectors";

import { getImageUrl } from "../utils/api";

const Services = () => {

  const { data, loading, error } = useData();

  // 🔄 Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
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

  const pageHero = data?.servicesPage?.hero;
  const sectors = data?.sectors;

  return (
    <>

      {/* ✅ HERO (Dynamic) */}
      {pageHero?.title && (
        <PageHero
          title={pageHero.title}
          backgroundImage={
            pageHero.background
              ? getImageUrl(pageHero.background)
              : ""
          }
        />
      )}

      {/* ✅ SERVICE OVERVIEW */}
      {data.serviceOverview?.visible &&
        data.serviceOverview?.items?.length > 0 && (
          <ServiceOverview data={data.serviceOverview} />
      )}

      {/* ✅ SECTORS */}
      {sectors?.visible && sectors?.items?.length > 0 && (
        <Sectors data={sectors} />
      )}

    </>
  );
};

export default Services;