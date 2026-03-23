import Slider from "react-slick";
import ProjectCard from "./ProjectCard";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

// 🔁 Arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded shadow z-20 hover:scale-110 transition"
  >
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded shadow z-20 hover:scale-110 transition"
  >
    ›
  </button>
);

export default function ProjectsSlider({ data }) {
  const sectionRef = useRef(null);

  const projects = data?.items || [];
  const title = data?.title || "SOME OF OUR PROMINENT PROJECTS";

  const settings = {
    dots: true,
    infinite: projects.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: projects.length > 1,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // ✅ GSAP Animation
  useLayoutEffect(() => {
    if (!projects.length) return;

    const ctx = gsap.context(() => {

      // TITLE
      gsap.from(".projects-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // CLIENT NAME
      gsap.from(".project-client", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // CARDS
      gsap.from(".project-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) {
    return (
      <section className="py-20 text-center text-white bg-[#264f96]">
        No Projects Available
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-[#264f96] py-20 overflow-hidden">

      <div className="w-[90vw] max-w-7xl mx-auto text-center relative">

        {/* TITLE */}
        <h2 className="projects-heading text-3xl md:text-4xl font-bold text-white">
          {title}
        </h2>

        <div className="w-40 h-[3px] bg-white mx-auto mt-4 mb-16"></div>

        {/* SLIDER */}
        <Slider {...settings}>
          {projects.map((project, index) => (
            <div key={project.id || index}>

              <div className="grid md:grid-cols-3 gap-10 items-center">

                {/* CLIENT NAME */}
                <div className="project-client text-white text-2xl md:text-3xl font-semibold text-left leading-snug">
                  {project.client}
                </div>

                {/* CARDS */}
                <div
                  className={`md:col-span-2 grid gap-6 
                  ${
                    project.cards.length === 1
                      ? "grid-cols-1"
                      : project.cards.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : project.cards.length === 3
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2"
                  }`}
                >
                  {project.cards.map((card, i) => (
                    <div key={i} className="project-card">
                      <ProjectCard
                        image={card.image}
                        title={card.title}
                      />
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </Slider>

      </div>

    </section>
  );
}