import { languages } from "@/lib/json/languages";
import { Language } from "@/lib/json/languages";

export default function getLanguageName(code: string) {
    const language = languages.find((language: Language) => language.code === code);
    return language?.name;
}