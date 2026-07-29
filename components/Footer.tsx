"use client";

import Image from "next/image";
import Link from "next/link";
import { LuMapPin, LuPhone, LuMail } from "react-icons/lu";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 relative overflow-hidden z-10">
      
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-6 lg:col-span-5 pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="transition-transform group-hover:scale-105 shrink-0">
                <Image src="/logo.png" alt="RK Technical Institute Logo" width={56} height={56} className="object-contain w-auto h-auto" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                  RK Technical
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                  Institute
                </p>
              </div>
            </Link>
            
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Transform your future with RK Technical Institute. Offering top-tier Technical courses designed to launch your successful career. Enroll now and achieve your professional goals with expert guidance and unmatched opportunities.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all text-slate-500 shadow-sm" aria-label="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/rktechnical.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-slate-500 shadow-sm" aria-label="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@RKTECHNICALKLB" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all text-slate-500 shadow-sm" aria-label="YouTube">
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-black text-lg mb-6 tracking-tight">Quick Links</h4>
            <ul className="space-y-3.5 font-medium">
              <li><Link href="/#about" className="text-slate-500 hover:text-blue-600 hover:translate-x-1 inline-flex items-center gap-2 transition-all"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 transition-opacity" />About Us</Link></li>
              <li><Link href="/courses" className="text-slate-500 hover:text-blue-600 hover:translate-x-1 inline-flex items-center gap-2 transition-all"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 transition-opacity" />Our Courses</Link></li>
              <li><Link href="/verification" className="text-slate-500 hover:text-blue-600 hover:translate-x-1 inline-flex items-center gap-2 transition-all"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 transition-opacity" />Student Verification</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-blue-600 hover:translate-x-1 inline-flex items-center gap-2 transition-all"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 transition-opacity" />Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-slate-900 font-black text-lg mb-6 tracking-tight">Contact Information</h4>
            <ul className="space-y-5 font-medium">
              <li className="flex items-start gap-4 text-slate-600 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <LuMapPin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm leading-relaxed pt-2">RK Technical Institute, Karewa Mod, Saraimeer, Azamgarh, U.P. - 276305</span>
              </li>
              <li className="flex items-center gap-4 text-slate-600 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                  <LuPhone className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm pt-0.5">+91 9918631729, +91 7238079091</span>
              </li>
              <li className="flex items-center gap-4 text-slate-600 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors">
                  <LuMail className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm pt-0.5">rktechnical.azm@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Area */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-8 mt-8">
          <p className="font-medium text-slate-400">© {new Date().getFullYear()} RK Technical Institute. All rights reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0 font-bold">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
