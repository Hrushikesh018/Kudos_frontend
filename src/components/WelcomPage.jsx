import React, { useState, useEffect } from "react";
import { kudosService } from "../services/kudosService";
import { useNavigate } from "react-router-dom";
import KudosByCategoryChart from "./Analytics";
import Leaderboard from "./LeaderBoard";
import { FaHeart } from "react-icons/fa";
const WelcomePage = () => {
  const [kudos, setKudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostLiked, setMostLiked] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Clear the local storage
    localStorage.clear();

    // Navigate to the login page
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
    fetchMostLiked();
  }, []);
  const fetchData = async () => {
    try {
      const response = await Promise.all([
        kudosService.getKudos(),
        kudosService.getAnalytics(),
      ]);
      setKudos(response[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchMostLiked = async () => {
    try {
      const response = await Promise.all([kudosService.getMostLiked()]);
      console.log(response, "liked response");
      setMostLiked(response);
    } catch (e) {
      console.error(e, "something went wrong");
    }
  };
  const handleLike = async (kudo) => {
    try {
      const response = await kudosService.likePost(kudo, user._id);

      // Update the likeCount directly on the kudo object
      fetchData();
    } catch (error) {
      console.error("Error liking kudo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Recent Kudos Section */}
      <section className="mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name || "User"}!
            </h1>
            <p className="text-gray-600 mt-2">
              We're glad to have you here. Check out the recent kudos or send
              some to your colleagues!
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Kudos</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate("/give-kudos")} // Navigate to the GiveKudos component
          >
            Give Kudos
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kudos.map((kudo) => {
            const isLiked = kudo.likes.includes(user._id);
            return (
              <div
                key={kudo._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-medium">
                      <>{console.log("kudo", kudo)}</>
                      {kudo.sender.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {kudo.sender.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      To: {kudo.receiver.name}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">{kudo.message}</p>
                <p className="mt-4 text-sm text-gray-500">
                  {new Date(kudo?.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="flex items-center text-gray-500 hover:text-red-600"
                    onClick={() => handleLike(kudo._id)}
                  >
                    <FaHeart
                      className={`mr-2 ${
                        isLiked ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                    {kudo.likeCount || 0}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Analytics Dashboard Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Analytics Dashboard
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Kudos Over Time Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Kudos Over Time
            </h3>
            <div className="h-80">
              <KudosByCategoryChart />
            </div>
          </div>
          <Leaderboard />
        </div>
      </section>
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Most Liked Post
          </h3>
          {mostLiked && mostLiked.length > 0 ? (
            <div>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-bold">
                  {mostLiked[0].kudo.sender.name}
                </span>{" "}
                gave a{" "}
                <span className="font-semibold text-blue-500">
                  {mostLiked[0].kudo.category}
                </span>{" "}
                badge to{" "}
                <span className="font-bold">
                  {mostLiked[0].kudo.receiver.name}
                </span>{" "}
                - <em className="italic">"{mostLiked[0].kudo.message}"</em>
              </p>
              <p className="mt-2 text-gray-500">
                Likes: {mostLiked[0].kudo.likeCount}
              </p>
            </div>
          ) : (
            <p>No data available for the most liked post.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
