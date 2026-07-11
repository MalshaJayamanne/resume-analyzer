import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, AlertCircle } from "lucide-react";

export default function JobCard({ job, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-8 flex flex-col gap-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-[2rem]"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight mb-1">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 font-medium">
              <span>Full Time</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-700"></span>
              <span>Remote</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-700"></span>
              <span>$120k - $150k</span>
            </div>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="px-4 py-2 rounded-2xl bg-blue-600 text-white font-black text-xl shadow-lg shadow-blue-200 dark:shadow-none">
            {typeof job?.score === "number" ? job.score.toFixed(0) : "0"}%
          </div>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2">Match</span>
        </div>
      </div>

      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
        {job?.description || "Leverage your expertise to drive innovation in this high-impact role. You'll collaborate with cross-functional teams to deliver exceptional solutions."}
      </p>

      <div className="space-y-4">
        {job?.matched_skills && job.matched_skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={14} />
              Key Match Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {job.matched_skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-900/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {job?.missing_skills && job.missing_skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={14} />
              Growth Areas
            </p>
            <div className="flex flex-wrap gap-2">
              {job.missing_skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-100 dark:border-amber-900/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}