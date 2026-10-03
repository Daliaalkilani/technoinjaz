export interface QAItem {
  q: string;
  a: string;
  /** English question — required for every item (rendered in English mode) */
  qEn: string;
  /** English answer — required for every item (rendered in English mode) */
  aEn: string;
}
