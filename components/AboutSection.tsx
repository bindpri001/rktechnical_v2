"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LuQuote, LuUser, LuBookOpen } from 'react-icons/lu';
import { Staff } from '@/generated/prisma/client';

export default function AboutSection({ staffMembers = [] }: { staffMembers?: Staff[] }) {

  return (
    <div id="about" className="overflow-hidden bg-slate-50 relative">

      {/* Director / Founder Message Section */}
      <section className="pt-24 pb-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Huge background quote mark */}
        <div className="absolute top-10 left-10 text-slate-200/60 pointer-events-none">
          <LuQuote className="w-96 h-96 -rotate-12" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Director Photo (Staggered Layout) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-5/12 flex items-center justify-center relative pt-16"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-[3rem] transform -rotate-6 scale-105 opacity-10 mt-16" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-[3rem] transform rotate-3 scale-100 opacity-10 mt-16" />
              
              <div className="relative w-full max-w-[320px] bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-blue-900/10 flex flex-col items-center group px-6 pb-10 pt-52 mt-8">
                
                {/* Floating Circular Director Image */}
                <div className="absolute -top-16 w-64 h-64 bg-white rounded-full border-[6px] border-white shadow-xl overflow-hidden z-20 group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                  <Image 
                    src="/director_photo.png" 
                    alt="Director of RK Technical Institute"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                
                {/* Director Details Panel */}
                <div className="w-full flex flex-col items-center relative z-10">
                  <h3 className="text-2xl font-black text-slate-900 text-center leading-tight">Mr. Kanhaiya Lal Bind</h3>
                  <p className="text-blue-600 font-bold mt-2 text-sm text-center uppercase tracking-wider">Founder & Director</p>
                  <div className="w-10 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mt-6" />
                </div>
              </div>
            </motion.div>

            {/* Director Message Text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-7/12"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
                <LuBookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
                Message from the <br className="hidden md:block"/> <span className="text-blue-600">Director's Desk</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                <p>
                  Welcome to <strong>RK Technical Institute</strong>. Since our inception, our core vision has been to empower the youth of our country with practical, industry-ready technical skills that guarantee employment and self-reliance.
                </p>
                <p>
                  In today's rapidly changing world, traditional education alone is often not enough. We focus heavily on hands-on practical training in high-demand fields like Air Conditioning, Refrigeration, and PCB repairing. Our goal is to ensure that every student who walks through our doors leaves as a confident, skilled professional ready to build a bright future.
                </p>
                <blockquote className="mt-8 pt-8 border-t-2 border-slate-200 relative">
                  <p className="text-xl font-semibold text-slate-800 italic leading-snug">
                    "Education is the most powerful weapon which you can use to change the world. Skill is the tool that makes you capable of using it."
                  </p>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Staff & Faculty Section - Light Background */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white border-t border-slate-100 relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Meet Our Dedicated <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Our highly experienced faculty and support staff work together to provide you with the best practical training, guidance, and environment to shape your career.
            </p>
          </div>
          
          {/* Staff Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {staffMembers.map((staff, idx) => (
              <motion.div 
                key={staff.id || idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50/80 rounded-[2rem] p-8 pb-10 border border-slate-100/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="relative w-32 h-32 rounded-full mb-6 flex items-center justify-center bg-white border-4 border-white shadow-sm overflow-hidden shrink-0">
                  {staff.photoUrl ? (
                    <img src={staff.photoUrl} alt={staff.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <LuUser className="w-12 h-12 text-slate-300" />
                  )}
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-1.5">{staff.fullName}</h3>
                <p className="text-blue-600 font-bold text-xs leading-relaxed tracking-wider uppercase mb-5 px-2">
                  {staff.designation}
                </p>
                
                {(staff.qualification || (staff.experience !== null && staff.experience !== undefined)) && (
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-center bg-white text-slate-700 font-bold text-xs px-4 py-1.5 rounded-full border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      {[
                        staff.qualification,
                        staff.experience !== null && staff.experience !== undefined ? `${staff.experience} Years Exp.` : null
                      ].filter(Boolean).join(" • ")}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
