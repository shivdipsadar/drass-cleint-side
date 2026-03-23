import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { getImageUrl } from "../utils/api";

export default function AboutSection({ data }) {
  const sectionRef = useRef(null);
  const about = data?.items?.[0];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        x: -120,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".about-text > *", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!about) return null;

  return (
    <section ref={sectionRef} className="py-20 relative">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 items-center">

        {/* IMAGE */}
        <div className="about-image flex justify-center">
          <img
            src={getImageUrl(about.image)}
            alt="about"
            className="w-[300px] shadow-lg"
          />
        </div>

        {/* TEXT */}
        <div className="about-text max-w-xl">
          <p className="text-gray-700 tracking-widest mb-3 text-sm">
            {about.welcome}
          </p>

          <h2 className="text-4xl font-bold mb-4">
            {about.title}{" "}
            <span className="text-blue-600">{about.highlight}</span>
          </h2>

          <div className="w-32 h-[3px] bg-black mb-6"></div>

          <p className="text-gray-700 mb-4">{about.paragraph1}</p>
          <p className="text-gray-700 mb-6">{about.paragraph2}</p>

          <button className="bg-blue-500 px-6 py-2 text-white rounded">
            {about.button}
          </button>
        </div>

      </div>
    </section>
  );
}