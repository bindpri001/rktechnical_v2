import { prisma } from "@/lib/prisma";
import { FiUsers, FiBookOpen, FiPlus } from "react-icons/fi";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export const dynamic = 'force-dynamic';

export default async function DashboardHome(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const totalStudents = await prisma.student.count();
  const totalUsers = await prisma.user.count();
  const totalStaff = await prisma.staff.count();
  
  const instituteName = "RK Technical Institute";
  
  const students = await prisma.student.findMany({
    where: query ? {
      OR: [
        { studentName: { contains: query, mode: "insensitive" } },
        { registrationNo: { contains: query, mode: "insensitive" } },
      ],
    } : undefined,
    orderBy: { createdAt: "desc" },
    take: 10
  });
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-blue-950">Dashboard Overview - {instituteName}</h1>
        <Link 
          href="/dashboard/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold shadow-sm transition-colors text-sm flex items-center gap-2"
        >
          <FiPlus size={18} />
          Register Student
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <FiUsers size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Students</p>
            <p className="text-3xl font-black text-slate-800">{totalStudents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-orange-100 p-4 rounded-xl text-orange-600">
            <FiBookOpen size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Staff</p>
            <p className="text-3xl font-black text-slate-800">{totalStaff}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600">
            <FiBookOpen size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Users</p>
            <p className="text-3xl font-black text-slate-800">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-700">Recently Registered Students</h2>
        <SearchBar />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
              <tr>
                <th className="px-6 py-4">Reg. No</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Father's Name</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">D.O.B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No students registered yet.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{student.registrationNo}</td>
                    <td className="px-6 py-4 font-bold text-blue-950">{student.studentName}</td>
                    <td className="px-6 py-4">{student.fatherName}</td>
                    <td className="px-6 py-4">{student.courseName}</td>
                    <td className="px-6 py-4">{new Date(student.dob).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
