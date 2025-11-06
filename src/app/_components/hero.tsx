"use client";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-x-8 w-full">

        {/* Column 1 */}
        <div className="flex-1 p-4">
          {/* Billboard Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-gray-800 mb-4">
            Travel, enjoy <br />
            and live a new <br />
            and full life <br />
            From Bangladesh
            <br />
            <span className="text-red-500">to the World</span>
          </h1>

          {/* Row of Icons */}
          <div className="flex gap-6 pt-20">
            <Image
              src="/homesite/Hotel Booking.png"
              alt="Hotel Booking"
              width={90}
              height={110}
              className="object-cover rounded-md"
            />
            <Image
              src="/homesite/services.png"
              alt="Services"
              width={90}
              height={110}
              className="object-cover rounded-md"
            />
            <Image
              src="/homesite/SUPPORT.png"
              alt="Support"
              width={90}
              height={110}
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1 pt-10">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/homesite/landing_3.png"
              alt="Photo 1"
              width={300}
              height={350}
              className="w-full object-cover rounded-lg"
            />
            <Image
              src="/homesite/landing_4.png"
              alt="Photo 2"
              width={300}
              height={350}
              className="w-full object-cover rounded-lg -mt-6"
            />
            <Image
              src="/homesite/landing_2.png"
              alt="Photo 3"
              width={300}
              height={350}
              className="w-full object-cover rounded-lg"
            />
            <Image
              src="/homesite/landing_1.png"
              alt="Photo 4"
              width={300}
              height={350}
              className="w-full object-cover rounded-lg -mt-10 md:-mt-20"
            />
          </div>

          {/* Text Content */}
          <div className="text-left mt-6">
            <h2 className="text-md md:text-lg font-bold text-red-500 mb-2">
              BEST DESTINATIONS AROUND THE WORLD
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-4">
              Stay updated with travel tips, <br />
              recommendations, and latest promos.
            </p>

            {/* Play Demo Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600"
            >
              <span>Play Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-4.533-2.672A1 1 0 009 9.392v5.216a1 1 0 001.219.97l4.533-1.614a1 1 0 00.648-.972v-1.672a1 1 0 00-.648-.971z"
                />
              </svg>
            </button>

            {isPlaying && (
              <div className="mt-4 p-4">
                {/* <YouTubeEmbed videoid="crnN-mWankQ" height={400} width={720} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
