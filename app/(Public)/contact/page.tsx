"use client";

import React, { useState } from 'react';
import { LuMapPin, LuPhone, LuMail, LuClock, LuSend, LuCheck } from 'react-icons/lu';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: LuMapPin,
      title: "Our Location",
      details: "RK Technical Institute, Karewa Mod, Saraimeer, Azamgarh, U.P. - 276305",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: LuPhone,
      title: "Phone Number",
      details: "+91 9918631729\n+91 7238079091",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: LuMail,
      title: "Email Address",
      details: "rktechnical.azm@gmail.com",
      color: "text-rose-600",
      bg: "bg-rose-100"
    },
    {
      icon: LuClock,
      title: "Working Hours",
      details: "Monday - Saturday\n09:00 AM - 06:00 PM",
      color: "text-amber-600",
      bg: "bg-amber-100"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-4">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Touch</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Have questions about our courses, admissions, or anything else? Our team is ready to answer all your queries.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Full Width Google Map */}
        <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200 mb-16 relative group">
          <div className="absolute inset-0 bg-blue-900/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10" />
          <iframe 
            src="https://maps.google.com/maps?q=RK%20Technical%20Institute%20Saraimeer%20Azamgarh&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale-[0.2] contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
          ></iframe>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 xl:gap-16">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
            
            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-2xl ${info.bg} flex items-center justify-center shrink-0`}>
                  <info.icon className={`w-7 h-7 ${info.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{info.title}</h3>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed">{info.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 lg:p-12 relative overflow-hidden">
              
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                <p className="text-slate-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <LuCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700">Thank you for reaching out. Our team will contact you very soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 99999 99999"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Course Inquiry"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all resize-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative flex items-center justify-center gap-3 bg-blue-950 hover:bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-950/25 hover:shadow-blue-950/40 hover:-translate-y-1 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <LuSend className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}