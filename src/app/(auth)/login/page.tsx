/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useAuthRedirect from '@/app/_components/hooks/useAuthRedirect';

const rootURL = process.env.BASE_URL;


const SignIn = () => {
    // Call the useAuthRedirect hook to redirect logged-in users to the dashboard
    useAuthRedirect("/dashboard/overview");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {// Retrieve data from cookies if rememberMe is true
        const storedEmail = Cookies.get('email');
        const storedRememberMe = Cookies.get('rememberMe');

        if (storedRememberMe === 'true') {
            setFormData((prevState) => ({
                ...prevState,
                email: storedEmail || '',
                rememberMe: true,
            }));
        }
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.email || !formData.password) {
            setError('Please fill in both email and password.');
            return;
        }

        try {
            const response = await fetch(`${rootURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Successfully signed in!');

                // Save to cookies if rememberMe is true
                if (formData.rememberMe && data?.access_token && data.user) {
                    Cookies.set('access_token', data.access_token, { expires: 7 }); // Store for 7 days
                    Cookies.set('user', JSON.stringify(data.user), { expires: 7 }); // Store user object for 7 days
                    Cookies.set('rememberMe', 'true', { expires: 7 }); // Store for 7 days
                } else {
                    // Clear cookies if rememberMe is false
                    Cookies.remove('access_token');
                    Cookies.remove('user');
                    Cookies.remove('rememberMe');
                }

                // Redirect after a short delay to allow success message to be visible
                setTimeout(() => {
                    window.location.href = `/dashboard`;
                }, 1000);
            } else {
                setError(data.message || 'Invalid email or password');
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
                            objectFit: 'contain', // Changed from 'cover' to 'contain'
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
                                src="/logo.png" // Replace with your actual logo path
                                alt="Tour Vally Logo"
                                width={50}
                                height={50}
                            />
                            <h1 className="text-2xl font-bold text-gray-800 ml-2">Tour Vally</h1>
                        </div>
                        <div className="flex items-center">
                            <Link href="/signup" className="text-blue-600 hover:text-blue-500 text-sm hover:underline">
                                Do Not Have An Account? <span className="font-semibold">Signup</span>
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-gray-600 mb-6">PLEASE ENTER LOGIN CREDENTIALS</p>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Log In</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 ">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-blue-500 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-500 text-black"
                                required
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Log In
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

export default SignIn;
