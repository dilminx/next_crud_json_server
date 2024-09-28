"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/posts', { title, content, id });
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Create Posts</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-80">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default Page;
