import { SelectOption } from "../types/common";
import { Category } from "../types/movement";
import { Movements } from "./movment";

export const MovmentsOptions = {
    he: [
        { value: Movements.he.scout.name, label: Movements.he.scout.title },
        { value: Movements.he.oved.name, label: Movements.he.oved.title },
        { value: Movements.he.akiva.name, label: Movements.he.akiva.title },
        { value: Movements.he.maccabi.name, label: Movements.he.maccabi.title },
        { value: Movements.he.camps.name, label: Movements.he.camps.title },
        { value: Movements.he.shomer.name, label: Movements.he.shomer.title },
        { value: Movements.he.bitar.name, label: Movements.he.bitar.title },
        { value: Movements.he.hadasha.name, label: Movements.he.hadasha.title },
        { value: Movements.he.medtchim.name, label: Movements.he.medtchim.title },
        { value: Movements.he.meshachim.name, label: Movements.he.meshachim.title },
        { value: Movements.he.sayarut.name, label: Movements.he.sayarut.title },
        { value: Movements.he.noam.name, label: Movements.he.noam.title },
        { value: Movements.he.agricultural.name, label: Movements.he.agricultural.title },
        { value: Movements.he.shinshin.name, label: Movements.he.shinshin.title },
        { value: Movements.he.other.name, label: Movements.he.other.title },
    ] as SelectOption[],
    en: [
        { value: Movements.en.youthLeadershipPrograms.name, label: Movements.en.youthLeadershipPrograms.title },
        { value: Movements.en.scouts.name, label: Movements.en.scouts.title },
        { value: Movements.en.faithBasedYouthGroups.name, label: Movements.en.faithBasedYouthGroups.title },
        { value: Movements.en.environmentalAndNatureGroups.name, label: Movements.en.environmentalAndNatureGroups.title },
        { value: Movements.en.other.name, label: Movements.en.other.title }
    ] as SelectOption[],
    es: [
        { value: Movements.en.youthLeadershipPrograms.name, label: Movements.en.youthLeadershipPrograms.title },
        { value: Movements.en.scouts.name, label: Movements.en.scouts.title },
        { value: Movements.en.faithBasedYouthGroups.name, label: Movements.en.faithBasedYouthGroups.title },
        { value: Movements.en.environmentalAndNatureGroups.name, label: Movements.en.environmentalAndNatureGroups.title },
        { value: Movements.en.other.name, label: Movements.en.other.title }
    ] as SelectOption[],
    ar: [
        { value: Movements.en.youthLeadershipPrograms.name, label: Movements.en.youthLeadershipPrograms.title },
        { value: Movements.en.scouts.name, label: Movements.en.scouts.title },
        { value: Movements.en.faithBasedYouthGroups.name, label: Movements.en.faithBasedYouthGroups.title },
        { value: Movements.en.environmentalAndNatureGroups.name, label: Movements.en.environmentalAndNatureGroups.title },
        { value: Movements.en.other.name, label: Movements.en.other.title }
    ] as SelectOption[],
};

