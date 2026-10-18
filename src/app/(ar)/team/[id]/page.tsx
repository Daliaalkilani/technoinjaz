import type { Metadata } from 'next';
import { teamParams, teamMemberMetadata, TeamMemberRoute } from '@/routes/team';

export const dynamic = 'force-static';
export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = teamParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return teamMemberMetadata('ar', (await params).id);
}

export default async function TeamMemberPage({ params }: Props) {
  return <TeamMemberRoute lang="ar" id={(await params).id} />;
}
