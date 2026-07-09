import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden selection:bg-blue-100 selection:text-blue-700">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative custom-scrollbar">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/30 to-indigo-100/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="p-8 lg:p-16 max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}