export const GradeOptions = {
    he: [
        { value: "כיתה א", label: "כיתה א" },
        { value: "כיתה ב", label: "כיתה ב" },
        { value: "כיתה ג", label: "כיתה ג" },
        { value: "כיתה ד", label: "כיתה ד" },
        { value: "כיתה ה", label: "כיתה ה" },
        { value: "כיתה ו", label: "כיתה ו" },
        { value: "כיתה ז", label: "כיתה ז" },
        { value: "כיתה ח", label: "כיתה ח" },
        { value: "כיתה ט", label: "כיתה ט" },
        { value: "כיתה י", label: "כיתה י" },
        { value: "כיתה יא", label: "כיתה יא" },
        { value: "כיתה יב", label: "כיתה יב" },
    ] as SelectOption[],
    en: [
        { value: "grade 1", label: "Grade 1" },
        { value: "grade 2", label: "Grade 2" },
        { value: "grade 3", label: "Grade 3" },
        { value: "grade 4", label: "Grade 4" },
        { value: "grade 5", label: "Grade 5" },
        { value: "grade 6", label: "Grade 6" },
        { value: "grade 7", label: "Grade 7" },
        { value: "grade 8", label: "Grade 8" },
        { value: "grade 9", label: "Grade 9" },
        { value: "grade 10", label: "Grade 10" },
        { value: "grade 11", label: "Grade 11" },
        { value: "grade 12", label: "Grade 12" },
    ] as SelectOption[],
    es: [
        { value: "grado 1", label: "Grado 1" },
        { value: "grado 2", label: "Grado 2" },
        { value: "grado 3", label: "Grado 3" },
        { value: "grado 4", label: "Grado 4" },
        { value: "grado 5", label: "Grado 5" },
        { value: "grado 6", label: "Grado 6" },
        { value: "grado 7", label: "Grado 7" },
        { value: "grado 8", label: "Grado 8" },
        { value: "grado 9", label: "Grado 9" },
        { value: "grado 10", label: "Grado 10" },
        { value: "grado 11", label: "Grado 11" },
        { value: "grado 12", label: "Grado 12" },
    ] as SelectOption[],
    ar: [
        { value: "الصف 1", label: "الصف 1" },
        { value: "الصف 2", label: "الصف 2" },
        { value: "الصف 3", label: "الصف 3" },
        { value: "الصف 4", label: "الصف 4" },
        { value: "الصف 5", label: "الصف 5" },
        { value: "الصف 6", label: "الصف 6" },
        { value: "الصف 7", label: "الصف 7" },
        { value: "الصف 8", label: "الصف 8" },
        { value: "الصف 9", label: "الصف 9" },
        { value: "الصف 10", label: "الصف 10" },
        { value: "الصف 11", label: "الصف 11" },
        { value: "الصف 12", label: "الصف 12" },
    ] as SelectOption[],
};


export const AmountOptions = {
    he: [
        { value: "1-5", label: "1-5" },
        { value: "5-10", label: "5-10" },
        { value: "10-20", label: "10-20" },
        { value: "20-30", label: "20-30" },
        { value: "30-50", label: "30-50" },
        { value: "60+", label: "60+" },
    ] as SelectOption[],
    en: [
        { value: "1-5", label: "1-5" },
        { value: "5-10", label: "5-10" },
        { value: "10-20", label: "10-20" },
        { value: "20-30", label: "20-30" },
        { value: "30-50", label: "30-50" },
        { value: "60+", label: "60+" },
    ] as SelectOption[],
    es: [
        { value: "1-5", label: "1-5" },
        { value: "5-10", label: "5-10" },
        { value: "10-20", label: "10-20" },
        { value: "20-30", label: "20-30" },
        { value: "30-50", label: "30-50" },
        { value: "60+", label: "60+" },
    ] as SelectOption[],
    ar: [
        { value: "1-5", label: "1-5" },
        { value: "5-10", label: "5-10" },
        { value: "10-20", label: "10-20" },
        { value: "20-30", label: "20-30" },
        { value: "30-50", label: "30-50" },
        { value: "60+", label: "60+" },
    ] as SelectOption[],
};


export const PlaceOptions = {
    he: [
        { value: "לא משנה", label: "לא משנה" },
        { value: "במקום סגור", label: "במקום סגור" },
        { value: "במקום פתוח", label: "במקום פתוח" },
    ] as SelectOption[],
    en: [
        { value: "not specified", label: "Any" },
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor" },
    ] as SelectOption[],
    es: [
        { value: "no especificado", label: "Cualquiera" },
        { value: "interior", label: "Interior" },
        { value: "exterior", label: "Exterior" },
    ] as SelectOption[],
    ar: [
        { value: "غير محدد", label: "أي" },
        { value: "داخلية", label: "داخلية" },
        { value: "خارجية", label: "خارجية" },
    ] as SelectOption[],
};


