"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LuMail, LuLock, LuArrowRight } from 'react-icons/lu';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds for mobile/split */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Container */}
      <div className="w-full min-h-screen flex relative z-10">
        
        {/* Center Form */}
        <div className="w-full flex items-center justify-center p-4 sm:p-8 overflow-y-auto min-h-screen">
          <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            
            <div className="mb-10 text-center lg:text-left">
              <Link href="/" className="inline-flex mb-8 items-center gap-3 group">
                <div className="bg-blue-950 p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain w-auto h-auto" />
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tight">RK Technical</span>
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Welcome Back
              </h1>
              <p className="text-slate-500">
                Please enter your credentials to access your student portal.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@rktechnical.edu"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
                    required
                  />
                  <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Password
                  </label>
                  <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
                    required
                  />
                  <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" />
                <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-900 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
              >
                {loading ? "Signing In..." : "Sign In"}
                {!loading && <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-10">
              Don't have an account? <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Sign up</Link>
            </p>
          </div>
        </div>



      </div>
    </div>
  );
}