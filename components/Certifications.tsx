"use client";

import { motion, Variants } from "framer-motion";
import { LuAward as Award, LuFileText as FileText, LuLandmark as Landmark, LuCheck as CheckCircle2 } from "react-icons/lu";

const certifications = [
  {
    id: 1,
    title: "ISO 9001:2015",
    subtitle: "CERTIFIED INSTITUTE",
    description: "Internationally recognized standard for quality management and excellence.",
    icon: Award,
    color: "from-blue-600 to-indigo-600",
    bgClass: "md:col-span-2 md:row-span-1 bg-slate-900 text-white border-slate-800",
    textColor: "text-blue-400",
    iconBg: "bg-white/10 text-white",
  },
  {
    id: 2,
    title: "MSME Registered",
    subtitle: "GOVERNMENT OF INDIA",
    description: "Formally recognized by the Ministry of Micro, Small and Medium Enterprises.",
    icon: FileText,
    color: "from-emerald-500 to-teal-600",
    bgClass: "md:col-span-1 md:row-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100",
    textColor: "text-emerald-700",
    iconBg: "bg-emerald-500 text-white shadow-emerald-500/30",
  },
  {
    id: 3,
    title: "NITI Aayog",
    subtitle: "GOVERNMENT OF INDIA",
    description: "Formally registered with the NGO Darpan portal demonstrating our transparency.",
    icon: Landmark,
    color: "from-orange-500 to-red-500",
    bgClass: "md:col-span-2 md:row-span-1 bg-white border-slate-100 shadow-xl shadow-slate-200/40",
    textColor: "text-orange-600",
    iconBg: "bg-orange-50 text-orange-600",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

export default function Certifications() {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-wider text-sm mb-4">
              <span className="w-8 h-0.5 bg-red-600 rounded-full"></span>
              Recognized & Certified
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Certified Excellence & Quality
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm md:text-base border-l-2 border-red-200 pl-4 py-2 font-medium">
            Certified by ISO, NITI Aayog, and MSME, ensuring 100% quality and reliability in our training.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto"
        >
          {certifications.map((cert) => (
            <motion.div 
              key={cert.id}
              variants={item}
              className={`rounded-[2rem] p-8 md:p-10 border transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] hover:shadow-2xl ${cert.bgClass}`}
            >
              {/* Decorative background icon */}
              <cert.icon className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.03] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cert.iconBg} shadow-lg`}>
                    <cert.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50/10 backdrop-blur-md text-green-500 border border-green-500/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </div>
                </div>
                
                <h4 className={`text-xs font-bold ${cert.textColor} uppercase tracking-widest mb-2`}>{cert.subtitle}</h4>
                <h3 className={`text-2xl font-bold mb-4 ${cert.id === 1 ? 'text-white' : 'text-slate-900'}`}>{cert.title}</h3>
                <p className={`text-sm leading-relaxed mt-auto font-medium ${cert.id === 1 ? 'text-slate-400' : 'text-slate-600'}`}>
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
