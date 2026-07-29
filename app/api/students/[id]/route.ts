import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const body: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "photo") {
        body[key] = value;
      }
    }
    
    if (body.percentage) body.percentage = parseFloat(body.percentage);
    if (body.dob) body.dob = new Date(body.dob);
    if (body.admissionDate) body.admissionDate = new Date(body.admissionDate);
    if (body.completionDate) body.completionDate = new Date(body.completionDate);
    
    if (body.certificateIssueDate) {
      body.certificateIssueDate = new Date(body.certificateIssueDate);
    } else {
      body.certificateIssueDate = null;
    }

    if (body.courseDuration) body.courseDuration = parseInt(body.courseDuration);

    const photo = formData.get("photo") as File | null;
    let photoUrl = body.photoUrl || undefined;
    let photoPublicId = body.photoPublicId || undefined;
    
    // We don't want to pass empty strings as dates if they are cleared out, 
    // but the original form structure keeps them string or empty.
    // If they are empty strings and the schema expects DateTime?, they should be null.
    if (body.certificateIssueDate && isNaN(body.certificateIssueDate.getTime())) {
      body.certificateIssueDate = null;
    }

    if (photo && photo.size > 0) {
      // If there's an existing photo, delete it first
      const existingStudent = await prisma.student.findUnique({
        where: { id },
        select: { photoPublicId: true }
      });
      
      if (existingStudent?.photoPublicId) {
        try {
          await deleteImage(existingStudent.photoPublicId);
        } catch (err) {
          console.error("Failed to delete old image from Cloudinary:", err);
          // continue anyway
        }
      }

      const uploadedPhoto = await uploadImage(photo, "rktechnical/students/photos");
      photoUrl = uploadedPhoto.url;
      photoPublicId = uploadedPhoto.publicId;
    }

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...body,
        ...(photoUrl && { photoUrl }),
        ...(photoPublicId && { photoPublicId }),
      },
    });

    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Error updating student:", error);
    return NextResponse.json({ error: error.message || "Failed to update student" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    if (student.photoPublicId) {
      try {
        await deleteImage(student.photoPublicId);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err);
      }
    }

    await prisma.student.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}
