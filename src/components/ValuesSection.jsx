import { Eye, Flag, Target } from "lucide-react";
import ValueCard from "./ValueCard";

export default function ValuesSection({ data }) {

  // ✅ correct structure
  const values = data?.items || [];

  const iconMap = {
    Eye: <Eye size={40} />,
    Flag: <Flag size={40} />,
    Target: <Target size={40} />,
  };

  // ❌ hide section
  if (data?.visible === false) return null;

  // ❌ empty
  if (!values.length) {
    return (
      <section className="py-20 text-center text-gray-500">
        No Values Available
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          {values.map((item, index) => (
            <ValueCard
              key={item.id || index}
              icon={iconMap[item.icon]}
              title={item.title}
              description={item.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}