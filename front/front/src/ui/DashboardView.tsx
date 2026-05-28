"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import profilePic from "@/asset/foto.jpg";

const DashboardView = () => {
  const { userData } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">

      {/* 👤 PROFILE HEADER */}
      <div className="max-w-4xl mx-auto flex flex-col items-center mb-10">

        {/* PROFILE IMAGE */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={profilePic}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        {/* NAME */}
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Welcome, {userData?.user.name}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Your personal dashboard
        </p>
      </div>

      {/* 📦 USER INFO CARD */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-8 border">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Information
        </h2>

        <div className="space-y-4 text-gray-600 text-lg">
          <p>
            <span className="font-semibold text-gray-800">Address:</span>{" "}
            {userData?.user.address}
          </p>

          <p>
            <span className="font-semibold text-gray-800">Email:</span>{" "}
            {userData?.user.email}
          </p>

          <p>
            <span className="font-semibold text-gray-800">Phone:</span>{" "}
            {userData?.user.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;