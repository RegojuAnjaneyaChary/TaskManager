import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../App";
import { toast } from "react-hot-toast";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePic: null,
    profilePicUrl: "",
    id: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;

        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          profilePicUrl: data.profilePic || "",
          id: data._id || "",
          role: data.role || "",
        }));
      } catch (error) {
        toast.error("Failed to load profile");
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
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.username || !formData.email) {
      toast.error("Name, Username, and Email are required!");
      return;
    }

    setLoading(true);
    try {
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("username", formData.username);
      updatedData.append("email", formData.email);
      if (formData.password.trim() !== "") updatedData.append("password", formData.password);
      if (formData.profilePic instanceof File)
        updatedData.append("profilePic", formData.profilePic);

      const res = await axios.put(`${apiUrl}/user/editProfile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Profile updated successfully!");
      setFormData((prev) => ({
        ...prev,
        password: "",
        profilePic: null,
        profilePicUrl: res.data.profilePic || prev.profilePicUrl,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const previewSrc = formData.profilePic
    ? URL.createObjectURL(formData.profilePic)
    : formData.profilePicUrl || "/default-avatar.png";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={previewSrc}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password (leave blank to keep same)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="profilePic"
            className="w-full"
            disabled={loading}
          />

          <p className="text-center"><strong>ID:</strong> {formData.id}</p>
          <p className="text-center"><strong>Role:</strong> {formData.role}</p>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
