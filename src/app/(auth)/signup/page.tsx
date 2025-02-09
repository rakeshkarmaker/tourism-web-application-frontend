/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { rootURL } from '../../../../constant';
import useAuthRedirect from '@/app/_components/hooks/useAuthRedirect';

const SignUp = () => {
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
        user_type: 'TourGuide'
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e: any) => {
        const { name, value, type } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'date' ? value : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${rootURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            const errorMessage = (err as any).message || 'Something went wrong. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Background Image */}
            <div className="hidden lg:block relative w-1/2">
                <div className="relative h-full w-full overflow-hidden">
                    <Image
                        src="/login-bg.png"
                        alt="Background"
                        fill
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center'
                        }}
                        quality={100}
                        priority
                        className="opacity-90"
                    />
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 sm:p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="flex items-center mb-4">
                            <Image
                                src="/logo.png"
                                alt="Tour Vally Logo"
                                width={50}
                                height={50}
                            />
                            <h1 className="text-2xl font-bold text-gray-800 ml-2">Tour Vally</h1>
                        </div>
                        <div className="flex items-center">
                            <Link href="/login" className="text-blue-600 hover:text-blue-500 text-sm hover:underline">
                                Already Have An Account? <span className="font-semibold">Login</span>
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-gray-600 mb-6">PLEASE ENTER YOUR INFORMATION TO REGISTER</p>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone_no"
                                    value={formData.phone_no}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* NID Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">NID Number</label>
                                <input
                                    type="text"
                                    name="nid_no"
                                    value={formData.nid_no}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            {/* User Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">User Type</label>
                                <select
                                    name="user_type"
                                    value={formData.user_type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                    required
                                >
                                    <option value="TourGuide">Tour Guide</option>
                                    <option value="Tourist">Tourist</option>
                                </select>
                            </div>
                        </div>

                        {/* NID Pic Path */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NID Picture Path</label>
                            <input
                                type="text"
                                name="nid_pic_path"
                                value={formData.nid_pic_path}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>

                        {/* Profile Pic Path */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profile Picture Path</label>
                            <input
                                type="text"
                                name="profile_pic_path"
                                value={formData.profile_pic_path}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 text-black"
                                rows={3}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Sign Up
                        </button>

                        {/* Error or Success Message */}
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;