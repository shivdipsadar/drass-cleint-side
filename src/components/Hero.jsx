import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../utils/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🔁 Next Arrow
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-blue-500 p-3 rounded-full cursor-pointer transition"
    >
      <ChevronRight className="text-white w-6 h-6" />
    </div>
  );
}

// 🔁 Prev Arrow
function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-blue-500 p-3 rounded-full cursor-pointer transition"
    >
      <ChevronLeft className="text-white w-6 h-6" />
    </div>
  );
}

export default function Hero({ data }) {
  const slides = data?.slides || [];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
    dotsClass: "slick-dots hero-dots",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // ❗ Empty state
  if (!slides.length) {
    return (
      <section className="h-[70vh] flex items-center justify-center text-gray-500">
        No Slides Available
      </section>
    );
  }

  return (
    <section className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.id || index} className="relative h-[80vh] md:h-[95vh]">

            {/* Background Image */}
            <img
              src={getImageUrl(slide.image)}
              alt={slide.title}
              className="absolute w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x600?text=No+Image";
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center px-6">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl text-white"
              >

                {/* Title */}
                {slide.title && (
                  <p className="text-blue-400 uppercase tracking-widest mb-3">
                    {slide.title}
                  </p>
                )}

                {/* Subtitle */}
                {slide.subtitle && (
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {slide.subtitle}
                  </h1>
                )}

                {/* Button */}
                {slide.button && slide.link && (
                  <Link
                    to={slide.link}
                    smooth={true}
                    duration={600}
                    className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-lg font-semibold cursor-pointer transition"
                  >
                    {slide.button}
                  </Link>
                )}

              </motion.div>
            </div>

          </div>
        ))}
      </Slider>
    </section>
  );
}