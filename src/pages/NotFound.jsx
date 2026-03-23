import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">

      {/* 404 */}
      <h1 className="text-7xl md:text-8xl font-bold text-red-500">
        404
      </h1>

      {/* Message */}
      <p className="text-xl mt-4 font-medium">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>

    </div>
  );
}