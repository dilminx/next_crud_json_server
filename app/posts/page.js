"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Modified delete function to accept the post's id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      // Re-fetch posts to update the UI after deletion
      fetchRecords();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

      <Link href={"/posts/create"}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
          Create new Post
        </div>
      </Link>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Content</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id || index} className="bg-white hover:bg-gray-100">
                <td className="border px-4 py-2">{post.id}</td>
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">{post.content}</td>
                <td className="border px-4 py-2">
                  <Link href={`/posts/${post.id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                      Read
                    </button>
                  </Link>
                  <Link href={`/posts/${post.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
