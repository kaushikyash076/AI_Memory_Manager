import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-950 min-h-screen flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <TopNav />
        <main className="max-w-7xl mx-auto px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
