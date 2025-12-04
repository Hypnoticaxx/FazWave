import { toRomaji, isJapanese, isKana } from 'wanakana';

const koreanToRomanMap = {
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
  'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
  'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
  'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
  'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
  'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui', 'ㅣ': 'i'
};

const HANGUL_START = 0xAC00;
const HANGUL_END = 0xD7A3;
const CHO = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const JUNG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const JONG = ['', 'g', 'kk', 'gs', 'n', 'nj', 'nh', 'd', 'r', 'rg', 'rm', 'rb', 'rs', 'rt', 'rp', 'rh', 'm', 'b', 'bs', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h'];

function isKorean(char) {
  const code = char.charCodeAt(0);
  return code >= HANGUL_START && code <= HANGUL_END;
}

function romanizeKoreanChar(char) {
  const code = char.charCodeAt(0) - HANGUL_START;
  const choIndex = Math.floor(code / 588);
  const jungIndex = Math.floor((code % 588) / 28);
  const jongIndex = code % 28;
  return CHO[choIndex] + JUNG[jungIndex] + JONG[jongIndex];
}

function romanizeKorean(text) {
  let result = '';
  for (const char of text) {
    if (isKorean(char)) {
      result += romanizeKoreanChar(char);
    } else if (koreanToRomanMap[char]) {
      result += koreanToRomanMap[char];
    } else {
      result += char;
    }
  }
  return result;
}

function containsKorean(text) {
  return /[\uAC00-\uD7A3]/.test(text);
}

function containsJapanese(text) {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}

export function romanizeLyric(text) {
  if (!text) return '';
  
  if (containsJapanese(text)) {
    try {
      let result = '';
      for (const char of text) {
        if (isKana(char)) {
          result += toRomaji(char);
        } else if (/[\u4E00-\u9FAF]/.test(char)) {
          result += char;
        } else {
          result += char;
        }
      }
      return result;
    } catch {
      return text;
    }
  }
  
  if (containsKorean(text)) {
    return romanizeKorean(text);
  }
  
  return text;
}

export function detectLanguage(text) {
  if (containsJapanese(text)) return 'japanese';
  if (containsKorean(text)) return 'korean';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'chinese';
  return 'other';
}

export function formatLyricWithRomanization(text, showRomanized = true) {
  if (!showRomanized) return { original: text, romanized: null };
  
  const lang = detectLanguage(text);
  if (lang === 'other') {
    return { original: text, romanized: null };
  }
  
  return {
    original: text,
    romanized: romanizeLyric(text),
    language: lang
  };
}
