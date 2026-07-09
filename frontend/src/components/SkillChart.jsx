import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function SkillChart({ skills, missing }) {
  const total = (skills?.length || 0) + (missing?.length || 0);
  const matchedPct = total > 0 ? Math.round((skills.length / total) * 100) : 0;
  const missingPct = total > 0 ? 100 - matchedPct : 0;

  const data = [
    { name: "Matched", value: matchedPct, color: "#2563eb" },
    { name: "Missing", value: missingPct, color: "#e2e8f0" },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontWeight: 700 }}
          />
          <Bar 
            dataKey="value" 
            radius={[10, 10, 10, 10]}
            barSize={60}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
