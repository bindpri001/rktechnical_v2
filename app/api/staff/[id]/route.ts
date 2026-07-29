import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const staff = await prisma.staff.findUnique({ where: { id } });
    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    // Delete photo from Cloudinary if exists
    if (staff.photoPublicId) {
      try {
        await deleteImage(staff.photoPublicId);
      } catch (err) {
        console.error("Failed to delete staff image from Cloudinary:", err);
      }
    }

    await prisma.staff.delete({ where: { id } });

    return NextResponse.json({ message: "Staff member deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Staff deletion error:", error);
    return NextResponse.json({ error: "Failed to delete staff member" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const formData = await req.formData();
    
    const body: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "photo") {
        body[key] = value;
      }
    }

    const { fullName, designation, qualification, phone, email, address, displayOrder, experience, isActive, removePhoto } = body;

    if (!fullName || !designation) {
      return NextResponse.json({ error: "Full Name and Designation are required" }, { status: 400 });
    }

    const existingStaff = await prisma.staff.findUnique({ where: { id } });
    if (!existingStaff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    // Check if email already exists for ANOTHER staff member
    if (email) {
      const emailCheck = await prisma.staff.findFirst({
        where: { email, id: { not: id } }
      });
      if (emailCheck) {
        return NextResponse.json({ error: "Email already registered for another staff member" }, { status: 400 });
      }
    }

    const photo = formData.get("photo") as File | null;
    let photoUrl = existingStaff.photoUrl;
    let photoPublicId = existingStaff.photoPublicId;

    if (removePhoto === "true" || (photo && photo.size > 0)) {
      if (existingStaff.photoPublicId) {
        try {
          await deleteImage(existingStaff.photoPublicId);
        } catch (err) {
          console.error("Failed to delete old staff image from Cloudinary:", err);
        }
      }
      photoUrl = null;
      photoPublicId = null;
    }

    if (photo && photo.size > 0) {
      const uploadedPhoto = await uploadImage(photo, "rktechnical/staff");
      photoUrl = uploadedPhoto.url;
      photoPublicId = uploadedPhoto.publicId;
    }

    const staff = await prisma.staff.update({
      where: { id },
      data: {
        fullName,
        designation,
        qualification: qualification || null,
        phone: phone || null,
        email: email || null,
        address: address || null,
        experience: experience ? parseInt(experience) : null,
        isActive: isActive === "true",
        photoUrl,
        photoPublicId,
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
      },
    });

    return NextResponse.json(staff, { status: 200 });
  } catch (error: any) {
    console.error("Staff update error:", error);
    return NextResponse.json({ error: "Failed to update staff member" }, { status: 500 });
  }
}
