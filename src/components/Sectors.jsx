import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Arrows
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded-full flex items-center justify-center shadow"
    >
      <ChevronRight size={20} />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded-full flex items-center justify-center shadow"
    >
      <ChevronLeft size={20} />
    </div>
  );
}

const Sectors = ({ data }) => {
  const section = data || {};
  const sectors = section.items || [];

  if (section.visible === false) return null;

  if (!sectors.length) {
    return (
      <section className="py-24 text-center text-gray-500">
        No Sectors Available
      </section>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-24 bg-gray-100">

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold">
          {section.title || "OUR SECTORS"}
        </h2>
        <div className="w-40 h-[3px] bg-blue-600 mx-auto mt-4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">

        <Slider {...settings}>
          {sectors
            .filter(item => item.visible !== false)
            .map((sector, index) => (
              <div key={sector.id || index} className="px-4">

                <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden flex flex-col h-full">

                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-60 object-cover hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/dras-logo.jpeg"; // fallback local
                      }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-4">
                      {sector.title}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {sector.description}
                    </p>
                  </div>

                </div>

              </div>
            ))}
        </Slider>

      </div>
    </section>
  );
};

export default Sectors;