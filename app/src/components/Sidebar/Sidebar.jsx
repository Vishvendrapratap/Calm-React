'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './Sidebar.css';

const menuItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Chat', path: '/admin/chat' },
  { label: 'Category3', path: '/admin/category3' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {isOpen && (
        <>
          <h3 className="sidebar-title">Admin</h3>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`sidebar-item ${
                  pathname === item.path ? 'active ' : ''
                }`}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
