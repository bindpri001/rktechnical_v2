"use client";

import Link from "next/link";
import { LuMapPin as MapPin, LuPhoneCall as PhoneCall, LuMail as Mail, LuArrowRight as ArrowRight, LuYoutube as Youtube } from "react-icons/lu";

const contactInfo = [
  {
    id: 1,
    title: "स्थान (Address)",
    lines: ["खरेवा मोड़", "सरायमीर, आजमगढ़ (उ.प्र.)"],
    icon: MapPin,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textLight: "text-blue-600"
  },
  {
    id: 2,
    title: "संपर्क करें (Call Us)",
    lines: ["+91 9918631729", "+91 7238079091"],
    icon: PhoneCall,
    color: "from-cyan-500 to-blue-500",
    bgLight: "bg-cyan-50",
    textLight: "text-cyan-600"
  },
  {
    id: 3,
    title: "YouTube Channel",
    lines: ["@RKTechnical", "Subscribe for updates"],
    icon: Youtube, 
    color: "from-red-500 to-red-600",
    bgLight: "bg-red-50",
    textLight: "text-red-600"
  },
];

export default function Contact() {
  return (
    <section className="bg-slate-50 pt-20 pb-24 relative overflow-hidden z-20 border-t border-slate-200/50">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_top,rgba(219,234,254,0.4)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-4 shadow-sm">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            हमसे <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">संपर्क</span> करें
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            एडमिशन या कोर्स से जुड़ी किसी भी जानकारी के लिए हमें कॉल करें या हमारे संस्थान में विजिट करें। हम आपकी सहायता के लिए सदैव तत्पर हैं।
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {contactInfo.map((info) => (
            <div 
              key={info.id} 
              className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${info.bgLight} mb-6 transition-colors duration-300 group-hover:shadow-lg`}>
                <info.icon className={`w-10 h-10 ${info.textLight} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              
              <h4 className="text-slate-900 font-black text-xl mb-3">{info.title}</h4>
              
              <div className="space-y-1">
                {info.lines.map((line, i) => (
                  <p key={i} className="text-slate-500 font-medium">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Google Map Section */}
        <div className="max-w-5xl mx-auto mb-16 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 relative h-[400px]">
          <iframe 
            src="https://maps.google.com/maps?q=RK%20Technical%20Institute%20Saraimeer%20Azamgarh&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale-[0.2] contrast-[1.05] hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              Send us a detailed message
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
