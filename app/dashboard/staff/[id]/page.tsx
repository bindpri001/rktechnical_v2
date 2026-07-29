import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditStaffForm from "./EditStaffForm";

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staff = await prisma.staff.findUnique({ where: { id } });
  
  if (!staff) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EditStaffForm staff={staff} />
    </div>
  );
}
