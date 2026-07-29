import { prisma } from "@/lib/prisma";
import EditStudentForm from "./EditStudentForm";
import { FiSearch, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function EditStudentPage(props: {
  searchParams?: Promise<{ regNo?: string }>;
}) {
  const searchParams = await props.searchParams;
  const regNo = searchParams?.regNo || "";

  let student = null;
  let error = null;

  if (regNo) {
    student = await prisma.student.findUnique({
      where: { registrationNo: regNo },
    });

    if (!student) {
      error = "Student not found with this Registration Number.";
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-blue-950">Edit Student</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Find Student</h2>
        <form method="GET" className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <div className="relative flex-1">
            <input
              type="text"
              name="regNo"
              defaultValue={regNo}
              placeholder="Enter Registration No..."
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
          <FiAlertCircle size={20} />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {student && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EditStudentForm student={{
            ...student,
            percentage: student.percentage ? student.percentage.toString() : "",
          }} />
        </div>
      )}

      {!student && !error && !regNo && (
        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p>Enter a Registration Number above to search and edit a student's details.</p>
        </div>
      )}
    </div>
  );
}