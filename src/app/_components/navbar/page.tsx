'use client'
import {
  faArrowRightFromBracket,
  faChartLine,
  faPlane,
  faSquarePollVertical,
  faUser,
  faUserTie,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import * as React from 'react';

export default function Navbar(props: any) {
    const router = useRouter();
    const { userId } = useParams();

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/logout',
        {},
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert('Logged out successfully!');
        router.replace('/Login');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.\n' + error);
    }
  };

  return (
    <div>
      <ul className="menu bg-primarycolor text-white w-56 h-screen text-center sticky top-0">
        {/* Header Section */}
        <div className="p-4">
          <p className="text-xl font-bold">Welcome </p>
          <p className="text-sm mt-1">Tour Valley</p>
        </div>
        <div className="h-8"></div>

        {/* Menu Items */}
        <li>
          <Link href={`/dashboard/${userId}/overview`}>
            <FontAwesomeIcon icon={faSquarePollVertical} />
            Overview
          </Link>
        </li>
        <li>
          <Link href={`/dashboard/${userId}/tourSchedules`}>
            <FontAwesomeIcon icon={faPlane} />
            Tour Schedules
          </Link>
        </li>
        <li>
          <Link href={`/dashboard/${userId}/mytourpost`}>
            <FontAwesomeIcon icon={faUser} />
            My Tour Posts
          </Link>
        </li>
        <li>
          <Link href={`/dashboard/${userId}/bankHistory`}>
            <FontAwesomeIcon icon={faChartLine} />
            Bank History & Statements
          </Link>
        </li>
        <li>
          <Link href={`/dashboard/${userId}/tourBookingHistory`}>
            <FontAwesomeIcon icon={faUserTie} />
            Tour Booking History
          </Link>
        </li>
        <li>
          <Link href={`/dashboard/${userId}/questionAnswer`}>
            <FontAwesomeIcon icon={faUsers} />
            Question & Answer
          </Link>
        </li>
        <li>
          <Link href={`/dashboard/${userId}/profile`}>
            <FontAwesomeIcon icon={faUser} />
            My Profile
          </Link>
        </li>

        {/* Logout */}
        <div className="h-8"></div>
        <li>
          <button onClick={logout} className="mt-auto">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
