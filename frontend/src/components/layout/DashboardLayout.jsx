import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-base">
      
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        
        <Navbar />

        <main className="flex-1 flex flex-col min-w-0">
          {(title || subtitle) && (
            <div className="px-4 sm:px-8 py-5 border-b border-theme bg-surface">
              {title    && <h1 className="text-xl font-bold text-main">{title}</h1>}
              {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          )}
          <div className="flex-1 px-4 sm:px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
