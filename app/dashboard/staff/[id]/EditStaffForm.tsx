"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { Staff } from "@/generated/prisma/client";

export default function EditStaffForm({ staff }: { staff: Staff }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(staff.photoUrl || null);
  const [removePhotoFlag, setRemovePhotoFlag] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Photo must be less than 5MB");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setPhotoPreview(URL.createObjectURL(file));
      setRemovePhotoFlag(false);
      setError("");
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setRemovePhotoFlag(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    if (removePhotoFlag) {
      formData.append("removePhoto", "true");
    }

    try {
      const res = await fetch(`/api/staff/${staff.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to update staff");
      }

      router.push("/dashboard/staff");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 font-medium">
          {error}
        </div>
      )}
      
      <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Edit Staff Details</h2>
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        
        {/* Left Column: Photo Upload */}
        <div className="flex flex-col items-center gap-4 w-full md:w-1/3 xl:w-1/4 shrink-0">
          <label className="block text-sm font-bold text-slate-700 w-full text-center">Staff Photo</label>
          <div className="w-full aspect-square max-w-[240px] border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-slate-100 hover:border-blue-400 transition-colors">
            {photoPreview ? (
              <>
                <Image src={photoPreview} alt="Staff Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button" 
                    onClick={removePhoto}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-slate-400 flex flex-col items-center p-4 text-center pointer-events-none">
                <FiUploadCloud className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Click to upload photo</span>
                <span className="text-xs mt-1">JPEG, PNG (Max 5MB)</span>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              name="photo" 
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
            <input required type="text" name="fullName" defaultValue={staff.fullName} placeholder="e.g. John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Designation <span className="text-red-500">*</span></label>
            <input required type="text" name="designation" defaultValue={staff.designation} placeholder="e.g. Senior Instructor" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Qualification</label>
            <input type="text" name="qualification" defaultValue={staff.qualification || ""} placeholder="e.g. B.Tech, Diploma" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Phone Number</label>
            <input type="tel" name="phone" defaultValue={staff.phone || ""} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
          </div>
          
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Email Address</label>
            <input type="email" name="email" defaultValue={staff.email || ""} placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Years of Experience</label>
            <input type="number" name="experience" defaultValue={staff.experience || ""} min="0" placeholder="e.g. 5" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
          </div>
          
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Display Order</label>
            <input type="number" name="displayOrder" defaultValue={staff.displayOrder} placeholder="e.g. 1" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" />
            <p className="text-xs text-slate-500 mt-1">Lower numbers appear first on the public staff page.</p>
          </div>
          
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-bold text-slate-700">Residential Address</label>
            <textarea name="address" defaultValue={staff.address || ""} rows={3} placeholder="Full address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"></textarea>
          </div>

          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <input type="checkbox" name="isActive" id="isActive" defaultChecked={staff.isActive} value="true" className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer" />
            <label htmlFor="isActive" className="text-sm font-bold text-slate-700 cursor-pointer">Active Staff Member</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-slate-100 gap-4">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="text-slate-600 hover:bg-slate-100 font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
