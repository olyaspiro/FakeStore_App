import React, { useEffect, useState } from 'react';
import { auth, db } from "../firebaseConfig.js";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({ name: '', address: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage('');
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: profileData.name,
        address: profileData.address,
      });
      setEditMode(false);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage(`Error updating profile: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setActionLoading(true);
    setMessage('');
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
      navigate('/');
    } catch (err) {
      setMessage(`Error deleting account: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-header">Your Profile</h2>

      <div className="profile-section">
        <strong>Email:</strong>
        <p className="profile-text">{user.email}</p>
      </div>

      {!editMode ? (
        <>
          <div className="profile-section">
            <strong>Name:</strong>
            <p className={`profile-text ${!profileData.name ? 'profile-placeholder' : ''}`}>
              {profileData.name || 'Not set'}
            </p>
          </div>

          <div className="profile-section">
            <strong>Address:</strong>
            <p className={`profile-text ${!profileData.address ? 'profile-placeholder' : ''}`}>
              {profileData.address || 'Not set'}
            </p>
          </div>

          <button
            className="btn btn-dark"
            onClick={() => setEditMode(true)}
            disabled={actionLoading}
          >
            Edit Profile
          </button>

          <button
            className="btn btn-danger btn-delete"
            onClick={handleDelete}
            disabled={actionLoading}
          >
            {actionLoading ? 'Deleting...' : 'Delete Account'}
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="input-field"
            disabled={actionLoading}
          />
          <input
            type="text"
            placeholder="Address"
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
            className="input-field"
            disabled={actionLoading}
          />
          <button type="submit" className="btn btn-success" disabled={actionLoading}>
            {actionLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-cancel"
            onClick={() => setEditMode(false)}
            disabled={actionLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger btn-delete"
            onClick={handleDelete}
            disabled={actionLoading}
          >
            {actionLoading ? 'Deleting...' : 'Delete Account'}
          </button>
        </form>
      )}

      {message && (
        <p className={`message-text ${message.startsWith('Error') ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Profile;
