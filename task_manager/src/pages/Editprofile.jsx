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
    id: "",
    role: ""
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
        setFormData({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          password: "",
          profilePic: null,
          id: data._id || "",
          role: data.role || "",
        });
        toast.success("Profile loaded successfully");
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
      toast.success("Profile picture selected");
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.username || !formData.email) {
      toast.error("Name, Username, and Email are required!");
      return;
    }

    setLoading(true);
    toast.loading("Updating profile...");
    try {
      const updatedData = new FormData();
      if (formData.name) updatedData.append("name", formData.name);
      if (formData.username) updatedData.append("username", formData.username);
      if (formData.email) updatedData.append("email", formData.email);
      if (formData.password.trim() !== "") updatedData.append("password", formData.password);
      if (formData.profilePic instanceof File) updatedData.append("profilePic", formData.profilePic);

      const res = await axios.put(`${apiUrl}/user/editProfile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.dismiss(); // remove "loading..." toast
      toast.success(res.data.message || "Profile updated successfully!");
      setFormData(prev => ({ ...prev, password: "" }));
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <img
        src={
          formData.profilePic instanceof File
            ? URL.createObjectURL(formData.profilePic)
            : "/default-avatar.png"
        }
        alt="Profile"
        className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500 mb-6 object-cover"
      />

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (leave blank to keep same)"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="profilePic"
          className="w-full"
        />

        <p><strong>ID:</strong> {formData.id}</p>
        <p><strong>Role:</strong> {formData.role}</p>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
