'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';

export default function MemoryActivityChart({ allMemories }) {
  const [weekOffset, setWeekOffset] = useState(0); // 0 is current week, -1 is last week, etc.

  // Memoized calculation for chart data based on the selected week
  const { activityData, weekLabel } = useMemo(() => {
    const today = new Date();
    // Correctly calculate the start of the week (Sunday)
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + (weekOffset * 7)));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(new Date(weekStart).setDate(weekStart.getDate() + 6));
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${weekStart.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - ${weekEnd.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}`;

    const memoriesInWeek = allMemories.filter(mem => {
        const memDate = new Date(mem.createdAt);
        return memDate >= weekStart && memDate <= weekEnd;
    });

    // Process data for Activity Chart
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const activity = days.map(day => ({ name: day, memories: 0 }));
    memoriesInWeek.forEach(mem => {
        const dayIndex = new Date(mem.createdAt).getDay();
        activity[dayIndex].memories++;
    });

    return { activityData: activity, weekLabel };
  }, [allMemories, weekOffset]);

  return (
    <div className="bg-background-alt/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-border h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Memory Activity</h3>
        <div className="flex items-center gap-2">
            <button onClick={() => setWeekOffset(weekOffset - 1)} className="p-1 rounded-md hover:bg-background">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </button>
            <span className="text-sm font-semibold text-text-secondary w-48 text-center">{weekLabel}</span>
            <button onClick={() => setWeekOffset(weekOffset + 1)} disabled={weekOffset === 0} className="p-1 rounded-md hover:bg-background disabled:opacity-30">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} />
          <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-background)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)'
            }}
          />
          <Bar dataKey="memories" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
