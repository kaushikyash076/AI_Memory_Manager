import { Home, Brain, Search, Settings, LogOut } from 'lucide-react'; // Lucide icons

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-950 shadow-xl text-gray-100 flex flex-col justify-between fixed left-0 top-0 z-10">
      <div>
        <div className="flex items-center px-6 py-8">
          <span className="text-2xl font-bold tracking-tight">EchoFrame</span>
        </div>
        <nav className="mt-10">
          <a href="/dashboard" className="sidebar-link flex items-center px-6 py-3 hover:bg-gray-900 rounded mb-2">
            <Home className="w-5 h-5 mr-3" /> Overview
          </a>
          <a href="/dashboard/memories" className="sidebar-link flex items-center px-6 py-3 hover:bg-gray-900 rounded mb-2">
            <Brain className="w-5 h-5 mr-3" /> Memories
          </a>
          <a href="/dashboard/search" className="sidebar-link flex items-center px-6 py-3 hover:bg-gray-900 rounded mb-2">
            <Search className="w-5 h-5 mr-3" /> Search
          </a>
        </nav>
      </div>
      <div className="mb-10 px-6">
        <a href="/dashboard/settings" className="flex items-center py-2 hover:bg-gray-900 rounded">
          <Settings className="w-4 h-4 mr-2" /> Settings
        </a>
        <a href="/logout" className="flex items-center py-2 mt-2 hover:bg-gray-900 rounded text-red-400">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </a>
      </div>
    </aside>
  );
}
