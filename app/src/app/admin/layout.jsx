'use client';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './admin.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
