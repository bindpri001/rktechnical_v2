"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  LuCalendar, LuMedal, LuCheck, LuUserCheck,
  LuZap, LuWind, LuShirt, LuSnowflake, LuThermometer, LuDroplets,
  LuCpu, LuSettings, LuFlame, LuActivity, LuSearch, LuWrench, LuBriefcase,
  LuWallet, LuBookOpen
} from 'react-icons/lu';

const courseData = [
  {
    id: "adar",
    title: "ADAR",
    subtitle: "(Advance Diploma in Air Conditioning & Refrigeration)",
    duration: "12 Months",
    courseFee: "₹16,000/-",
    regFee: "₹500/-",
    themeColor: "from-blue-600 to-indigo-600",
    lightColor: "bg-blue-50 text-blue-700 border-blue-100",
    image: "/adar.png", // Using one of the hero images for premium look, ideally you'd replace with specific course images
    modules: [
      { id: 1, title: "House Wiring", icon: LuZap, topics: ["Switch board installation", "MCB & DB box", "Wire & wiring connection", "Light, fan, socket wiring", "Safety & fault finding"] },
      { id: 2, title: "Cooler Repair", icon: LuWind, topics: ["Motor repairing", "Pump repairing", "Wiring & connection", "Servicing & maintenance"] },
      { id: 3, title: "Washing Machine", icon: LuShirt, topics: ["Semi automatic machine", "Fully automatic machine", "Top & Front loaded", "Motor, timer & capacitor"] },
      { id: 4, title: "Refrigerator", icon: LuSnowflake, topics: ["Single & Double door", "Deep freezer", "Cooling system", "Compressor knowledge", "Gas charging & leakage"] },
      { id: 5, title: "Air Conditioner", icon: LuWind, topics: ["Window AC & Split AC", "Installation", "Servicing & maintenance", "Gas charging & faults"] },
      { id: 6, title: "Geyser System", icon: LuThermometer, topics: ["Heating element", "Thermostat", "Wiring & repairing", "Safety & maintenance"] },
      { id: 7, title: "RO System", icon: LuDroplets, topics: ["Installation & Servicing", "Filter change", "Purification process", "Maintenance & repairing"] },
      { id: 8, title: "Electric Chimney", icon: LuFlame, topics: ["Installation", "Servicing & maintenance", "Motor & switch repairing", "Cleaning process"] },
    ]
  },
  {
    id: "pcb",
    title: "PCB",
    subtitle: "(Printed Circuit Board Repairing Course)",
    duration: "12 Months",
    courseFee: "₹22,000/-",
    regFee: "₹500/-",
    themeColor: "from-rose-500 to-orange-500",
    lightColor: "bg-rose-50 text-rose-700 border-rose-100",
    image: "/pcb.png",
    modules: [
      { id: 1, title: "Basic Electronics", icon: LuZap, topics: ["Principles of electronics", "Voltage, current, resistor", "Diode, capacitor, IC", "Multimeter usage"] },
      { id: 2, title: "Intro to PCB", icon: LuSettings, topics: ["What is PCB & working", "Single & double layer", "Component identification", "Circuit diagrams reading"] },
      { id: 3, title: "Soldering Tech", icon: LuFlame, topics: ["SMD & through hole", "Soldering iron usage", "De-soldering & Hot air gun", "Flux & solder wire"] },
      { id: 4, title: "Component Test", icon: LuActivity, topics: ["Component identification", "Diode, MOSFET, IC test", "Capacitor, resistor test", "ESR & LCR meter usage"] },
      { id: 5, title: "Fault Finding", icon: LuSearch, topics: ["Short & Open circuit", "Component failure id", "Section wise checking", "Logic & tracing method"] },
      { id: 6, title: "Practical PCB", icon: LuWrench, topics: ["LED TV PCB repairing", "SMPS PCB repairing", "Inverter/charger PCB", "AC & Fridge PCB"] },
      { id: 7, title: "Advance PCB", icon: LuCpu, topics: ["Microcontroller & BIOS", "BGA IC rework", "Trace repair & jumper", "High level fault finding"] },
      { id: 8, title: "Live Practicals", icon: LuBriefcase, topics: ["Live board practicals", "Working on all brands", "Repairing speed & logic", "Professional work ethics"] },
    ]
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 overflow-hidden relative">
      
      {/* ---------------- GLOBAL BACKGROUND ELEMENTS ---------------- */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-70 pointer-events-none" />
      
      {/* Top Header Mesh Gradient */}
      <div className="absolute top-0 inset-x-0 h-[600px] overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,white_20%,transparent)]">
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-[100px]" />
        <div className="absolute top-[-10%] right-[10%] w-[30%] h-[50%] rounded-full bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* ---------------- PAGE HEADER ---------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto pt-20 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-sm">
            <LuBookOpen className="w-4 h-4" />
            100% Practical Training Programs
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Master Skills For A <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Better Tomorrow
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Choose from our highly demanded technical courses. We provide hands-on experience and government-recognized certifications to jumpstart your career.
          </p>
        </motion.div>

        {/* ---------------- COURSES LIST ---------------- */}
        <div className="space-y-16 lg:space-y-24">
          {courseData.map((course, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              key={course.id} 
              className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(15,23,42,0.1)] border border-slate-200/60 overflow-hidden relative"
            >
              
              {/* Top Banner Area */}
              <div className="relative w-full h-64 sm:h-80 lg:h-[400px] overflow-hidden group">
                <Image 
                  src={course.image} 
                  alt={`${course.title} Banner`}
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                
                {/* Banner Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="space-y-3">
                      <div className={`inline-block ${course.lightColor} px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md bg-opacity-90`}>
                        {course.duration} Duration
                      </div>
                      <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-lg">
                        {course.title}
                      </h2>
                      <p className="text-xl sm:text-2xl font-bold text-slate-200 max-w-2xl drop-shadow-md">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Info Cards Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-1 bg-slate-100 border-b border-slate-200">
                <div className="bg-white p-6 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1">
                    <LuCalendar className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Duration</span>
                  <span className="text-2xl font-black text-slate-900">{course.duration}</span>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-1">
                    <LuWallet className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Course Fee</span>
                  <span className="text-2xl font-black text-slate-900">{course.courseFee}</span>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-1">
                    <LuCheck className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Reg. Fee</span>
                  <span className="text-2xl font-black text-slate-900">{course.regFee}</span>
                </div>
              </div>

              {/* Modules Section */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${course.themeColor}`} />
                  <h3 className="text-3xl font-black text-slate-900">Course Syllabus</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {course.modules.map((mod) => (
                    <div key={mod.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 relative group">
                      
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0 shadow-sm text-white bg-gradient-to-br ${course.themeColor}`}>
                          {mod.id.toString().padStart(2, '0')}
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg leading-tight pt-1">
                          {mod.title}
                        </h4>
                      </div>

                      <ul className="space-y-3">
                        {mod.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium leading-relaxed group-hover:text-slate-800 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 mt-2 shrink-0 transition-colors" />
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <mod.icon className="absolute right-4 top-4 text-slate-200/50 w-24 h-24 -z-10 group-hover:scale-110 group-hover:text-blue-100/50 transition-all duration-500 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights Footer */}
              <div className="bg-slate-900 text-white px-8 py-6 md:px-12 flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-6 border-t border-slate-800">
                <div className="flex items-center gap-3 font-bold text-sm md:text-base">
                  <LuCheck className="w-5 h-5 text-emerald-400" />
                  100% Practical Training
                </div>
                <div className="flex items-center gap-3 font-bold text-sm md:text-base">
                  <LuUserCheck className="w-5 h-5 text-blue-400" />
                  Experienced Trainers
                </div>
                <div className="flex items-center gap-3 font-bold text-sm md:text-base">
                  <LuMedal className="w-5 h-5 text-yellow-400" />
                  Govt. Recognized Certificate
                </div>
              </div>

            </motion.div>
          ))}
          
        </div>
      </div>
    </div>
  );
}