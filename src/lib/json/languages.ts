export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export const languages: Array<Language> = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (Zhōngwén), 汉语, 漢語' },
  { code: 'da', name: 'Danish', nativeName: 'dansk' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands, Vlaams' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fi', name: 'Finnish', nativeName: 'suomi, suomen kieli' },
  { code: 'fr', name: 'French', nativeName: 'français, langue française' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'el', name: 'Greek, Modern', nativeName: 'ελληνικά' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी, हिंदी' },
  { code: 'hu', name: 'Hungarian', nativeName: 'magyar' },
  { code: 'it', name: 'Italian', nativeName: 'italiano' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語 (にほんご)' },
  { code: 'ko', name: 'Korean', nativeName: '한국어 (韓國語), 조선말 (朝鮮語)' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'pl', name: 'Polish', nativeName: 'polski' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'русский язык' },
  { code: 'sr', name: 'Serbian', nativeName: 'српски језик' },
  { code: 'sk', name: 'Slovak', nativeName: 'slovenčina' },
  { code: 'es', name: 'Spanish; Castilian', nativeName: 'español, castellano' },
  { code: 'sv', name: 'Swedish', nativeName: 'svenska' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'українська' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'cs', name: 'Czech', nativeName: 'čeština' },
  { code: 'hr', name: 'Croatian', nativeName: 'hrvatski jezik' }
].sort((a: any, b: any) => a.name.localeCompare(b.name));
