'use client'
// import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    bloodGroup: '',
    dob: '',
    education: '',
    language: 'S518s'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray- flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CREATE TOUR GUIDE ACCOUNT
          </h1>
          <p className="text-gray-600 text-lg">
            &quot;JOIN OUR GROWING COMMUNITY NOW&quot;
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              required
            />
          </div>

          {/* Address and Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Present Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <input
                type="text"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Date of Birth and Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"

                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last level of Education / Skills
              </label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              NEXT
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              By Continuing to Account, you agree to our Terms Policy and Privacy Service
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}