// src/app/admin/layout.jsx
export const metadata = {
  title: 'Admin Panel | Galdeano Portfolio',
  description: 'Panel de administración de mensajes',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {children}
    </div>
  );
}
