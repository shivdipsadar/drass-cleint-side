import { getImageUrl } from "../utils/api";

export default function ProjectCard({ image, title }) {
  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition">

      {/* IMAGE */}
      <div className="bg-gray-200 flex items-center justify-center h-40">
        <img
          src={getImageUrl(image)}
          alt={title}
          className="max-h-20 object-contain"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      </div>

      {/* TITLE */}
      <div className="bg-gray-400 text-white text-sm p-4 text-center font-medium">
        {title}
      </div>

    </div>
  );
}