import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/data/teamData';
import ProfilePage from '@/features/team/ProfilePage';
import { JsonLd } from '@/seo/JsonLd';
import { personSchema, personId, breadcrumb, webPage } from '@/seo/schemas';
import { absoluteUrl } from '@/config/site';
import { GOOGLE_BOT_PREVIEW, pageMetadata } from '@/seo/metadata';
import { memberSeoTitle, memberSeoDescription, memberShareImage } from '@/seo/team';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return teamMembers.filter((m) => m && m.id).map((m) => ({
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

  const title = memberSeoTitle(member);
  const description = memberSeoDescription(member);
  const path = `/team/${member.id}`;
  const shareImage = memberShareImage(member);
  const base = pageMetadata({ title, description, path, image: shareImage ?? undefined });

  return {
    ...base,
    // Placeholder seats ("team-slot-N") are not in the sitemap and carry no real
    // profile — keep them out of the index.
    robots: {
      index: !member.isPlaceholder,
      follow: true,
      googleBot: {
        index: !member.isPlaceholder,
        follow: true,
        noimageindex: false,
        ...GOOGLE_BOT_PREVIEW
      }
    },
    openGraph: {
      ...base.openGraph,
      type: 'profile',
      ...(shareImage ? { images: [{ url: absoluteUrl(shareImage), alt: member.nameEn ? `${member.name} | ${member.nameEn}` : member.name }] } : {})
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

  const breadcrumbItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: member.name, path: `/team/${member.id}` }
  ];

  return (
    <>
      <JsonLd
        data={[
          personSchema(member, { image: memberShareImage(member) }),
          breadcrumb(breadcrumbItems),
          // ProfilePage + mainEntity: the page is about this Person (Google profile-page
          // structured data; answer engines resolve the person from the page).
          webPage({
            path: `/team/${member.id}`,
            name: memberSeoTitle(member),
            description: memberSeoDescription(member),
            type: 'ProfilePage',
            mainEntityId: personId(member)
          })
        ]}
      />
      <ProfilePage member={member} />
    </>
  );
}
