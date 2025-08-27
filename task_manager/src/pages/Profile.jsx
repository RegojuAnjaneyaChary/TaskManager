import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../App";
import { toast } from "react-hot-toast";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: null,
    id: "",
    role: ""
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        console.log("Fetched profile data:", data);
        setProfile(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          profilePic: null,
          id: data._id || "",
          role: data.role || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [token]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setFormData((prev) => ({ ...prev, profilePic: file }));
    }
  };

  // Save profile updates
  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = new FormData();

      // Add text fields
      if (formData.name) updatedData.append("name", formData.name);
      if (formData.email) updatedData.append("email", formData.email);

      // Add file only if a new file is selected
      if (formData.profilePic instanceof File) {
        console.log("Uploading file:", formData.profilePic);
        updatedData.append("profilePic", formData.profilePic);
      }

      console.log("Sending update with fields:", {
        name: formData.name,
        email: formData.email,
        hasFile: formData.profilePic instanceof File
      });

      const res = await axios.put(`${apiUrl}/user/editProfile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let browser set it
        },
      });

      console.log("Update response:", res.data);

      // Update local state with new data
      setProfile(res.data.updateUser);
      setFormData(prev => ({
        ...prev,
        profilePic: null // Reset file input
      }));
      setEditing(false);
      toast.success(res.data.message || "Profile updated successfully!");

      // Refresh the page data
      localStorage.setItem("userData", JSON.stringify(res.data.updateUser));

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <img
        src={
          formData.profilePic instanceof File
            ? URL.createObjectURL(formData.profilePic)
            : profile?.profilePic || "/default-avatar.png"
        }
        alt="Profile"
        className="profile-image"
      />

      {editing ? (
        <div className="profile-edit">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
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
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile?.name || "Loading..."}</p>
          <p><strong>Email:</strong> {profile?.email || "Loading..."}</p>
          <p><strong>ID:</strong> {profile?._id || "Loading..."}</p>
          <p><strong>Role:</strong> {profile?.role || "Loading..."}</p>

          <div className="profile-buttons">
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}
