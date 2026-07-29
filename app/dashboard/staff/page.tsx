import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import StaffActionButtons from "@/components/StaffActionButtons";

export const dynamic = 'force-dynamic';

export default async function StaffPage() {
  const staffMembers = await prisma.staff.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ]
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-blue-950">Manage Staff</h1>
        <Link 
          href="/dashboard/staff/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold shadow-sm transition-colors text-sm flex items-center gap-2"
        >
          <FiPlus size={18} />
          Add New Staff
        </Link>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
              <tr>
                <th className="px-6 py-4">Staff Profile</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4">Qualification & Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No staff members found.
                  </td>
                </tr>
              ) : (
                staffMembers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                          {staff.photoUrl ? (
                            <img src={staff.photoUrl} alt={staff.fullName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-lg bg-blue-50 text-blue-600">
                              {staff.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-blue-950 text-base">{staff.fullName}</p>
                          <p className="text-slate-500 text-xs font-medium bg-slate-100 inline-block px-2 py-0.5 rounded-md mt-1">{staff.designation}</p>
                          {staff.experience !== null && staff.experience !== undefined && (
                            <p className="text-slate-500 text-xs mt-1 max-w-[200px] truncate" title={`${staff.experience} Years Experience`}>
                              {staff.experience} {staff.experience === 1 ? 'Year' : 'Years'} Exp.
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-slate-700">{staff.phone || "No phone"}</p>
                        <p className="text-slate-500 text-xs">{staff.email || "No email"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 max-w-[200px]">
                        <p className="font-medium text-slate-700 truncate">{staff.qualification || "Not provided"}</p>
                        <p className="text-slate-500 text-xs truncate" title={staff.address || ""}>{staff.address || "No address"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {staff.isActive ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">Active</span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-2 h-full">
                      <StaffActionButtons staffId={staff.id} />
                    </td>
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
