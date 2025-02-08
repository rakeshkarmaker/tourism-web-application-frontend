
// src/app/dashboard/[userId]/layout.tsx
import React from 'react';
import Navbar from '../../_components/navbar/page';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56">
        <Navbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
