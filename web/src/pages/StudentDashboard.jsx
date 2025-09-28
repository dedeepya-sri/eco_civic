import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // assuming you have Sidebar

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar
        tabs={["Journey", "Challenges", "Leaderboard", "Resources", "Profile"]}
      />

      <div className="flex-1 p-6">
        <button
          onClick={() => navigate("/")}
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the student section!</p>
      </div>
    </div>
  );
}
