import React from 'react';
import AuthProvider from '@/component/AuthProvider';
import AdminShell from '@/component/admin/AdminShell';

export const metadata = {
  title: 'EVStay Admin Dashboard | Control Center',
  description: 'EVStay Centralized Station Management and Configuration',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminShell>
        {children}
      </AdminShell>
    </AuthProvider>
  );
}
