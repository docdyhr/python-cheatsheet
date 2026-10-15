// Heading slug generator for markdown-it-anchor.
//
// Replaces `string(s).slugify()` from the unmaintained `string` package
// (GHSA-g36h-6r4f-3mqp, no patched release). It reproduces that function's
// output for every heading in docs/ and src/, so existing anchor links keep
// working:
//   1. transliterate Latin letters to ASCII (strip diacritics, expand ß/æ/ø/...)
//   2. drop everything except ASCII word characters, whitespace and hyphens
//   3. lowercase, trim, turn runs of whitespace/underscores into one hyphen
//   4. collapse repeated hyphens and drop a leading one

const LATIN_EXPANSIONS: Record<string, string> = {
  ß: 'ss',
  ẞ: 'SS',
  æ: 'ae',
  Æ: 'AE',
  ø: 'o',
  Ø: 'O',
  œ: 'oe',
  Œ: 'OE',
  đ: 'd',
  Đ: 'D',
  ł: 'l',
  Ł: 'L',
  ı: 'i',
}

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ßẞæÆøØœŒđĐłŁı]/g, (c) => LATIN_EXPANSIONS[c])
    .replace(/[^\w\s-]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-/, '')
}
