import React from "react";
import useData from "../hooks/useData";

import Hero from "../components/Hero";
import AboutSection from "../components/About";
import OurClients from "../components/OurClients";
import KeyServices from "../components/KeyServices";
import ProjectsSlider from "../components/ProjectsSlider";
import ServiceOverview from "../components/ServiceOverview";

const Home = () => {
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
      {/* HERO */}
      {data.hero?.visible && data.hero?.slides?.length > 0 && (
        <Hero data={data.hero} />
      )}

      {/* ABOUT */}
      {data.about?.visible && data.about?.items?.length > 0 && (
        <AboutSection data={data.about} />
      )}

      {/* CLIENTS */}
      {data.clients?.visible && data.clients?.items?.length > 0 && (
        <OurClients data={data.clients} />
      )}

      {/* KEY SERVICES */}
      {data.services?.visible && data.services?.items?.length > 0 && (
        <KeyServices data={data.services} />
      )}

      {/* PROJECTS */}
      {data.projects?.visible && data.projects?.items?.length > 0 && (
        <ProjectsSlider data={data.projects} />
      )}

      {/* SERVICE OVERVIEW ✅ FIXED */}
      {data.serviceOverview && data.serviceOverview.visible !== false && (
        <ServiceOverview data={data.serviceOverview} />
      )}
    </>
  );
};

export default Home;