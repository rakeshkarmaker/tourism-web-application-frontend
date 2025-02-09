"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { rootURL } from "../../../../../../constant";
// import Link from "next/link";

interface GuidePostDetails {
  id: string;
  title: string;
  description: string;
  activities: string;
  included: string;
  notIncluded: string;
  details: string;
  meetingAddress: string;
  googleMapLink: string;
  averageReview: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// For the text fields (image is handled separately)
interface EditData {
  title: string;
  description: string;
  activities: string;
  included: string;
  notIncluded: string;
  details: string;
  meetingAddress: string;
  googleMapLink: string;
}

export default function ViewSingleGuidePost() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // dynamic route parameter

  const [post, setPost] = useState<GuidePostDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for editing the post text fields
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    title: "",
    description: "",
    activities: "",
    included: "",
    notIncluded: "",
    details: "",
    meetingAddress: "",
    googleMapLink: "",
  });

  // State for handling image upload in edit mode
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePath, setEditImagePath] = useState<string>("");

  // Fetch the post details on mount
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1];

        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(`${rootURL}/tour-guide-post/view/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Initialize the edit form with the current post data
  const handleEditClick = () => {
    if (post) {
      setEditData({
        title: post.title,
        description: post.description,
        activities: post.activities,
        included: post.included,
        notIncluded: post.notIncluded,
        details: post.details,
        meetingAddress: post.meetingAddress,
        googleMapLink: post.googleMapLink,
      });
      // Set the current image path as placeholder
      if (post.images && post.images.length > 0) {
        setEditImagePath(post.images[0]);
      }
      setIsEditing(true);
    }
  };

  // Handle file selection for the new image
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditImage(e.target.files[0]);
    }
  };

  // Upload the new image file
  const handleEditUploadImage = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      setError("Authentication required");
      return;
    }
    if (!editImage) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", editImage);

    try {
      // Upload the image; note the folder is passed as a query parameter
      const response = await fetch(
        `${rootURL}/file/upload?folder=guidePostPic`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setEditImagePath(data.path);
        alert("Image uploaded successfully!");
      } else {
        setError(data.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during image upload.");
    }
  };

  // Handle the submission of the edit form
  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      setError("Authentication required");
      return;
    }

    // Build the updated data. Use the new image path if uploaded, otherwise use the original.
    const updatedData = {
      title: editData.title,
      description: editData.description,
      activities: editData.activities,
      included: editData.included,
      notIncluded: editData.notIncluded,
      details: editData.details,
      meetingAddress: editData.meetingAddress,
      googleMapLink: editData.googleMapLink,
      images: editImagePath ? [editImagePath] : post?.images || [],
    };

    try {
      const response = await fetch(
        `${rootURL}/tour-guide-post/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const data = await response.json();
      setPost(data);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  // Handle deletion of the post
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      setError("Authentication required");
      return;
    }

    try {
      const response = await fetch(
        `${rootURL}/tour-guide-post/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      router.push("/dashboard/tourPosts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading post...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return (
      <div className="p-6 text-center text-gray-500">No post found.</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800">
          {isEditing ? "Edit Post" : post.title}
        </h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {/* Text Fields */}
          <div>
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Activities</label>
            <input
              type="text"
              value={editData.activities}
              onChange={(e) =>
                setEditData({ ...editData, activities: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Included</label>
            <input
              type="text"
              value={editData.included}
              onChange={(e) =>
                setEditData({ ...editData, included: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Not Included</label>
            <input
              type="text"
              value={editData.notIncluded}
              onChange={(e) =>
                setEditData({ ...editData, notIncluded: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Details</label>
            <textarea
              value={editData.details}
              onChange={(e) =>
                setEditData({ ...editData, details: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Meeting Address</label>
            <input
              type="text"
              value={editData.meetingAddress}
              onChange={(e) =>
                setEditData({ ...editData, meetingAddress: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Google Map Link</label>
            <input
              type="text"
              value={editData.googleMapLink}
              onChange={(e) =>
                setEditData({ ...editData, googleMapLink: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block font-semibold">Image</label>
            {editImagePath && (
              <div className="mb-2">
                <Image
                  src={`${rootURL}${editImagePath}`}
                  alt="Current Image"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              onChange={handleEditImageChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={handleEditUploadImage}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              Upload New Image
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {post.images.length > 0 && (
            <div className="relative h-72">
              <Image
                src={`${rootURL}${post.images[0]}`}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <p className="text-gray-700">
            <strong>Description: </strong>
            {post.description}
          </p>
          <p className="text-gray-700">
            <strong>Activities: </strong>
            {post.activities}
          </p>
          <p className="text-gray-700">
            <strong>Included: </strong>
            {post.included}
          </p>
          <p className="text-gray-700">
            <strong>Not Included: </strong>
            {post.notIncluded}
          </p>
          <p className="text-gray-700">
            <strong>Details: </strong>
            {post.details}
          </p>
          <p className="text-gray-700">
            <strong>Meeting Address: </strong>
            {post.meetingAddress}
          </p>
          <div>
            <a
              href={post.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              View on Google Maps
            </a>
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleEditClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
