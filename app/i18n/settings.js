export const fallbackLng = 'de';
export const languages = [fallbackLng, 'en', 'ru', 'es', 'fr'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(language = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        // fallbackLng,
        lng: language,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    }
}