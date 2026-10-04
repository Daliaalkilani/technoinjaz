// "منذ 3 أيام" / "3 days ago" — hand-rolled for Arabic because Intl.RelativeTimeFormat
// produces "قبل ٣ أيام" (Arabic-Indic digits, different wording) instead of the
// site's style. Arabic plural rules: 1 → singular, 2 → dual, 3–10 → plural, 11+ → singular (tamyeez).

type Unit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

const AR: Record<Unit, [one: string, two: string, few: string, many: string]> = {
  minute: ['دقيقة', 'دقيقتين', 'دقائق', 'دقيقة'],
  hour: ['ساعة', 'ساعتين', 'ساعات', 'ساعة'],
  day: ['يوم', 'يومين', 'أيام', 'يوماً'],
  week: ['أسبوع', 'أسبوعين', 'أسابيع', 'أسبوعاً'],
  month: ['شهر', 'شهرين', 'أشهر', 'شهراً'],
  year: ['سنة', 'سنتين', 'سنوات', 'سنة']
};

function arabic(n: number, unit: Unit): string {
  const [one, two, few, many] = AR[unit];
  if (n === 1) return `منذ ${one}`;
  if (n === 2) return `منذ ${two}`;
  if (n <= 10) return `منذ ${n} ${few}`;
  return `منذ ${n} ${many}`;
}

export function formatRelative(timestamp: number, isEn: boolean, now = Date.now()): string {
  const sec = Math.max(0, Math.round((now - timestamp) / 1000));
  if (sec < 45) return isEn ? 'just now' : 'منذ لحظات';

  const min = Math.round(sec / 60);
  const hr = Math.round(sec / 3600);
  const day = Math.round(sec / 86400);
  let n: number;
  let unit: Unit;
  if (min < 60) [n, unit] = [Math.max(1, min), 'minute'];
  else if (hr < 24) [n, unit] = [hr, 'hour'];
  else if (day < 7) [n, unit] = [day, 'day'];
  else if (day < 30) [n, unit] = [Math.round(day / 7), 'week'];
  else if (day < 365) [n, unit] = [Math.max(1, Math.round(day / 30)), 'month'];
  else [n, unit] = [Math.round(day / 365), 'year'];

  if (!isEn) return arabic(n, unit);
  return `${n} ${unit}${n === 1 ? '' : 's'} ago`;
}

/** Full date for tooltips / <time title>. */
export function formatFullDate(timestamp: number, isEn: boolean): string {
  return new Intl.DateTimeFormat(isEn ? 'en-GB' : 'ar-EG-u-nu-latn', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp));
}
