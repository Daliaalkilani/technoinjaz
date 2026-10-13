import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/data/teamData';
import ProfilePage from '@/features/team/ProfilePage';
import { JsonLd } from '@/seo/JsonLd';
import { personSchema, breadcrumb, webPage } from '@/seo/schemas';
import { SITE_URL, absoluteUrl } from '@/config/site';
import { GOOGLE_BOT_PREVIEW } from '@/seo/metadata';

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

  const isAbdalgani = id === 'abdulghani';
  const description = isAbdalgani
    ? 'المهندس عبد الغني الحمدي، مستشار في المشاريع الهندسية ومشاريع التخرج التقنية، ومدرب في الأردوينو والروبوتيك والتحكم، وقائد ومؤسس تكنو إنجاز. أشرف على 500+ مشروع تقني.'
    : (member.shortBio || member.bio || `${member.name} - ${member.role} في تكنو إنجاز`);

  const pageUrl = absoluteUrl(`/team/${member.id}`);

  return {
    title: `${member.name} - ${member.role}`,
    description,
    alternates: {
      canonical: pageUrl
    },
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
      title: `${member.name} - ${member.role}`,
      description,
      url: pageUrl,
      type: 'profile',
      images: [
        {
          url: member.image.startsWith('http') ? member.image : absoluteUrl(member.image),
          width: 800,
          height: 800,
          alt: member.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.name} - ${member.role}`,
      description,
      images: [member.image.startsWith('http') ? member.image : absoluteUrl(member.image)]
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
          personSchema(member),
          breadcrumb(breadcrumbItems),
          webPage({
            path: `/team/${member.id}`,
            name: `${member.name} - ${member.role}`,
            description: member.shortBio || member.bio
          })
        ]}
      />
      <ProfilePage member={member} />
    </>
  );
}
