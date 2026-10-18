import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/data/teamData';
import ProfilePage from '@/features/team/ProfilePage';
import { JsonLd } from '@/seo/JsonLd';
import { personSchema, personId, breadcrumb, webPage } from '@/seo/schemas';
import { absoluteUrl } from '@/config/site';
import { GOOGLE_BOT_PREVIEW, pageMetadata } from '@/seo/metadata';
import { memberSeoTitle, memberDocumentTitle, memberSeoDescription, memberShareImage } from '@/seo/team';
import type { Lang } from '@/i18n/locale';

export const teamParams = () => teamMembers.filter((m) => m && m.id).map((m) => ({ id: m.id }));

export function teamMemberMetadata(lang: Lang, id: string): Metadata {
  const member = teamMembers.find((m) => m.id === id);
  if (!member) return { title: lang === 'en' ? 'Team member not found' : 'عضو الفريق غير موجود' };
  const en = lang === 'en';

  const title = memberSeoTitle(member, lang);
  const description = memberSeoDescription(member, lang);
  const path = `/team/${member.id}`;
  const shareImage = memberShareImage(member);
  const base = pageMetadata({ lang, title: memberDocumentTitle(member, lang), absoluteTitle: true, description, path, image: shareImage ?? undefined });
  const alt = member.nameEn ? (en ? `${member.nameEn} | ${member.name}` : `${member.name} | ${member.nameEn}`) : member.name;

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
      title,
      type: 'profile',
      ...(shareImage ? { images: [{ url: absoluteUrl(shareImage), alt }] } : {})
    }
  };
}

export function TeamMemberRoute({ lang, id }: { lang: Lang; id: string }) {
  const member = teamMembers.find((m) => m.id === id);
  if (!member) notFound();
  const en = lang === 'en';

  const breadcrumbItems = [
    { name: en ? 'Home' : 'الرئيسية', path: '/' },
    { name: en ? 'About Us' : 'من نحن', path: '/about' },
    { name: (en && member.nameEn) || member.name, path: `/team/${member.id}` }
  ];

  return (
    <>
      <JsonLd
        data={[
          personSchema(member, { image: memberShareImage(member), lang }),
          breadcrumb(breadcrumbItems, lang),
          // ProfilePage + mainEntity: the page is about this Person (Google profile-page
          // structured data; answer engines resolve the person from the page).
          webPage({
            lang,
            path: `/team/${member.id}`,
            name: memberSeoTitle(member, lang),
            description: memberSeoDescription(member, lang),
            type: 'ProfilePage',
            mainEntityId: personId(member)
          })
        ]}
      />
      <ProfilePage member={member} />
    </>
  );
}
