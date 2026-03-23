import React from "react";
import useData from "../hooks/useData";

import ServiceOverview from "../components/ServiceOverview";
import Sectors from "../components/Sectors";
import PageHero from "../components/PageHero";

const Projects = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
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
      {/* HERO (SAFE) */}
      {data?.projectsPage?.hero?.visible !== false && (
        <PageHero
          title={data?.projectsPage?.hero?.title || "Our Projects"}
          backgroundImage={
            data?.projectsPage?.hero?.background ||
            "/images/background/abouthero.building1.jpg"
          }
        />
      )}

      {/* SERVICE OVERVIEW */}
      {data?.serviceOverview && (
        <ServiceOverview data={data.serviceOverview} />
      )}

      {/* SECTORS */}
      {data?.sectors && (
        <Sectors data={data.sectors} />
      )}
    </>
  );
};

export default Projects;