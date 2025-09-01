import Sidebar from '../../components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-slate-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}