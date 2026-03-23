import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function PageHero({ title, backgroundImage }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="h-[400px] flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <h1 className="hero-title text-white text-4xl font-bold z-10">
        {title}
      </h1>
    </section>
  );
}