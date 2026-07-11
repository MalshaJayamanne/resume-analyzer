import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Award, BookOpen, ArrowRight, Target, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AnalyticsDashboard({ result }) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/5">
          <BarChart2 size={48} className="animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">No Analytics Data Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Upload your resume on the main Dashboard. Our AI will analyze your profile and generate complete visual matching analytics.
          </p>
        </div>
      </div>
    );
  }

  const jobs = result.recommended_jobs || [];
  
  // Calculate analytics metrics
  const totalSkills = result.skills?.length || 0;
  const avgScore = jobs.length > 0 ? (jobs.reduce((sum, j) => sum + j.score, 0) / jobs.length) : 0;
  const topScore = jobs.length > 0 ? Math.max(...jobs.map(j => j.score)) : 0;
  
  // Aggregate missing skills across all recommended jobs to calculate demand priority
  const skillFrequency = {};
  jobs.forEach(job => {
    (job.missing_skills || []).forEach(skill => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });
  });

  const missingSkillsSorted = Object.entries(skillFrequency)
    .map(([name, count]) => ({ name, count, priority: count >= 3 ? "High" : count === 2 ? "Medium" : "Low" }))
    .sort((a, b) => b.count - a.count);

  // Prepare chart data for match scores
  const chartData = jobs.map(j => ({
    name: j.title.length > 15 ? j.title.slice(0, 15) + "..." : j.title,
    fullName: j.title,
    score: Math.round(j.score)
  }));

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
          Advanced <span className="premium-gradient-text">Matching Analytics</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Visual insights, skill coverages, and customized growth roadmap based on your profile.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-[2rem] flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Target size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Top Match Score</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{Math.round(topScore)}%</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-[2rem] flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Avg Similarity</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{Math.round(avgScore)}%</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-[2rem] flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Identified Skills</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{totalSkills}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 rounded-[2rem] flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Skills to Target</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{missing_skills_sorted_length()}</p>
          </div>
        </motion.div>
      </div>

      {/* Main Charts / Insights row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match Scores Comparison Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Role Comparison Analysis</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">AI score evaluation across recommended positions</p>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: "rgba(148, 163, 184, 0.05)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 text-xs shadow-xl">
                          <p className="font-bold">{payload[0].payload.fullName}</p>
                          <p className="text-blue-400 mt-1">Match: {payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Gap Matrix */}
        <div className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Skill Gap Priorities</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">High-demand skills found in recommended job targets</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-60 pr-2 custom-scrollbar">
            {missingSkillsSorted.length === 0 ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 py-6 text-sm font-semibold">
                <CheckCircle2 size={18} />
                You possess all required skills for these roles!
              </div>
            ) : (
              missingSkillsSorted.slice(0, 6).map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/50 dark:border-slate-900/50">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      skill.priority === "High" ? "bg-red-500" : skill.priority === "Medium" ? "bg-amber-500" : "bg-blue-500"
                    }`} />
                    <span className="text-sm font-bold text-gray-800 dark:text-slate-200">{skill.name}</span>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
                    skill.priority === "High" 
                      ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400" 
                      : skill.priority === "Medium"
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                      : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                  }`}>
                    {skill.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recommendations & Next Steps */}
      {missingSkillsSorted.length > 0 && (
        <div className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/[0.03] to-indigo-500/[0.03] border border-blue-500/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
                AI Career Roadmap
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                How to secure these matching roles?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm leading-relaxed">
                By gaining experience in <span className="font-semibold text-gray-900 dark:text-white">"{missingSkillsSorted[0]?.name}"</span> and <span className="font-semibold text-gray-900 dark:text-white">"{missingSkillsSorted[1]?.name || 'relevant frameworks'}"</span>, you could increase your overall match compatibility to over 75% for these positions.
              </p>
            </div>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noreferrer"
              className="premium-button flex items-center gap-2 px-6 py-3 whitespace-nowrap self-stretch md:self-auto text-center justify-center"
            >
              Explore Learning Paths <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  );

  function missing_skills_sorted_length() {
    return missingSkillsSorted.length;
  }
}
