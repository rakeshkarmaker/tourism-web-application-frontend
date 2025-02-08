'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Profile {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  address: string;
  dob: string;
  gender: string;
  profile_pic_path: string;
  description: string;
}

export default function TourProfileViewPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))
          ?.split('=')[1];

        if (!token) {
          setError('No access token found. Please log in.');
          return;
        }

        const res = await fetch('http://localhost:3000/tour-profile/view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: Profile = await res.json();
        setProfile(data);
      } catch (err) {
        setError('An error occurred while fetching profile data.');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!profile) {
        setError('Profile data is not available.');
        return;
      }

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      if (!token) {
        setError('No access token found. Please log in.');
        return;
      }

      const res = await fetch('http://localhost:3000/tour-profile/edit', {
        method: 'PUT', // Using PUT as the method
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          phone_no: profile.phone_no,
          address: profile.address,
          dob: profile.dob,
          gender: profile.gender,
          profile_pic_path: profile.profile_pic_path,
          description: profile.description,
        }), // Using profile fields for the PUT request body
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (err) {
      setError('An error occurred while updating profile.');
      console.error(err);
    }
  };

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center mt-4">Loading profile...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="text-center mb-6">
        <Image
          src={profile.profile_pic_path}
          alt={profile.name}
          width={96}
          height={96}
          className="rounded-full mx-auto"
        />
        <h1 className="text-2xl font-bold mt-2">{profile.name}</h1>
        <p className="text-gray-500">{profile.address}</p>
        <p className="text-gray-400">{new Date(profile.dob).toDateString()}</p>
      </div>

      <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
        <label className="block mb-2 font-medium">Name:</label>
        <input name="name" type="text" value={profile.name} onChange={handleProfileChange} className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Date of Birth:</label>
        <input name="dob" type="date" value={profile.dob} onChange={handleProfileChange} className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Phone:</label>
        <input name="phone_no" type="text" value={profile.phone_no} onChange={handleProfileChange} className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Location:</label>
        <input name="address" type="text" value={profile.address} onChange={handleProfileChange} className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Gender:</label>
        <input name="gender" type="text" value={profile.gender} onChange={handleProfileChange} className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Description:</label>
        <textarea name="description" value={profile.description} onChange={handleProfileChange} className="w-full p-2 rounded text-black"></textarea>

        <button onClick={handleSaveProfile} className="w-full bg-blue-500 mt-4 py-2 rounded hover:bg-blue-600">Save</button>
      </div>

      <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Security</h2>
        <label className="block mb-2 font-medium">Email Address:</label>
        <input type="email" value={profile.email} readOnly className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Old Password:</label>
        <input type="password" placeholder="********" className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">New Password:</label>
        <input type="password" placeholder="********" className="w-full p-2 rounded text-black" />

        <label className="block mt-4 mb-2 font-medium">Confirm Password:</label>
        <input type="password" placeholder="********" className="w-full p-2 rounded text-black" />

        <button className="w-full bg-blue-500 mt-4 py-2 rounded hover:bg-blue-600">Save</button>
      </div>
    </div>
  );
}
