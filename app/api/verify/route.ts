import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { registrationNo, dob } = await req.json();

    if (!registrationNo || !dob) {
      return NextResponse.json({ error: "Registration number and Date of Birth are required" }, { status: 400 });
    }

    const inputDate = new Date(dob);
    if (isNaN(inputDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: {
        registrationNo: registrationNo.trim(),
      },
    });

    if (!student) {
      return NextResponse.json({ error: "No student found with this registration number" }, { status: 404 });
    }

    // Verify DOB (Compare YYYY-MM-DD strings to avoid time zone mismatches)
    const studentDobStr = student.dob.toISOString().split('T')[0];
    const inputDobStr = inputDate.toISOString().split('T')[0];

    if (studentDobStr !== inputDobStr) {
       return NextResponse.json({ error: "Invalid Date of Birth for this registration number" }, { status: 401 });
    }

    // Return safe public details
    return NextResponse.json({
      registrationNo: student.registrationNo,
      certificateNo: student.certificateNo,
      studentName: student.studentName,
      fatherName: student.fatherName,
      photoUrl: student.photoUrl,
      courseName: student.courseName,
      courseDuration: student.courseDuration,
      admissionDate: student.admissionDate,
      completionDate: student.completionDate,
      certificateIssueDate: student.certificateIssueDate,
      percentage: student.percentage,
      grade: student.grade
    });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
