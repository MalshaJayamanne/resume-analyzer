import { Home, Briefcase, Settings, Users, BarChart2, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NavItem = ({ icon: Icon, label, active = false }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active 
        ? "bg-blue-50 text-blue-600 font-semibold shadow-sm" 
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </motion.div>
);

export default function Sidebar() {
  return (
    <div className="h-screen w-72 bg-gradient-to-b from-slate-900 to-indigo-950 border-r border-white/10 p-6 flex flex-col relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: `
               linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
               linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
             `, 
             backgroundSize: '32px 32px' 
           }} 
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Sparkles size={22} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Job<span className="text-blue-400"> Finder AI</span>
          </h1>
        </div>
      </div>
    </div>
  );
}