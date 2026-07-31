"use client";

import { motion } from "framer-motion";
import { LuArrowRight as ArrowRight, LuPhoneCall as PhoneCall, LuPlay as Play, LuCheck as CheckCircle, LuStar as Star } from "react-icons/lu";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative bg-[#F8FAFC] min-h-[calc(100vh-80px)] flex items-center pt-16 pb-20 overflow-hidden z-10">
      
      {/* ---------------- BACKGROUND ELEMENTS ---------------- */}
      

      {/* Modern Mesh Gradients (Optimized for Performance) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,white_70%,transparent)]">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 60%)' }}
        />
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 60%)' }}
        />
        <div 
          className="absolute top-[20%] left-[20%] w-[30%] h-[40%] rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.1) 0%, transparent 60%)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ---------------- LEFT CONTENT (Text) ---------------- */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-start relative">
            
            {/* Floating Badge (Decorative) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-sm mb-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.5)] ml-1"></span>
              <span className="text-sm font-bold text-slate-700 pr-1 tracking-wide">
                हुनर है तो कदर है
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4 drop-shadow-sm">
                Empower Your <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Future With Us
                  </span>
                  {/* Decorative underline */}
                  <svg className="absolute w-full h-4 -bottom-1 left-0 text-blue-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </span>
              </h1>
            </motion.div>
            
            {/* Sub Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg md:text-xl lg:text-2xl font-black text-slate-700 mb-6 flex flex-wrap items-center gap-3"
            >
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg shadow-sm border border-red-200/50">
                100% Practical
              </span> 
              Technical Training Institute
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-medium"
            >
              सीखें आज, कमाएं कल, बनाएं अपना बेहतर भविष्य। हम प्रदान करते हैं बेहतरीन तकनीकी प्रशिक्षण और सरकारी मान्यता प्राप्त प्रमाण पत्र, जो सुनिश्चित करता है आपका सफल करियर।
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="/courses" className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.4)] hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link href="tel:+919918631729" className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full font-black text-lg transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                </div>
                Join Us
              </Link>
            </motion.div>

          </div>

          {/* ---------------- RIGHT CONTENT (Carousel & Floating Cards) ---------------- */}
          <div className="lg:col-span-7 xl:col-span-6 relative mt-10 lg:mt-0 w-full">
            
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-[4/3] max-w-[800px] mx-auto z-10"
            >
              {/* Soft decorative shadow block behind carousel */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[3rem] rotate-3 scale-[1.02] -z-10 blur-xl" />
              <div className="absolute inset-0 bg-white rounded-[2.5rem] rotate-6 scale-[0.98] -z-10 shadow-lg border border-slate-100" />
              
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white relative group">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                  <div className="flex h-full">
                    {carouselImages.map((src, index) => (
                      <div key={index} className="relative flex-[0_0_100%] h-full min-w-0">
                        <Image
                          src={src}
                          alt={`Campus View ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Gradient Overlay for bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Custom Carousel Pagination */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => emblaApi?.scrollTo(idx)}
                      className={`transition-all duration-300 rounded-full h-1.5 shadow-sm ${
                        selectedIndex === idx ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </motion.div>

            {/* ---------------- FLOATING GLASS CARDS ---------------- */}
            
            {/* Top Right Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-6 -right-4 lg:-right-12 z-30 bg-white p-4 pr-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce-slow"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg leading-tight">ISO 9001</h4>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mt-0.5">Certified</p>
              </div>
            </motion.div>

            {/* Bottom Left Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-8 -left-4 lg:-left-12 z-30 bg-white p-4 pr-6 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 flex items-center gap-4"
              style={{ animation: 'float 7s ease-in-out infinite reverse' }}
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600 z-30">A+</div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-600 z-20">1st</div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 z-10">+</div>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm leading-tight">Top Rated</h4>
                <p className="text-xs text-slate-500 font-bold mt-0.5">In Azamgarh</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Global float animation definition */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </section>
  );
}