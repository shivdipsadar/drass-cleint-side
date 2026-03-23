import React from "react";

const VisionaryCard = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          {data.title}{" "}
          <span className="text-blue-600">{data.highlight}</span>
        </h2>

        <div className="w-40 h-[3px] bg-blue-600 mx-auto mt-2 mb-8"></div>

        <div className="space-y-3 text-gray-600 leading-relaxed text-[15px]">

          {data.paragraphs?.map((p, index) => (
            <p key={index}>{p}</p>
          ))}

        </div>

      </div>

    </section>
  );
};

export default VisionaryCard;