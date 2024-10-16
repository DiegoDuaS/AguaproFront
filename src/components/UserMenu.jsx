import React, { useRef, useEffect } from 'react';
import { FiUser, FiLogOut } from "react-icons/fi"; // Importing icons for the optionss
import './UserMenu.css'; // Add some styling
import useUserData from '../hooks/useUserData';

const UserMenu = ({ closeUserMenu, onLogout, onViewInfo }) => {
  const userMenuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      closeUserMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userId = localStorage.getItem('id');
  const { userData, loading, error } = useUserData(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;  

  return (
    <div className="user-menu" ref={userMenuRef}>
      <h3>Hola {userData.username}</h3>
      <div className="user-menu-options">
        <div className="user-menu-option" onClick={onViewInfo}>
          <FiUser size={20} /> <span>Mi Información</span>
        </div>
        <div className="user-menu-option" onClick={onLogout}>
          <FiLogOut size={20} /> <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
