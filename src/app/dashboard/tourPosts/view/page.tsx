'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { rootURL } from '../../../../../constant';
import Link from 'next/link';

interface GuidePost {
  id: string;
  title: string;
  description: string;
  images: string[];
  meetingAddress: string;
  googleMapLink: string;
}

export default function ViewGuidePosts() {
  const [posts, setPosts] = useState<GuidePost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<GuidePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))?.split('=')[1];

        if (!token) {
          setError('Authentication required');
          return;
        }

        const response = await fetch(`${rootURL}/tour-guide-post/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);  // Set initial filtered posts
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(value) ||
      post.description.toLowerCase().includes(value) ||
      post.meetingAddress.toLowerCase().includes(value)
    );

    setFilteredPosts(filtered);
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading posts...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800">All Guide Posts</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Link
            href="/dashboard/tourPosts/add"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
          >
            Add Guide Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {post.images?.length > 0 && (
              <div className="relative h-48">
                <Image
                  src={`${rootURL}${post.images[0]}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-purple-700">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <span>{post.meetingAddress}</span>
                </div>

                <div>
                  <a
                    href={post.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2C5.648 2 2 5.648 2 10c0 4.352 3.648 8 8 8 4.352 0 8-3.648 8-8 0-4.352-3.648-8-8-8zm0 14.4c-3.536 0-6.4-2.864-6.4-6.4 0-3.536 2.864-6.4 6.4-6.4 3.536 0 6.4 2.864 6.4 6.4 0 3.536-2.864 6.4-6.4 6.4zM9 6h2v6H9V6zm0 8h2v2H9v-2z" />
                    </svg>
                    View on Map
                  </a>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Link
                    href={`/dashboard/tourPosts/view/${post.id}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No guide posts found. Try a different search!
        </div>
      )}
    </div>
  );
}
