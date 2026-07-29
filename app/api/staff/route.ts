import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    
    // Parse form data entries into an object
    const body: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "photo") {
        body[key] = value;
      }
    }

    const { fullName, designation, qualification, phone, email, address, displayOrder, experience, isActive } = body;

    if (!fullName || !designation) {
      return NextResponse.json({ error: "Full Name and Designation are required" }, { status: 400 });
    }

    // Check if email already exists
    if (email) {
      const existing = await prisma.staff.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "Email already registered for another staff member" }, { status: 400 });
      }
    }

    const photo = formData.get("photo") as File | null;
    let photoUrl = null;
    let photoPublicId = null;

    if (photo && photo.size > 0) {
      const uploadedPhoto = await uploadImage(photo, "rktechnical/staff");
      photoUrl = uploadedPhoto.url;
      photoPublicId = uploadedPhoto.publicId;
    }

    const staff = await prisma.staff.create({
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

    return NextResponse.json(staff, { status: 201 });
  } catch (error: any) {
    console.error("Staff registration error:", error);
    return NextResponse.json({ error: "Failed to register staff" }, { status: 500 });
  }
}
