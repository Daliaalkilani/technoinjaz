import fs from 'node:fs';
import path from 'node:path';
import type { Lang } from '@/i18n/locale';

// Build-time SEO helpers for /team/* profiles (titles, descriptions, share image).
// Uses node:fs, so import it only from server code (pages, metadata, route handlers).

/** English name without the "Eng." honorific, e.g. "Aya Najma". */
export const plainNameEn = (member: any): string => String(member.nameEn || '').replace(/^Eng\.\s*/, '').trim();

// Generic roles such as "مهندسة في فريق تكنو إنجاز" / "Engineer, Techno Enjaz Team" repeat
// the brand that the title template already carries — keep only the role itself.
const shortRoleAr = (member: any): string => String(member.role || '').replace(/\s*في فريق تكنو إنجاز\s*$/, '').trim();
const shortRoleEn = (member: any): string => String(member.roleEn || '').replace(/,?\s*Techno Enjaz Team\s*$/, '').trim();

/** "م. آية نجمة (Aya Najma) — مهندسة برمجيات": both spellings, so the page ranks for either. */
export function memberSeoTitle(member: any, lang: Lang = 'ar'): string {
  if (lang === 'en') return memberSeoTitleEn(member);
  const en = plainNameEn(member);
  const role = shortRoleAr(member);
  return `${member.title || member.name}${en ? ` (${en})` : ''}${role ? ` — ${role}` : ''}`;
}

/** Full <title>: the English name already carries the Latin spelling, so the brand
 *  suffix is Arabic only (the default "| تكنو إنجاز | Techno Enjaz" template pushed
 *  profile titles past 90 characters). */
export const memberDocumentTitle = (member: any, lang: Lang = 'ar'): string =>
  lang === 'en' ? `${memberSeoTitleEn(member)} | Techno Enjaz` : `${memberSeoTitle(member)} | تكنو إنجاز`;

/** English page: "Eng. Aya Najma — Software Engineer" (falls back to the Arabic name). */
function memberSeoTitleEn(member: any): string {
  const name = String(member.titleEn || member.nameEn || '').trim() || member.title || member.name;
  const role = shortRoleEn(member);
  return `${name}${role ? ` — ${role}` : ''}`;
}

/** Arabic bio + an English line with name, role and location (~150–165 chars). */
export function memberSeoDescription(member: any, lang: Lang = 'ar'): string {
  if (lang === 'en') return memberSeoDescriptionEn(member);
  if (member.id === 'abdulghani') {
    return 'المهندس عبد الغني الحمدي، مستشار في المشاريع الهندسية ومشاريع التخرج التقنية، ومدرب في الأردوينو والروبوتيك والتحكم، وقائد ومؤسس تكنو إنجاز. أشرف على 500+ مشروع تقني.';
  }
  const bio = String(member.bio || member.shortBio || '').trim();
  const ar = bio.length > 150 ? String(member.shortBio || bio).trim() : bio;
  const en = plainNameEn(member);
  const roleEn = shortRoleEn(member);
  const tail = en ? ` ${en}${roleEn ? ` — ${roleEn}` : ''} at Techno Enjaz, ${member.locationEn || 'Hama, Syria'}.` : '';
  const out = `${ar}${tail}`;
  return out.length > 300 ? `${out.slice(0, 297)}…` : out;
}

function memberSeoDescriptionEn(member: any): string {
  if (member.id === 'abdulghani') {
    return 'Eng. Abdalgani Alhamdi — engineering projects and graduation-projects consultant, trainer in Arduino, robotics and control, and founder of Techno Enjaz. Supervised 500+ technical projects.';
  }
  const bio = String(member.bioEn || member.shortBioEn || '').trim();
  const body = bio.length > 150 ? String(member.shortBioEn || bio).trim() : bio;
  const name = plainNameEn(member);
  const roleEn = shortRoleEn(member);
  const tail = name ? ` ${name}${roleEn ? ` — ${roleEn}` : ''} at Techno Enjaz, ${member.locationEn || 'Hama, Syria'}.` : '';
  const out = `${body}${tail}`.trim() || memberSeoDescription(member, 'ar');
  return out.length > 300 ? `${out.slice(0, 297)}…` : out;
}

/**
 * Image for og:image / Person.image / the image sitemap. Social crawlers (Facebook,
 * WhatsApp, LinkedIn) do not render AVIF, so an `x.640.avif` profile photo is swapped
 * for its `x.jpg` sibling when one exists. Placeholder photos (photoPending) return
 * null — a stand-in avatar must not be published as the person's picture.
 */
export function memberShareImage(member: any): string | null {
  const src: string = member.image || '';
  if (!src || member.photoPending || member.isPlaceholder) return null;
  if (!src.endsWith('.avif')) return src;
  const jpg = src.replace(/(\.\d+)?\.avif$/, '.jpg');
  return fs.existsSync(path.join(process.cwd(), 'public', jpg)) ? jpg : src;
}
