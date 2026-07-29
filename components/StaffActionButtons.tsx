"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function StaffActionButtons({ staffId }: { staffId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/staff/${staffId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete staff member");
        setIsDeleting(false);
      }
    } catch (error) {
      alert("Error deleting staff member");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link 
        href={`/dashboard/staff/${staffId}`}
        className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors mt-2"
        title="Edit Staff"
      >
        <FiEdit2 size={18} />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors mt-2 disabled:opacity-50"
        title="Delete Staff"
      >
        <FiTrash2 size={18} />
      </button>
    </>
  );
}
