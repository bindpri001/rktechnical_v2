"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterStudent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to register student");
      }

      setSuccess("Student registered successfully! You can register another student.");
      
      // Reset form and preview to allow another submission
      form.reset();
      setPhotoPreview(null);
      
      // Auto-hide the toast after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-black text-blue-950 mb-6">Register New Student</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
          {error}
        </div>
      )}
      
      {success && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 text-green-700 px-6 py-4 rounded-xl shadow-lg border border-green-200 flex items-center justify-between gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
          <span className="font-semibold">{success}</span>
          <button onClick={() => setSuccess("")} className="text-green-800 hover:text-green-950 font-bold text-xl leading-none">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <fieldset disabled={loading} className="group">
          <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Certificate Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Registration No *</label>
              <input required type="text" name="registrationNo" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Certificate No *</label>
              <input required type="text" name="certificateNo" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-600 mb-1">Student Photo</label>
              <input 
                type="file" 
                name="photo" 
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 disabled:opacity-60" 
              />
              {photoPreview && (
                <div className="relative w-32 h-32 mt-2 rounded-lg overflow-hidden border border-slate-200 opacity-100 group-disabled:opacity-60 transition-opacity">
                  <Image src={photoPreview} alt="Student Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Student Name *</label>
              <input required type="text" name="studentName" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Father's Name *</label>
              <input required type="text" name="fatherName" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Mother's Name</label>
              <input type="text" name="motherName" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Date of Birth *</label>
              <input required type="date" name="dob" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Gender *</label>
              <select required name="gender" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Contact No *</label>
              <input required type="text" name="contactNo" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Aadhaar No</label>
              <input type="text" name="aadhaarNo" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Qualification *</label>
              <select required name="qualification" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60">
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Intermediate 10+2">Intermediate 10+2</option>
                <option value="Graduate">Graduate</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-600 mb-1">Address</label>
              <textarea name="address" rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"></textarea>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Course Name *</label>
              <input required type="text" name="courseName" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Course Duration (Months) *</label>
              <input required type="number" name="courseDuration" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Admission Date *</label>
              <input required type="date" name="admissionDate" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Completion Date *</label>
              <input required type="date" name="completionDate" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Certificate Issue Date</label>
              <input type="date" name="certificateIssueDate" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Result Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Percentage *</label>
              <input required type="number" step="0.01" name="percentage" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Grade *</label>
              <input required type="text" name="grade" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register Student"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
