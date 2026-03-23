import {
  Settings,
  Home,
  ClipboardList,
  Ruler,
  Building2,
  Droplet
} from "lucide-react";

function ServiceCard({ icon, title }) {
  return (
    <div className="flex flex-col items-center justify-center text-center border border-gray-200 hover:bg-gray-50/80 transition py-14 px-6 min-h-[180px]">
      <div className="text-gray-600 mb-6">{icon}</div>

      <h3 className="text-sm md:text-base font-semibold tracking-wide text-gray-800">
        {title}
      </h3>
    </div>
  );
}

export default function ServiceOverview({ data }) {

  const section = data;

  // ❌ not loaded
  if (!section) return null;

  // ❌ section OFF
  if (section.visible === false) return null;

  const services = section.items || [];

  // ❌ no services
  if (!services.length) {
    return (
      <section className="py-24 text-center text-gray-500">
        No Services Available
      </section>
    );
  }

  // 🔥 ICON MAP
  const iconMap = {
    Settings: <Settings size={40} />,
    Home: <Home size={40} />,
    ClipboardList: <ClipboardList size={40} />,
    Ruler: <Ruler size={40} />,
    Building2: <Building2 size={40} />,
    Droplet: <Droplet size={40} />
  };

  return (
    <section
      className="py-24 bg-gray-100 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: section.background
          ? `url(${section.background})`
          : "url('/images/background/background-06.16a3353e.jpg')"
      }}
    >

      <div className="w-[95vw] max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {section.title || "OUR SERVICE OVERVIEW"}
        </h2>

        <div className="w-40 h-[3px] bg-blue-600 mx-auto mt-4 mb-16"></div>

        {/* GRID */}
        <div className="bg-white/85 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">

            {services
              .filter(s => s.visible !== false || s.visible === undefined)
              .map((service, index) => (
                <ServiceCard
                  key={service.id || index}
                  icon={iconMap[service.icon] || <Settings size={40} />}
                  title={service.title}
                />
              ))}

          </div>

        </div>

      </div>

    </section>
  );
}