export const GenderOptions = {
    he: [
        { value: "חניכים", label: "קבוצת בנים" },
        { value: "חניכות", label: "קבוצת בנות" },
        { value: "מעורב", label: "קבוצה מעורבת" },
    ] as SelectOption[],
    en: [
        { value: "boys", label: "Boys" },
        { value: "girls", label: "Girls" },
        { value: "mixed", label: "Mixed" },
    ] as SelectOption[],
    es: [
        { value: "niños", label: "Niños" },
        { value: "niñas", label: "Niñas" },
        { value: "mixto", label: "Mixto" },
    ] as SelectOption[],
    ar: [
        { value: "أولاد", label: "أولاد" },
        { value: "بنات", label: "بنات" },
        { value: "مختلط", label: "مختلط" },
    ] as SelectOption[],
};


export const ActivityTimeOptions = {
    he: [
        { value: "20 דקות", label: "20 דקות" },
        { value: "חצי שעה", label: "חצי שעה" },
        { value: "שעה", label: "שעה" },
        { value: "שעה וחצי", label: "שעה וחצי" },
    ] as SelectOption[],
    en: [
        { value: "20 minutes", label: "20 minutes" },
        { value: "half hour", label: "Half hour" },
        { value: "hour", label: "Hour" },
        { value: "hour and a half", label: "Hour and a half" },
    ] as SelectOption[],
    es: [
        { value: "20 minutos", label: "20 minutos" },
        { value: "media hora", label: "Media hora" },
        { value: "hora", label: "Hora" },
        { value: "hora y media", label: "Hora y media" },
    ] as SelectOption[],
    ar: [
        { value: "20 دقيقة", label: "20 دقيقة" },
        { value: "نصف ساعة", label: "نصف ساعة" },
        { value: "ساعة", label: "ساعة" },
        { value: "ساعة ونصف", label: "ساعة ونصف" },
    ] as SelectOption[],
};

export const ContestOptions = {
    he: [
        //תחרות
        { value: "לא משנה", label: "לא משנה" },
        { value: "עם חלוקה לקבוצות", label: "עם חלוקה לקבוצות" },
        { value: "ללא חלוקה לקבוצות", label: "ללא חלוקה לקבוצות" },
    ] as SelectOption[],
    en: [
        // competitiveness
        { value: "not specified", label: "Any" },
        { value: "with groups", label: "Teams" },
        { value: "without groups", label: "No teams" },
    ] as SelectOption[],
    es: [
        { value: "no especificado", label: "Cualquiera" },
        { value: "con grupos", label: "Equipos" },
        { value: "sin grupos", label: "Sin equipos" },
    ] as SelectOption[],
    ar: [
        { value: "غير محدد", label: "أي" },
        { value: "مع مجموعات", label: "فرق" },
        { value: "بدون مجموعات", label: "بدون فرق" },
    ] as SelectOption[],
};


export const ToolsOptions = {
    he: [
        //ציוד
        { value: "לא משנה", label: "לא משנה" },
        { value: "ללא ציוד", label: "ללא ציוד" },
    ] as SelectOption[],
    en: [
        // tools
        { value: "not specified", label: "Any" },
        { value: "without tools", label: "No materials" },
    ] as SelectOption[],
    es: [
        { value: "no especificado", label: "Cualquiera" },
        { value: "sin herramientas", label: "Sin materiales" },
    ] as SelectOption[],
    ar: [
        { value: "غير محدد", label: "أي" },
        { value: "بدون أدوات", label: "بدون مواد" },
    ] as SelectOption[],
};


export const ReligionOptions: SelectOption[] = [
    //שומר שבת
    { value: "לא משנה", label: "לא משנה" },
    { value: "מותאם לשומרי שבת", label: "מותאם לשומרי שבת" },
];

export const CategoryOptions = (options: Category[]): SelectOption[] => {
    return options.map((option) => {
        return { value: option.name, label: option.title };
    });
};