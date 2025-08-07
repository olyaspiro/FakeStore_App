import React from 'react';
import { Button } from 'react-bootstrap';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button
      variant="outline-dark"  // subtle distinct style
      size="sm"
      onClick={handleLogout}
      style={{ marginLeft: '1rem', padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
