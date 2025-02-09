'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import useAuthRedirect from '@/app/_components/hooks/useAuthRedirect';
// Adjust the import path so that it correctly resolves the constant file
import { rootURL } from '../../../../constant'; 

export default function SignupPage() {
  // If a valid token exists, the hook will redirect to the dashboard
  useAuthRedirect("/dashboard/overview");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_no: '',
    address: '',
    dob: '',
    gender: 'Male',
    nid_no: '',
    nid_pic_path: '',
    profile_pic_path: '',
    description: '',
  });
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // Retrieve token from cookies on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))?.split('=')[1];
      setToken(storedToken || null);
    }
  }, []);

  const handleNidFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNidFile(e.target.files[0]);
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async (file: File, folder: string) => {
    if (!token) {
      setError('No access token found. Please log in.');
      return '';
    }

    const fileFormData = new FormData();
    fileFormData.append('file', file);

    try {
      const response = await fetch(`${rootURL}/file/upload?folder=${folder}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fileFormData,
      });

      const data = await response.json();
      if (response.ok) {
        return data.path;
      } else {
        setError(data.message || 'Failed to upload file.');
        return '';
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred during file upload.');
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('No access token found. Please log in.');
      return;
    }

    // Create a local copy of formData for accumulating updates
    const updatedFormData = { ...formData };

    // Upload NID file (if selected) and update our local copy
    if (nidFile) {
      const nidPath = await handleUploadFile(nidFile, 'nidUpload');
      if (nidPath) {
        updatedFormData.nid_pic_path = nidPath;
      } else {
        return;
      }
    }

    // Upload Profile file (if selected) and update our local copy
    if (profileFile) {
      const profilePath = await handleUploadFile(profileFile, 'profilePic');
      if (profilePath) {
        updatedFormData.profile_pic_path = profilePath;
      } else {
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedFormData,
          user_type: "TourGuide",
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      // You may redirect the user or display a success message here.
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CREATE TOUR GUIDE ACCOUNT
          </h1>
          <p className="text-gray-600 text-lg">
            &quot;JOIN OUR GROWING COMMUNITY NOW&quot;
          </p>
          <div className="flex items-center text-center justify-center mt-4">
            <Link href="/login" className="text-blue-600 hover:text-blue-500 text-sm hover:underline">
              Already have an account? <span className="font-semibold">Login</span>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              required
            />
          </div>

          {/* Email and Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Phone and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone_no}
                onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* NID Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NID Number
            </label>
            <input
              type="text"
              value={formData.nid_no}
              onChange={(e) => setFormData({ ...formData, nid_no: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              required
            />
          </div>

          {/* NID Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NID Photo
            </label>
            <input
              type="file"
              onChange={handleNidFileChange}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              required
            />
            {formData.nid_pic_path && (
              <p className="text-green-600 mt-2">NID Photo uploaded successfully!</p>
            )}
          </div>

          {/* Profile Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              onChange={handleProfileFileChange}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              required
            />
            {formData.profile_pic_path && (
              <p className="text-green-600 mt-2">Profile Photo uploaded successfully!</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              rows={3}
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              SIGN UP
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Here, continuing, you agree to our Terms, Policy, and Privacy Service.
            </p>
            {error && <p className="mt-2 text-center text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
