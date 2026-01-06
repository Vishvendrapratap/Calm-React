// import './ProfileMenu.css';

// const ProfileMenu = () => {
//   return (
//     <button className="profile-button">
//       Profile
//     </button>
//   );
// };

// export default ProfileMenu;



'use client';

import { useState, useRef, useEffect } from 'react';
import './ProfileMenu.css';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        className="profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        Profile ▾
      </button>

      {open && (
        <div className="profile-dropdown">
          <button className="profile-item">My Account</button>
          <button className="profile-item">Settings</button>
          <button className="profile-item danger">Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
