import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../App";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: null,
    id: "",
    role: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setProfile(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          profilePic: null,
          id: data._id || "",
          role: data.role || "",
        });
      } catch (error) {
        toast.error("Failed to fetch profile ❌");
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, profilePic: file }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = new FormData();
      if (formData.name) updatedData.append("name", formData.name);
      if (formData.email) updatedData.append("email", formData.email);
      if (formData.profilePic instanceof File)
        updatedData.append("profilePic", formData.profilePic);

      const res = await axios.put(`${apiUrl}/user/editProfile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data.updateUser);
      setFormData((prev) => ({ ...prev, profilePic: null }));
      setEditing(false);
      toast.success(res.data.message || "Profile updated ✅");
      localStorage.setItem("userData", JSON.stringify(res.data.updateUser));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 px-4 md:px-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          My Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={
              formData.profilePic instanceof File
                ? URL.createObjectURL(formData.profilePic)
                : profile?.profilePic || "/default-avatar.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="profilePic"
              className="w-full p-3 border rounded-lg"
            />

            <p className="text-gray-600">
              <strong>ID:</strong>{" "}
              <span className="bg-gray-100 px-2 py-1 rounded">{formData.id}</span>
            </p>
            <p className="text-gray-600">
              <strong>Role:</strong>{" "}
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {formData.role}
              </span>
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-center text-gray-700">
            <p>
              <strong>Name:</strong> {profile?.name || "Loading..."}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email || "Loading..."}
            </p>
            <p>
              <strong>ID:</strong>{" "}
              <span className="bg-gray-100 px-2 py-1 rounded">
                {profile?._id || "Loading..."}
              </span>
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {profile?.role || "Loading..."}
              </span>
            </p>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
