import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import UploadResume from "../components/UploadResume";
import JobCard from "../components/JobCard";
import SkillChart from "../components/SkillChart";
import { Sparkles, Trophy, Target, Zap, TrendingUp, Search } from "lucide-react";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <MainLayout>
        <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Optimize Your <span className="premium-gradient-text">Professional Future</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
              Upload your resume and let our advanced AI match you with the perfect opportunities based on your unique skill set.
            </p>
          </div>
        </header>

        <UploadResume setResult={setResult} />

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 space-y-16"
            >
              <section className="space-y-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                    <Sparkles size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Best Match</h2>
                </div>

                {/* Highlighted Frame */}
                <div className="glass-card p-1 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 rounded-[2.5rem]">
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.4rem] p-10 space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard 
                        icon={<Target className="text-blue-500" />} 
                        label="Match Score" 
                        value={`${Math.round(result.recommended_jobs[0]?.score || 0)}%`}
                        color="bg-blue-50 dark:bg-blue-950/40"
                      />
                      <StatCard 
                        icon={<Trophy className="text-emerald-500" />} 
                        label="Top Role" 
                        value={result.recommended_jobs[0]?.title?.split(' ')[0] || "N/A"}
                        color="bg-emerald-50 dark:bg-emerald-950/40"
                      />
                      <StatCard 
                        icon={<Zap className="text-amber-500" />} 
                        label="Matched Skills" 
                        value={result.recommended_jobs[0]?.matched_skills?.length || 0}
                        color="bg-amber-50 dark:bg-amber-950/40"
                      />
                      <StatCard 
                        icon={<Sparkles className="text-purple-500" />} 
                        label="Skills to Gain" 
                        value={result.recommended_jobs[0]?.missing_skills?.length || 0}
                        color="bg-purple-50 dark:bg-purple-950/40"
                      />
                    </div>

                    <div className="pt-10 border-t border-gray-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 flex flex-col justify-between">
                        <div className="mb-6 flex items-center justify-between">
                          <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200 dark:shadow-none">
                            Top Recommendation
                          </span>
                        </div>
                        <JobCard job={result.recommended_jobs[0]} index={0} />
                      </div>
                      
                      <div className="flex flex-col justify-between p-8 rounded-[2.2rem] bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/80 dark:border-slate-900/50">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Skills Distribution</h4>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Visual breakdown of matched vs growth areas</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <SkillChart 
                            skills={result.recommended_jobs[0]?.matched_skills || []} 
                            missing={result.recommended_jobs[0]?.missing_skills || []} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    Explore <span className="text-blue-600">Other Matches</span>
                  </h3>
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                    {result.recommended_jobs.length - 1} more found
                  </span>
                </div>
                <div className="grid gap-6">
                  {result.recommended_jobs.slice(1).map((job, i) => (
                    <JobCard key={i} job={job} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-[2rem] flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0 shadow-sm`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider truncate">{label}</p>
        <p className="text-xl font-black text-gray-900 dark:text-white truncate">{value}</p>
      </div>
    </motion.div>
  );
}
