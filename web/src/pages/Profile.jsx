import React, { useRef, useState, useEffect } from 'react';
import { FaUserCircle, FaPhoneAlt, FaSchool, FaFire, FaCamera } from 'react-icons/fa';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    fetch('http://localhost:4000/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.photoUrl) setProfilePic(data.photoUrl);
      });
  }, []);

  function handleEdit() {
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
    setPreview(null);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    const res = await fetch('http://localhost:4000/api/profile/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      setProfilePic(data.url);
      setEditing(false);
      setPreview(null);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <div className="profile-card">
        <div className="profile-avatar" style={{ position: 'relative' }}>
          {profilePic || preview ? (
            <img
              src={preview || profilePic}
              alt="Profile"
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #42A5F5',
                background: '#e0f7fa',
              }}
            />
          ) : (
            <FaUserCircle size={90} color="#42A5F5" />
          )}
          <button
            className="profile-edit-btn"
            onClick={handleEdit}
            title="Edit Profile Picture"
          >
            <FaCamera color="#42A5F5" />
          </button>
        </div>
        <h2 style={{ margin: '16px 0 8px 0', fontWeight: 700 }}>Demo User</h2>
        <div className="profile-info">
          <p>
            <FaPhoneAlt style={{ marginRight: 8, color: '#2E8B57' }} /> +91-XXXXXXXXXX
          </p>
          <p>
            <FaSchool style={{ marginRight: 8, color: '#2E8B57' }} /> Demo High School
          </p>
          <p>
            <FaFire style={{ marginRight: 8, color: '#FF7043' }} /> Streak: <b>3</b> days
          </p>
        </div>
        {editing && (
          <form onSubmit={handleUpload} style={{ marginTop: 16 }}>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              style={{ marginBottom: 8 }}
            />
            <div>
              <button className="btn" type="submit" style={{ marginRight: 8 }}>
                Upload
              </button>
              <button className="btn" type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}