import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/data/teamData';
import ProfilePage from '@/features/team/ProfilePage';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return teamMembers.map((m) => ({
    id: m.id
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);
  if (!member) return { title: 'عضو الفريق غير موجود' };

  return {
    title: `${member.name} - ${member.role} | تكنو إنجاز`,
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function TeamMemberPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);
  if (!member) notFound();

  return <ProfilePage member={member} />;
}
