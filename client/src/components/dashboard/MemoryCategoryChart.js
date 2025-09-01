'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3B82F6', '#EB49A8', '#10B981', '#F97316'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-alt p-2 border border-border rounded-lg shadow-lg">
        <p className="text-text-secondary">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function MemoryCategoryChart({ data }) {
  return (
    <div className="bg-background-alt/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-border h-full">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Memory Categories</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            iconSize={10} 
            layout="vertical" 
            verticalAlign="middle" 
            align="right" 
            wrapperStyle={{
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
