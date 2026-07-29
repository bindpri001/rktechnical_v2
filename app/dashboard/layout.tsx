"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FiHome, FiUsers, FiUserPlus, FiEdit2, FiSettings, FiLogOut, FiGlobe } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { name: "Overview", href: "/dashboard", icon: FiHome },
    { name: "Register Student", href: "/dashboard/register", icon: FiUserPlus },
    { name: "Edit Student Details", href: "/dashboard/edit", icon: FiEdit2 },
    { name: "Manage Staff", href: "/dashboard/staff", icon: FiUsers },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white flex-shrink-0 flex flex-col hidden md:flex border-r border-slate-800">
        <div className="p-6 pb-4 border-b border-slate-800">
          <h2 className="text-xl font-black text-blue-400">Admin Panel</h2>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest mb-4">Control Center</p>
          
          {session?.user && (
            <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                {session.user.name?.[0]?.toUpperCase() || session.user.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-200 truncate">
                  {session.user.name || session.user.username || "Administrator"}
                </p>
                <p className="text-xs text-slate-400 truncate capitalize">
                  {session.user.role?.toLowerCase() || "Admin"}
                </p>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            // Exact match for dashboard to avoid active state on all child routes
            const isActive = link.href === '/dashboard' 
                ? pathname === '/dashboard' 
                : pathname.startsWith(link.href);
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20 font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white font-medium"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2 mt-auto">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white font-medium"
          >
            <FiGlobe size={20} />
            <span className="text-sm">Visit Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium text-left"
          >
            <FiLogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      
    </div>
  );
}
