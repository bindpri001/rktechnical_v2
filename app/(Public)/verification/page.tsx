"use client";

import React, { useState } from 'react';
import { LuCalendar, LuCheck, LuShieldCheck, LuX } from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerificationPage() {
  const [registrationNo, setRegistrationNo] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStudentData(null);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNo, dob }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setStudentData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStudentData(null);
    setRegistrationNo("");
    setDob("");
    setError("");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  return (
    <section className={`min-h-[calc(100vh-80px)] relative overflow-hidden z-20 flex items-center justify-center px-4 transition-colors duration-1000 ${studentData ? 'bg-slate-50 py-2 md:py-4' : 'bg-slate-50 pt-20 pb-24'}`}>
      
      {/* Dynamic Backgrounds based on state */}
      {!studentData ? (
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-100 pointer-events-none" />
      ) : (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
        </>
      )}
      
      {/* Dynamic Fonts injected here for the certificate */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Great+Vibes&family=Oswald:wght@700&family=Playfair+Display:ital,wght@1,600&display=swap');
        .cert-cinzel { font-family: 'Cinzel', serif; }
        .cert-cursive { font-family: 'Great Vibes', cursive; }
        .cert-title { font-family: 'Oswald', sans-serif; text-shadow: 2px 2px 0 #FCD34D, -1px -1px 0 #FCD34D, 1px -1px 0 #FCD34D, -1px 1px 0 #FCD34D, 1px 1px 0 #FCD34D; }
        .cert-serif { font-family: 'Playfair Display', serif; }
        .cert-bg { 
          background-color: #ffffff;
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}} />

      <div className={`w-full relative z-10 transition-all duration-700 mx-auto ${
        studentData 
          ? 'max-w-7xl' 
          : 'max-w-[480px] bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden'
      }`}>
        
        {/* Header Section - Glassmorphic */}
        {!studentData && (
          <div className="px-8 pt-12 pb-6 md:px-12 md:pt-14 relative overflow-hidden flex flex-col items-center text-center">
            
            <div className="w-16 h-16 rounded-[1rem] bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 relative group">
              <LuShieldCheck className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Candidate</span>
            </h1>
            
            <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
              Enter the registration number and date of birth to securely authenticate this certificate.
            </p>
          </div>
        )}

        {/* Content Section */}
        <div className={`flex flex-col justify-center ${studentData ? 'p-2' : 'px-8 pb-12 md:px-12 md:pb-14'}`}>
          <AnimatePresence mode="wait">
            {!studentData ? (
              <motion.form 
                key="verify-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3.5 rounded-2xl flex items-start gap-3 text-sm font-medium backdrop-blur-sm">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <fieldset disabled={loading} className="space-y-6 group">
                  
                  <div className="space-y-2 group-disabled:opacity-70 transition-opacity">
                    <label htmlFor="registrationNo" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block ml-1">
                      Registration Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LuShieldCheck className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        id="registrationNo"
                        value={registrationNo}
                        onChange={(e) => setRegistrationNo(e.target.value)}
                        placeholder="e.g. RKAZM/001"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group-disabled:opacity-70 transition-opacity">
                    <label htmlFor="dob" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block ml-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LuCalendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="date" 
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full relative group/btn flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 mt-10 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying Securely...
                      </span>
                    ) : (
                      <>
                        Authenticate
                        <LuCheck className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                </fieldset>
              </motion.form>
            ) : (
              <motion.div 
                key="verify-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Trust Banner */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm w-full mx-auto max-w-7xl">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <LuShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-800">Certificate Verified Successfully</h3>
                      <p className="text-green-600 text-sm font-medium">This is a valid and authentic digital certificate issued by Raunak Technical Institute.</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 bg-white border border-green-200 hover:bg-green-50 text-green-700 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm whitespace-nowrap"
                  >
                    <LuX className="w-4 h-4" />
                    Verify Another
                  </button>
                </div>

                {/* Certificate Display UI */}
                <div className="w-full relative flex justify-center">
                  
                  {/* The Physical Certificate Container */}
                  <div className="w-full bg-white relative shadow-2xl">
                    
                    {/* Inner Decorative Border */}
                    <div className="w-full h-full border-[4px] border-[#1e3a8a] relative p-1 cert-bg">
                      <div className="w-full h-full border-[2px] border-[#F59E0B] relative p-4 md:p-6 flex flex-col justify-between">
                        
                        {/* Student Photo Top Right */}
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 bg-white border-2 border-slate-200 p-1 shadow-md z-10">
                          <div className="w-full h-full bg-slate-100 relative overflow-hidden">
                            {studentData.photoUrl ? (
                              <Image src={studentData.photoUrl} alt="Candidate Photo" fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] text-center px-2">No Photo</div>
                            )}
                          </div>
                        </div>

                        {/* Top Header Row (Reg Info) */}
                        <div className="flex justify-between items-start z-10 w-full mb-2">
                          <div className="text-xs font-bold space-y-0.5">
                            <p className="text-blue-900">Registration No.: <span className="text-red-600 ml-1">{studentData.registrationNo}</span></p>
                            <p className="text-blue-900">Certificate No.: <span className="text-red-600 ml-1">{studentData.certificateNo}</span></p>
                          </div>
                        </div>

                        {/* Center Header */}
                        <div className="text-center z-10 relative mb-6 mt-8 md:mt-2 px-2">
                          <h1 className="cert-cinzel text-3xl md:text-4xl font-black text-blue-950 tracking-widest uppercase mb-2 leading-tight">
                            Raunak Technical Institute
                          </h1>
                          
                          <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent to-red-600 rounded-full"></div>
                            <h2 className="text-xs md:text-sm font-black text-red-700 tracking-[0.2em] uppercase">
                              Saraimeer - Azamgarh (U.P.)
                            </h2>
                            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent to-red-600 rounded-full"></div>
                          </div>
                          
                          <div className="inline-block border-y-2 border-slate-200 py-1.5 px-6">
                            <div className="text-[9px] md:text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                              <p>An Autonomous Organization Registered under ITA 1860 Govt. of India | Associated with RTI Society under Act 1860</p>
                              <p>Registered by NITI Aayog & MSME Govt. of India | <span className="text-blue-800 font-black">An ISO 9001:2015 Certified</span></p>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Body */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 w-full px-4 md:px-16">
                          
                          <h3 className="cert-cursive text-5xl md:text-6xl text-blue-900 mb-1 opacity-90">Certificate</h3>
                          <p className="text-sm font-bold text-slate-700 italic mb-1">This is to certify that</p>
                          
                          <h2 className="cert-cursive text-4xl md:text-5xl text-red-600 mb-1">{studentData.studentName}</h2>
                          
                          <p className="text-sm font-bold text-slate-800 mb-2">
                            <span className="italic font-normal">S/o, D/o. Mr.</span> {studentData.fatherName}
                          </p>

                          <p className="text-sm italic text-slate-600 mb-1">
                            Is a bonafide student and has successfully completed the
                          </p>

                          <div className="flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-2 justify-center mb-2 px-2">
                            <h3 className="text-[15px] sm:text-lg md:text-xl font-black text-red-600 leading-tight text-center">{studentData.courseName}</h3>
                            <p className="text-xs sm:text-sm font-bold text-blue-900">
                              ({studentData.courseDuration} Months)
                            </p>
                          </div>

                          <p className="cert-cursive text-2xl md:text-3xl text-slate-700 mb-1">From our Study center</p>
                          
                          <div className="text-blue-900 italic text-[15px] md:text-lg max-w-lg mx-auto leading-relaxed mb-2 flex flex-col items-center gap-0">
                            <span>The course was undertaken during the period</span>
                            <span className="font-bold text-blue-900 italic">{formatDate(studentData.admissionDate)} to {formatDate(studentData.completionDate)}</span>
                            <span>and the student has secured a grade of</span>
                            <span className="font-bold text-blue-900 italic mt-1">"{studentData.grade}" {studentData.percentage}%</span>
                          </div>

                          <p className="cert-cursive text-2xl md:text-3xl text-slate-700">We wish him/her all success.</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}