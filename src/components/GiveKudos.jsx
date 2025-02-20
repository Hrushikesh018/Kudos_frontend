import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kudosService } from "../services/kudosService";

const GiveKudos = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // Fetch users and categories on component mount
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, categoriesData] = await Promise.all([
          kudosService.getAllUsers({ userId }),
          kudosService.getAllCategories(),
        ]);
        setUsers(usersData.users || []);
        setCategories(categoriesData.categories || []);
      } catch (err) {
        setError("Error fetching users or categories");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!recipient || !category || !message) {
      setError("All fields are mandatory.");
      return;
    }

    setLoading(true);
    const payload = {
      sender: user._id,
      receiver: recipient,
      category: category,
      message: message,
    };
    try {
      await kudosService.createKudo(payload);
      setSuccess(true);
      setRecipient("");
      setCategory("");
      setMessage("");
      setTimeout(() => {
        navigate("/landing-page");  // Adjust the route to your landing page
      }, 1000);
    } catch (err) {
      setError(err.message || "Error sending kudos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Give Kudos</h1>

        {success && (
          <div className="mb-6 bg-green-100 text-green-600 p-4 rounded-lg shadow-sm">
            Kudos sent successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 text-red-500 p-4 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Recipient
            </label>
            <select
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={loading}
            >
              <option value="">Select a recipient</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              required
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-4"
              placeholder="Write your kudos message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Kudos"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiveKudos;
