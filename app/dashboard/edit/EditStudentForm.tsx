"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditStudentForm({ student }: { student: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(student.photoUrl || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: "PUT",
        body: formData, // the PUT route now handles FormData
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to update student");
      }

      setSuccess("Student details updated successfully!");
      
      // Auto-hide the toast after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
      router.refresh(); // Refresh the page to get the latest data
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to delete student");
      }
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
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
              <label className="block text-sm font-bold text-slate-600 mb-1">Registration No</label>
              <input required type="text" name="registrationNo" defaultValue={student.registrationNo} readOnly className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 focus:outline-none cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Certificate No *</label>
              <input required type="text" name="certificateNo" defaultValue={student.certificateNo} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
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
              <p className="text-xs text-slate-500 mb-2">Leave blank to keep the current photo.</p>
              {photoPreview && (
                <div className="relative w-32 h-32 mt-2 rounded-lg overflow-hidden border border-slate-200 opacity-100 group-disabled:opacity-60 transition-opacity">
                  <Image src={photoPreview} alt="Student Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Student Name *</label>
              <input required type="text" name="studentName" defaultValue={student.studentName} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Father's Name *</label>
              <input required type="text" name="fatherName" defaultValue={student.fatherName} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Mother's Name</label>
              <input type="text" name="motherName" defaultValue={student.motherName || ""} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Date of Birth *</label>
              <input required type="date" name="dob" defaultValue={formatDate(student.dob)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Gender *</label>
              <select required name="gender" defaultValue={student.gender} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Contact No *</label>
              <input required type="text" name="contactNo" defaultValue={student.contactNo} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Aadhaar No</label>
              <input type="text" name="aadhaarNo" defaultValue={student.aadhaarNo || ""} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Qualification *</label>
              <select required name="qualification" defaultValue={student.qualification} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60">
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Intermediate 10+2">Intermediate 10+2</option>
                <option value="Graduate">Graduate</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-600 mb-1">Address</label>
              <textarea name="address" rows={2} defaultValue={student.address || ""} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"></textarea>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Course Name *</label>
              <input required type="text" name="courseName" defaultValue={student.courseName} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Course Duration (Months) *</label>
              <input required type="number" name="courseDuration" defaultValue={student.courseDuration} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Admission Date *</label>
              <input required type="date" name="admissionDate" defaultValue={formatDate(student.admissionDate)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Completion Date *</label>
              <input required type="date" name="completionDate" defaultValue={formatDate(student.completionDate)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Certificate Issue Date</label>
              <input type="date" name="certificateIssueDate" defaultValue={formatDate(student.certificateIssueDate)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Result Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Percentage *</label>
              <input required type="number" step="0.01" name="percentage" defaultValue={student.percentage ? parseFloat(student.percentage.toString()) : ""} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Grade *</label>
              <input required type="text" name="grade" defaultValue={student.grade} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
            >
              Delete Student
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
