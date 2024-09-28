"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";

export default function Post({ params }) {
  const id = params.id;
  const [post, setPost] = useState("");
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  // Fetch the post details
  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  // Update post details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, { title, content });
      setEditing(false);
      fetchPost(); 
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Delete the post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      router.push("/"); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {post && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          {editing ? (
            <div>
              <p className="text-xl font-bold mb-4">Editing Mode</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <span className="block text-gray-700">ID: {post.id}</span>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">{post.id}</h2>
              <h3 className="text-xl mb-2">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-4 mt-4">
        <Link href="/">
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
            Home
          </button>
        </Link>
        <button
          onClick={() => setEditing(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={handleDelete} 
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
