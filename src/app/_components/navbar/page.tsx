

'use client'
import {
  faArrowRightFromBracket,
  faChartLine,
  faPlane,
  faSquarePollVertical,
  faUser,
  faUserTie,
  faUsers
} from '@fortawesome/free-solid-svg-icons'; //npm i --save @fortawesome/fontawesome-free
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function SideBar(props: any) {
    const route = useRouter();

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/authentication/logout', {}, { withCredentials: true });

            if (response.status === 201) {
                alert('Logged out successfully!');
                route.replace('/Login');
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
                    <p className="text-xl font-bold">Welcome Rakesh</p>
                    <p className="text-sm mt-1">Tour Valley</p>
                </div>
                <div className="h-8"></div>

                {/* Menu Items */}
                <li>
                    <Link href="../Dashboard/Overview">
                        <FontAwesomeIcon icon={faSquarePollVertical} />
                        Overview
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/TourSchedules">
                        <FontAwesomeIcon icon={faPlane} />
                        Tour Schedules
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/MyTourPosts">
                        <FontAwesomeIcon icon={faUser} />
                        My Tour Posts
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/BankHistory">
                        <FontAwesomeIcon icon={faChartLine} />
                        Bank History & Statements
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/TourBookingHistory">
                        <FontAwesomeIcon icon={faUserTie} />
                        Tour Booking History
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/QuestionAnswer">
                        <FontAwesomeIcon icon={faUsers} />
                        Question & Answer
                    </Link>
                </li>
                <li>
                    <Link href="../Dashboard/MyProfile">
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