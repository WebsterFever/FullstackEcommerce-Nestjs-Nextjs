import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Not Found
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        The resource you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
      >
        Return Home
      </Link>

    </div>
  );
}