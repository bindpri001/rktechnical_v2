import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    
    // Parse form data entries into an object
    const body: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "photo") {
        body[key] = value;
      }
    }
    
    // Convert necessary fields
    if (body.percentage) body.percentage = parseFloat(body.percentage);
    if (body.dob) body.dob = new Date(body.dob);
    if (body.admissionDate) body.admissionDate = new Date(body.admissionDate);
    if (body.completionDate) body.completionDate = new Date(body.completionDate);
    if (body.certificateIssueDate) body.certificateIssueDate = new Date(body.certificateIssueDate);
    if (body.courseDuration) body.courseDuration = parseInt(body.courseDuration);

    const photo = formData.get("photo") as File | null;
    let photoUrl = null;
    let photoPublicId = null;

    if (photo && photo.size > 0) {
      const uploadedPhoto = await uploadImage(photo, "rktechnical/students/photos");
      photoUrl = uploadedPhoto.url;
      photoPublicId = uploadedPhoto.publicId;
    }

    const student = await prisma.student.create({
      data: {
        ...body,
        photoUrl,
        photoPublicId,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    console.error("Error creating student:", error);
    return NextResponse.json({ error: error.message || "Failed to create student" }, { status: 500 });
  }
}
