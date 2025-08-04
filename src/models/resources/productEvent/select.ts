import { SelectOption } from "../../types/common";
import { Category } from "../../types/movement";

export const AgeOptions = {
    he: [
        { value: "Kindergarten (ages 3–6)", label: "ילדי גן" },
        { value: "Children (ages 6–12)", label: "ילדים" },
        { value: "Children (ages 13–18)", label: "נוער" },
        { value: "Adult (ages 20 and above)", label: "בוגרים" },
        { value: "Children (ages 6–9)", label: "גילאי 6–9" },
        { value: "Children (ages 10–12)", label: "גילאי 10–12" },
        { value: "Young teens (ages 13–15)", label: "גילאי 13–15" },
        { value: "Older teens (ages 16–18)", label: "גילאי 16–18" },
        { value: "Young adults (ages 19–30)", label: "גילאי 19–30" },
        { value: "Adults (ages 30–50)", label: "גילאי 30–50" },
        { value: "Older adults (ages 50–70)", label: "גילאי 50–70" },
        { value: "Seniors (ages 70 and above)", label: "גילאי 70 ומעלה" }
    ] as SelectOption[],

    en: [
        { value: "Kindergarten (ages 3–6)", label: "Kindergarten" },
        { value: "Children (ages 6–12)", label: "Children" },
        { value: "Children (ages 13–18)", label: "Teens" },
        { value: "Adult (ages 20 and above)", label: "Adults" },
        { value: "Children (ages 6–9)", label: "Ages 6–9" },
        { value: "Children (ages 10–12)", label: "Ages 10–12" },
        { value: "Young teens (ages 13–15)", label: "Ages 13–15" },
        { value: "Older teens (ages 16–18)", label: "Ages 16–18" },
        { value: "Young adults (ages 19–30)", label: "Ages 19–30" },
        { value: "Adults (ages 30–50)", label: "Ages 30–50" },
        { value: "Older adults (ages 50–70)", label: "Ages 50–70" },
        { value: "Seniors (ages 70 and above)", label: "Ages 70+" }
    ] as SelectOption[],

    es: [
        { value: "Kindergarten (ages 3–6)", label: "Jardín de infancia" },
        { value: "Children (ages 6–12)", label: "Niños" },
        { value: "Children (ages 13–18)", label: "Adolescentes" },
        { value: "Adult (ages 20 and above)", label: "Adultos" },
        { value: "Children (ages 6–9)", label: "Edades 6–9" },
        { value: "Children (ages 10–12)", label: "Edades 10–12" },
        { value: "Young teens (ages 13–15)", label: "Edades 13–15" },
        { value: "Older teens (ages 16–18)", label: "Edades 16–18" },
        { value: "Young adults (ages 19–30)", label: "Edades 19–30" },
        { value: "Adults (ages 30–50)", label: "Edades 30–50" },
        { value: "Older adults (ages 50–70)", label: "Edades 50–70" },
        { value: "Seniors (ages 70 and above)", label: "Edades 70+" }
    ] as SelectOption[],

    ar: [
        { value: "Kindergarten (ages 3–6)", label: "رياض الأطفال" },
        { value: "Children (ages 6–12)", label: "أطفال" },
        { value: "Children (ages 13–18)", label: "مراهقون" },
        { value: "Adult (ages 20 and above)", label: "بالغون" },
        { value: "Children (ages 6–9)", label: "الأعمار: من 6 إلى 9" },
        { value: "Children (ages 10–12)", label: "الأعمار: من 10 إلى 12" },
        { value: "Young teens (ages 13–15)", label: "الأعمار: من 13 إلى 15" },
        { value: "Older teens (ages 16–18)", label: "الأعمار: من 16 إلى 18" },
        { value: "Young adults (ages 19–30)", label: "الأعمار: من 19 إلى 30" },
        { value: "Adults (ages 30–50)", label: "الأعمار: من 30 إلى 50" },
        { value: "Older adults (ages 50–70)", label: "الأعمار: من 50 إلى 70" },
        { value: "Seniors (ages 70 and above)", label: "الأعمار: 70 فما فوق" }
    ] as SelectOption[],
};


export const AmountOptions = {
    he: [
        { value: "1-5", label: "1–5 משתתפים" },
        { value: "5-10", label: "5–10 משתתפים" },
        { value: "10-20", label: "10–20 משתתפים" },
        { value: "20-30", label: "20–30 משתתפים" },
        { value: "30-50", label: "30–50 משתתפים" },
        { value: "60+", label: "60+ משתתפים" },
    ] as SelectOption[],
    en: [
        { value: "1-5", label: "1–5 participants" },
        { value: "5-10", label: "5–10 participants" },
        { value: "10-20", label: "10–20 participants" },
        { value: "20-30", label: "20–30 participants" },
        { value: "30-50", label: "30–50 participants" },
        { value: "60+", label: "60+ participants" },
    ] as SelectOption[],
    es: [
        { value: "1-5", label: "1–5 personas" },
        { value: "5-10", label: "5–10 personas" },
        { value: "10-20", label: "10–20 personas" },
        { value: "20-30", label: "20–30 personas" },
        { value: "30-50", label: "30–50 personas" },
        { value: "60+", label: "60+ personas" },
    ] as SelectOption[],
    ar: [
        { value: "1-5", label: "من 1 إلى 5 مشاركين" },
        { value: "5-10", label: "من 5 إلى 10 مشاركين" },
        { value: "10-20", label: "من 10 إلى 20 مشاركين" },
        { value: "20-30", label: "من 20 إلى 30 مشاركين" },
        { value: "30-50", label: "من 30 إلى 50 مشاركين" },
        { value: "60+", label: "أكثر من 60 مشارك" }
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
        { value: "No location preference", label: "أي مكان" },
        { value: "Indoor", label: "داخل" },
        { value: "Outdoor", label: "خارج" },
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
        { value: "mixed gender", label: "مجموعة مختلطة" },
    ] as SelectOption[],
};


export const ActivityTimeOptions = {
    he: [
        { value: "Half hour", label: "חצי שעה" },
        { value: "One hour", label: "שעה" },
        { value: "Two hours", label: "שעתיים" },
        { value: "Three hours", label: "שלוש שעות" },
    ] as SelectOption[],

    en: [
        { value: "Half hour", label: "Half hour" },
        { value: "One hour", label: "Hour" },
        { value: "Two hours", label: "Two hours" },
        { value: "Three hours", label: "Three hours" },
    ] as SelectOption[],

    es: [
        { value: "Half hour", label: "Media hora" },
        { value: "One hour", label: "Hora" },
        { value: "Two hours", label: "Dos horas" },
        { value: "Three hours", label: "Tres horas" },
    ] as SelectOption[],

    ar: [
        { value: "Half hour", label: "نصف ساعة" },
        { value: "One hour", label: "ساعة" },
        { value: "Two hours", label: "ساعتان" },
        { value: "Three hours", label: "ثلاث ساعات" },
    ] as SelectOption[],
};


export const CategoryOptions = (options: Category[]): SelectOption[] => {
    return options.map((option) => {
        return { value: option.name, label: option.title };
    });
};