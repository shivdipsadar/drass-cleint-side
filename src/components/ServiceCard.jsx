export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="text-center flex flex-col items-center">

      {/* Icon Circle */}
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#0b2c6b] text-white mb-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold tracking-wide mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
        {description}
      </p>

      {/* Button */}
      <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
        Read More
      </button>

    </div>
  );
}