import { Home, Briefcase, Settings, Users, BarChart2, LogOut, LayoutDashboard, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";

const NavItem = ({ icon: Icon, label, active = false }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active 
        ? "bg-white/10 text-blue-400 font-semibold shadow-sm border border-white/5" 
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </motion.div>
);

export default function Sidebar() {
  return (
    <div className="h-screen w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-r border-white/5 p-6 flex flex-col relative overflow-hidden shrink-0">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
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
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Resume<span className="premium-gradient-text font-black"> Matcher AI</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" active={true} />
            <NavItem icon={Briefcase} label="Jobs Database" />
            <NavItem icon={BarChart2} label="Skill Mapping" />
            <NavItem icon={Settings} label="Settings" />
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300">
                <User size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">Malsha J.</p>
                <p className="text-xs text-slate-400 truncate">Developer Mode</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}