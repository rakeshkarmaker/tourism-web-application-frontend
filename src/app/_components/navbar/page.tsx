"use client";

import {
  faArrowRightFromBracket,
  faChartLine,
  faPlane,
  faSquarePollVertical,
  faUser,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { rootURL } from '../../../../constant';

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId; // Ensure your route provides a userId param
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const linkPath = `/dashboard/overview`;
  const isActive = pathname === linkPath; // This could be used for active link styling

  const logout = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (!token) {
        setError("No access token found. Please log in.");
        console.error(error);
        setTimeout(() => router.replace("/login"), 1000);
        return;
      }
      const response = await fetch(`${rootURL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Remove the token from the cookie
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("Logged out successfully!");
        setTimeout(() => router.replace("/login"), 1000);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.\n" + error);
      setTimeout(() => router.replace("/login"), 1000);
    }
  };

  return (
    <div>
      {/* Place header outside the ul for valid semantics */}
      <div className="menu bg-purple-600 px-4 text-white w-56 h-screen sticky top-0">
        <div className="p-4">
          <p className="text-xl font-bold">
            Welcome {userId || "User"}
          </p>
        </div>

        <div className="flex flex-col items-center mb-4">
          <Image
            src="/logo.png"
            alt="Tour Valley Logo"
            width={100}
            height={100}
          />
          <p className="text-sm mt-1">Tour Valley</p>
        </div>

        <ul className="text-left">
          <li className="pb-2">
            <Link
              href="/dashboard/overview"
              className={`flex items-center p-2 rounded hover:bg-purple-900 ${
                isActive ? "bg-purple-900" : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faSquarePollVertical}
                className="mr-2"
              />
              Overview
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/tourSchedules"
              className="flex items-center p-2 hover:bg-purple-900 rounded"
            >
              <FontAwesomeIcon icon={faPlane} className="mr-2" />
              Tour Schedules
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/tourPosts/view"
              className="flex items-center p-2 hover:bg-purple-900 rounded"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Tour Posts
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/bankHistory"
              className="flex items-center p-2 hover:bg-purple-900 rounded"
            >
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Bank History & Statements
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/tourBookingHistory"
              className="flex items-center p-2 hover:bg-purple-900 rounded"
            >
              <FontAwesomeIcon icon={faUserTie} className="mr-2" />
              Tour Booking History
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/questionAnswer"
              className="flex items-center p-2 hover:bg-purple-900 rounded"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Question & Answer
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/profile"
              className="flex items-center p-2 hover:bg-purple-900 rounded"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              My Profile
            </Link>
          </li>

          <li className="mt-8">
            <button
              onClick={logout}
              className="flex items-center p-2 w-full text-left rounded hover:bg-pink-900"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-2"
              />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
