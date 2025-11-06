'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const rootURL = process.env.BASE_URL;


export default function CreateGuidePost() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activities, setActivities] = useState('');
    const [included, setIncluded] = useState('');
    const [notIncluded, setNotIncluded] = useState('');
    const [details] = useState('');
    const [meetingAddress, setMeetingAddress] = useState('');
    const [googleMapLink, setGoogleMapLink] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePath, setImagePath] = useState<string>('');
    const [error, setError] = useState('');
    const [token, setToken] = useState<string | null>(null);

    // Fetch token safely on the client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('access_token='))?.split('=')[1];
            setToken(storedToken || null);
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };
    const handleUploadImage = async () => {
        if (!token) {
            setError('No access token found. Please log in.');
            return;
        }

        if (!image) {
            setError('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', image);

        // Remove the formData.append('folder') line and add to URL
        try {
            // Add folder as query parameter in the URL
            const response = await fetch(`${rootURL}/file/upload?folder=guidePostPic`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setImagePath(data.path);
                alert('Image uploaded successfully!');
            } else {
                setError(data.message || 'Failed to upload image.');
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred during image upload.');
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('No access token found. Please log in.');
            return;
        }

        if (!imagePath) {
            setError('Please upload an image before submitting.');
            return;
        }

        try {
            const response = await fetch(`${rootURL}/tour-guide-post/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    activities,
                    included,
                    notIncluded,
                    details,
                    meetingAddress,
                    googleMapLink,
                    images: [imagePath],
                }),
            });

            if (response.ok) {
                alert('Guide post created successfully!');
                router.push('/dashboard/mytourpost');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to create guide post.');
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Guide Post</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Activities</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={activities}
                        onChange={(e) => setActivities(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Included</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={included}
                        onChange={(e) => setIncluded(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Not Included</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={notIncluded}
                        onChange={(e) => setNotIncluded(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Meeting Address</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={meetingAddress}
                        onChange={(e) => setMeetingAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Google Map Link</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        value={googleMapLink}
                        onChange={(e) => setGoogleMapLink(e.target.value)}
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-gray-700">Select Image</label>
                    <input
                        type="file"
                        className="w-full p-2 border border-purple-600 rounded focus:border-purple-800 focus:outline-none"
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                        onClick={handleUploadImage}
                    >
                        Upload Image
                    </button>
                    {imagePath && (
                        <div className="mt-2">
                            <p className="text-green-600">Image uploaded successfully!</p>
                            <Image
                                src={rootURL +imagePath}
                                alt="Uploaded Image"
                                width={128}  // Add width (matches w-32 = 8rem = 128px)
                                height={128} // Add height
                                className="w-32 h-32 object-cover mt-2 rounded"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}
