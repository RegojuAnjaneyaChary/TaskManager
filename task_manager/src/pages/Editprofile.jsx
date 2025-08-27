import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../App";
import { toast } from "react-hot-toast";
import "./Profile.css";

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

  // Fetch existing profile details
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
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, [token]);

  // Handle text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setFormData((prev) => ({ ...prev, profilePic: file }));
    }
  };

  // Save profile changes
  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = new FormData();

      // Add text fields
      if (formData.name) updatedData.append("name", formData.name);
      if (formData.username) updatedData.append("username", formData.username);
      if (formData.email) updatedData.append("email", formData.email);

      // Add password only if provided
      if (formData.password.trim() !== "") {
        updatedData.append("password", formData.password);
      }

      // Add file only if selected
      if (formData.profilePic instanceof File) {
        console.log("Uploading file:", formData.profilePic);
        updatedData.append("profilePic", formData.profilePic);
      }

      console.log("Sending update with fields:", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        hasPassword: formData.password.trim() !== "",
        hasFile: formData.profilePic instanceof File
      });

      const res = await axios.put(`${apiUrl}/user/editProfile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData
        },
      });

      console.log("Update response:", res.data);
      toast.success(res.data.message || "Profile updated successfully!");

      // Reset password field after successful update
      setFormData(prev => ({ ...prev, password: "" }));

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <img
        src={
          formData.profilePic instanceof File
            ? URL.createObjectURL(formData.profilePic)
            : "/default-avatar.png"
        }
        alt="Profile"
        className="profile-image"
      />

      <div className="profile-edit">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (leave blank to keep same)"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="profilePic"
        />

        <p><strong>ID:</strong> {formData.id}</p>
        <p><strong>Role:</strong> {formData.role}</p>

        <div className="profile-buttons">
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
