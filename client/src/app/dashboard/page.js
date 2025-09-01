'use client';

import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MemoryActivityChart from '../../components/dashboard/MemoryActivityChart';
import MemoryCategoryChart from '../../components/dashboard/MemoryCategoryChart';

// --- Reusable Components for the Dashboard ---

// A stylish card for displaying key stats with color accents
const StatsCard = ({ title, value, delta, color }) => {
    const colorClasses = {
        blue: 'border-primary text-primary',
        pink: 'border-secondary text-secondary',
        green: 'border-green-500 text-green-500',
    };
    
    return (
        <div className={`bg-background-alt/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-border border-t-4 ${colorClasses[color]}`}>
            <p className="text-sm text-text-secondary">{title}</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
            <p className={`text-sm font-semibold mt-1 ${colorClasses[color]}`}>{delta}</p>
        </div>
    );
};

// --- Main Dashboard Page Component ---
export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalMemories: '...', tasksLogged: '...', collaborations: 1 });
  const [recentMemories, setRecentMemories] = useState([]);
  const [allMemories, setAllMemories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        if (user?.token) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const memoriesResponse = await axios.get('http://localhost:5000/api/memories', config);
                const fetchedMemories = memoriesResponse.data;
                setAllMemories(fetchedMemories);
                
                const totalMemories = fetchedMemories.length;
                const tasksLogged = fetchedMemories.reduce((acc, mem) => acc + (mem.tasks?.length || 0), 0);

                setStats({ totalMemories, tasksLogged, collaborations: 1 });
                setRecentMemories(fetchedMemories.slice(0, 3));
                
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        }
    };
    fetchData();
  }, [user]);

  // Memoized calculation for category chart data
  const categoryData = useMemo(() => {
    // In a real app, categories would come from the AI. Here, we simulate it.
    const categories = ['Project Notes', 'Action Items', 'Ideas', 'Personal'];
    const categoryCounts = categories.map(name => ({ name, value: 0 }));
    allMemories.forEach((mem, index) => {
        categoryCounts[index % categories.length].value++;
    });
    return categoryCounts;
  }, [allMemories]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Good Morning, {user?.name}!</h1>
          <p className="text-text-secondary">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <Link href="/dashboard/memories" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
            <span>Add Memory</span>
        </Link>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <StatsCard title="Total Memories" value={stats.totalMemories} delta="All Time" color="blue" />
        <StatsCard title="Tasks Logged" value={stats.tasksLogged} delta="All Time" color="pink" />
        <StatsCard title="Collaborations" value={stats.collaborations} delta="Active" color="green" />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
            <MemoryCategoryChart data={categoryData} />
        </div>
        <div className="lg:col-span-3">
            <MemoryActivityChart allMemories={allMemories} />
        </div>
      </div>

       {/* Recent Memories List */}
      <div className="mt-8 bg-background-alt/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Memories</h3>
        <div className="space-y-4">
            {recentMemories.length > 0 ? recentMemories.map(mem => (
                <div key={mem._id} className="flex justify-between items-center bg-background p-3 rounded-lg">
                    <p className="text-text-primary text-sm truncate pr-4">{mem.summary}</p>
                    <p className="text-text-secondary text-xs flex-shrink-0">{new Date(mem.createdAt).toLocaleDateString()}</p>
                </div>
            )) : <p className="text-text-secondary text-sm">No recent memories found.</p>}
        </div>
      </div>

    </motion.div>
  );
}
