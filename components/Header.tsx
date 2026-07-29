"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user as any;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Verification', href: '/verification' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/#about' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-sm">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* 1. Left Corner: Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="transition-transform group-hover:scale-105 shrink-0">
              <Image
                src={"/logo.png"}
                alt='Logo'
                width={64}
                height={64}
                className="object-contain w-auto h-auto"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg md:text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                RK Technical Institute
              </p>
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5 hidden sm:block">
                Saraimeer, Azamgarh, U.P.
              </p>
            </div>
          </Link>

          {/* 2. Center: Desktop Navigation (Light Pill Shape) */}
          <nav className="hidden md:flex items-center bg-slate-100/80 border border-slate-200/50 rounded-full px-1.5 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-200 ease-in-out shadow-none hover:shadow-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. Right Corner: Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center relative group">
                <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full px-4 py-2 transition-colors cursor-pointer">
                  <div className="bg-blue-600 p-1 rounded-full text-white shadow-sm">
                    <FiUser size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-black text-slate-900">{user?.username || user?.name || "User"}</span>
                </div>

                <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 flex flex-col overflow-hidden">
                    {(user?.role === "ADMIN" || user?.role === "SUPERADMIN") && (
                      <Link
                        href="/dashboard"
                        className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors w-full text-left border-b border-slate-100"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ease-in-out"
              >
                <FiUser size={18} strokeWidth={2.5} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-xl overflow-hidden z-40">
          <div className="px-4 py-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-4 py-3 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 w-full my-3"></div>
            
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 mb-2 flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-full text-white shadow-sm">
                    <FiUser size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Logged In As</span>
                    <span className="text-base font-black text-slate-900 truncate max-w-[200px]">{user?.username || user?.name || "User"}</span>
                  </div>
                </div>

                {(user?.role === "ADMIN" || user?.role === "SUPERADMIN") && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 px-6 py-3.5 rounded-xl text-base font-bold transition-all shadow-sm mb-2"
                  >
                    Dashboard
                  </Link>
                )}
                
                <button
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 px-6 py-3.5 rounded-xl text-base font-bold transition-all shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white px-6 py-3.5 rounded-xl text-base font-bold transition-all shadow-sm"
              >
                <FiUser size={20} strokeWidth={2.5} />
                <span>Student Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}