import React from "react";
import useData from "../hooks/useData";

import AboutSection from "../components/About";
import VisionaryCard from "../components/VisionaryCard";
import ValuesSection from "../components/ValuesSection";
import ServiceOverview from "../components/ServiceOverview";
import PageHero from "../components/PageHero";

import { getImageUrl } from "../utils/api";

const About = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center text-red-500">Failed to load data</div>;
  }

  if (!data) return null;

  return (
    <>
      {data.aboutPage?.hero?.visible && (
        <PageHero
          title={data.aboutPage.hero.title}
          backgroundImage={getImageUrl(data.aboutPage.hero.background)}
        />
      )}

      {data.about?.visible && (
        <AboutSection data={data.about} />
      )}

      {data.visionary?.visible && (
        <VisionaryCard data={data.visionary} />
      )}

      {data.values?.visible && (
        <ValuesSection data={data.values} />
      )}

      {data.serviceOverview?.visible && (
        <ServiceOverview data={data.serviceOverview} />
      )}
    </>
  );
};

export default About;