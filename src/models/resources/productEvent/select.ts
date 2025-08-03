import { SelectOption } from "../../types/common";
import { Category } from "../../types/movement";

export const AgeOptions = {
    he: [
        { value: "Kindergarten (ages 3–6)", label: "ילדי גן" },
        { value: "Children (ages 6–12)", label: "גילאי 6–12" },
        { value: "Young teens (ages 13–15)", label: "גילאי 13–15" },
        { value: "Older teens (ages 16–18)", label: "גילאי 16–18" },
        { value: "Young adults (ages 19–30)", label: "גילאי 19–30" },
        { value: "Adults (ages 30–50)", label: "גילאי 30–50" },
        { value: "Older adults (ages 50–70)", label: "גילאי 50–70" },
        { value: "Seniors (ages 70 and above)", label: "גילאי 70 ומעלה" }
    ] as SelectOption[],

    en: [
        { value: "Kindergarten (ages 3–6)", label: "Kindergarten" },
        { value: "Children (ages 6–12)", label: "Ages 6–12" },
        { value: "Young teens (ages 13–15)", label: "Ages 13–15" },
        { value: "Older teens (ages 16–18)", label: "Ages 16–18" },
        { value: "Young adults (ages 19–30)", label: "Ages 19–30" },
        { value: "Adults (ages 30–50)", label: "Ages 30–50" },
        { value: "Older adults (ages 50–70)", label: "Ages 50–70" },
        { value: "Seniors (ages 70 and above)", label: "Ages 70+" }
    ] as SelectOption[],

    es: [
        { value: "Kindergarten (ages 3–6)", label: "Niños jardín" },
        { value: "Children (ages 6–12)", label: "Edades 6–12" },
        { value: "Young teens (ages 13–15)", label: "Edades 13–15" },
        { value: "Older teens (ages 16–18)", label: "Edades 16–18" },
        { value: "Young adults (ages 19–30)", label: "Edades 19–30" },
        { value: "Adults (ages 30–50)", label: "Edades 30–50" },
        { value: "Older adults (ages 50–70)", label: "Edades 50–70" },
        { value: "Seniors (ages 70 and above)", label: "Edades 70+" }
    ] as SelectOption[],

    ar: [
        { value: "Kindergarten (ages 3–6)", label: "روضة" },
        { value: "Children (ages 6–12)", label: "الأعمار 6–12" },
        { value: "Young teens (ages 13–15)", label: "الأعمار 13–15" },
        { value: "Older teens (ages 16–18)", label: "الأعمار 16–18" },
        { value: "Young adults (ages 19–30)", label: "الأعمار 19–30" },
        { value: "Adults (ages 30–50)", label: "الأعمار 30–50" },
        { value: "Older adults (ages 50–70)", label: "الأعمار 50–70" },
        { value: "Seniors (ages 70 and above)", label: "الأعمار 70+" }
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
        { value: "No location preference", label: "לא משנה" },
        { value: "Indoor", label: "במקום סגור" },
        { value: "Outdoor", label: "במקום פתוח" },
    ] as SelectOption[],

    en: [
        { value: "No location preference", label: "Any" },
        { value: "Indoor", label: "Indoor" },
        { value: "Outdoor", label: "Outdoor" },
    ] as SelectOption[],

    es: [
        { value: "No location preference", label: "Cualquiera" },
        { value: "Indoor", label: "Interior" },
        { value: "Outdoor", label: "Exterior" },
    ] as SelectOption[],

    ar: [
        { value: "No location preference", label: "أي" },
        { value: "Indoor", label: "داخلية" },
        { value: "Outdoor", label: "خارجية" },
    ] as SelectOption[],
};


export const GenderOptions = {
    he: [
        { value: "man", label: "גברים" },
        { value: "woman", label: "נשים" },
        { value: "mixed gender", label: "קבוצה מעורבת" },
    ] as SelectOption[],

    en: [
        { value: "man", label: "Man" },
        { value: "woman", label: "Woman" },
        { value: "mixed gender", label: "Mixed Group" },
    ] as SelectOption[],

    es: [
        { value: "man", label: "Hombres" },
        { value: "woman", label: "Mujeres" },
        { value: "mixed gender", label: "Mixto" },
    ] as SelectOption[],

    ar: [
        { value: "man", label: "ذكور" },
        { value: "woman", label: "إناث" },
        { value: "mixed gender", label: "مختلط" },
    ] as SelectOption[],
};


export const ActivityTimeOptions = {
    he: [
        { value: "Half hour", label: "חצי שעה" },
        { value: "One hour", label: "שעה" },
        { value: "One and a half hours", label: "שעה וחצי" },
    ] as SelectOption[],

    en: [
        { value: "Half hour", label: "Half hour" },
        { value: "One hour", label: "Hour" },
        { value: "One and a half hours", label: "Hour and a half" },
    ] as SelectOption[],

    es: [
        { value: "Half hour", label: "Media hora" },
        { value: "One hour", label: "Hora" },
        { value: "One and a half hours", label: "Hora y media" },
    ] as SelectOption[],

    ar: [
        { value: "Half hour", label: "نصف ساعة" },
        { value: "One hour", label: "ساعة" },
        { value: "One and a half hours", label: "ساعة ونصف" },
    ] as SelectOption[],
};


export const CategoryOptions = (options: Category[]): SelectOption[] => {
    return options.map((option) => {
        return { value: option.name, label: option.title };
    });
};