import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Stats from "@/components/Stats";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const staffMembers = await prisma.staff.findMany({
    where: { isActive: true },
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ]
  });

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-hidden">
      <Hero />
      <Stats />
      <Certifications />
      <AboutSection staffMembers={staffMembers} />
      <Contact />
    </main>
  );
}
