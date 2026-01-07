'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserServicesTable from '../../components/DataTable/UserServicesTable';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="admin-layout">
      <Header />

      <div className="admin-body">
        <Sidebar />

        <main className="admin-content">
          <h2>Available Services</h2>
          <UserServicesTable />
          
        </main>
      </div>
    </div>
  );
}
