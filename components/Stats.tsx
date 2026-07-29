"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { LuUsers as Users, LuTrendingUp as TrendingUp, LuSquarePlay as PlaySquare, LuMonitorPlay as MonitorPlay } from "react-icons/lu";

const stats = [
  {
    id: 1,
    name: "SUBSCRIBERS",
    value: "11.2K+",
    icon: Users,
    color: "from-red-500 to-rose-600",
  },
  {
    id: 2,
    name: "TOTAL VIEWS",
    value: "1.1M+",
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    name: "EDUCATIONAL VIDEOS",
    value: "350+",
    icon: PlaySquare,
    color: "from-emerald-500 to-teal-600",
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
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

export default function Stats() {
  return (
    <section className="relative pb-24 bg-transparent z-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Stats Container */}
        <div className="relative pt-16 mb-16 max-w-6xl mx-auto">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.id}
                variants={item}
                className="bg-white rounded-[2rem] p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-slate-200/60 border border-slate-100"
              >
                {/* Background decorative glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500 -mr-10 -mt-10`} />
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md bg-gradient-to-br ${stat.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="relative z-10">
                  <div className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.name}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-red-600 font-bold uppercase tracking-wider text-sm mb-4">
            <MonitorPlay className="w-5 h-5" />
            Our Digital Presence
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-10">
            Join RK Technical on YouTube
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Link href="https://www.youtube.com/@RKTECHNICALKLB" className="group relative flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-3">
                <MonitorPlay className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Subscribe RK Technical
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
