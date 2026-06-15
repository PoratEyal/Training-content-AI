import { SelectOption } from "../../types/common";
import { Category } from "../../types/movement";

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

    fr: [
        { value: "Half hour", label: "Demi-heure" },
        { value: "One hour", label: "Une heure" },
        { value: "Two hours", label: "Deux heures" },
        { value: "Three hours", label: "Trois heures" },
    ] as SelectOption[],

    pt: [
        { value: "Half hour", label: "Meia hora" },
        { value: "One hour", label: "Uma hora" },
        { value: "Two hours", label: "Duas horas" },
        { value: "Three hours", label: "Três horas" },
    ] as SelectOption[],
};

export const AgeOptions = {
    he: [
        { value: "Kindergarten (ages 3–6)", label: "ילדי גן" },
        { value: "Children (ages 6–9)", label: "גילאי 6–9" },
        { value: "Children (ages 10–12)", label: "גילאי 10–12" },
        { value: "Young teens (ages 13–15)", label: "גילאי 13–15" },
        { value: "Older teens (ages 16–18)", label: "גילאי 16–18" },
        { value: "Adult (ages 20 and above)", label: "בוגרים" },
        { value: "Young adults (ages 19–30)", label: "גילאי 19–30" },
        { value: "Adults (ages 30–50)", label: "גילאי 30–50" },
        { value: "Older adults (ages 50–70)", label: "גילאי 50–70" },
        { value: "Seniors (ages 70 and above)", label: "גילאי 70 ומעלה" }
    ] as SelectOption[],

    en: [
        { value: "Kindergarten (ages 3–6)", label: "Kindergarten" },
        { value: "Children (ages 6–9)", label: "Ages 6–9" },
        { value: "Children (ages 10–12)", label: "Ages 10–12" },
        { value: "Young teens (ages 13–15)", label: "Ages 13–15" },
        { value: "Older teens (ages 16–18)", label: "Ages 16–18" },
        { value: "Adult (ages 20 and above)", label: "Adults" },
        { value: "Young adults (ages 19–30)", label: "Ages 19–30" },
        { value: "Adults (ages 30–50)", label: "Ages 30–50" },
        { value: "Older adults (ages 50–70)", label: "Ages 50–70" },
        { value: "Seniors (ages 70 and above)", label: "Ages 70+" }
    ] as SelectOption[],

    es: [
        { value: "Kindergarten (ages 3–6)", label: "Jardín de infancia" },
        { value: "Children (ages 6–9)", label: "Edades 6–9" },
        { value: "Children (ages 10–12)", label: "Edades 10–12" },
        { value: "Young teens (ages 13–15)", label: "Edades 13–15" },
        { value: "Older teens (ages 16–18)", label: "Edades 16–18" },
        { value: "Adult (ages 20 and above)", label: "Adultos" },
        { value: "Young adults (ages 19–30)", label: "Edades 19–30" },
        { value: "Adults (ages 30–50)", label: "Edades 30–50" },
        { value: "Older adults (ages 50–70)", label: "Edades 50–70" },
        { value: "Seniors (ages 70 and above)", label: "Edades 70+" }
    ] as SelectOption[],

    ar: [
        { value: "Kindergarten (ages 3–6)", label: "رياض الأطفال" },
        { value: "Children (ages 6–9)", label: "الأعمار: من 6 إلى 9" },
        { value: "Children (ages 10–12)", label: "الأعمار: من 10 إلى 12" },
        { value: "Young teens (ages 13–15)", label: "الأعمار: من 13 إلى 15" },
        { value: "Older teens (ages 16–18)", label: "الأعمار: من 16 إلى 18" },
        { value: "Adult (ages 20 and above)", label: "بالغون" },
        { value: "Young adults (ages 19–30)", label: "الأعمار: من 19 إلى 30" },
        { value: "Adults (ages 30–50)", label: "الأعمار: من 30 إلى 50" },
        { value: "Older adults (ages 50–70)", label: "الأعمار: من 50 إلى 70" },
        { value: "Seniors (ages 70 and above)", label: "الأعمار: 70 فما فوق" }
    ] as SelectOption[],
    fr: [
        { value: "Kindergarten (ages 3–6)", label: "Jardin d'enfants" },
        { value: "Children (ages 6–9)", label: "6 à 9 ans" },
        { value: "Children (ages 10–12)", label: "10 à 12 ans" },
        { value: "Young teens (ages 13–15)", label: "13 à 15 ans" },
        { value: "Older teens (ages 16–18)", label: "16 à 18 ans" },
        { value: "Adult (ages 20 and above)", label: "Adultes" },
        { value: "Young adults (ages 19–30)", label: "19 à 30 ans" },
        { value: "Adults (ages 30–50)", label: "30 à 50 ans" },
        { value: "Older adults (ages 50–70)", label: "50 à 70 ans" },
        { value: "Seniors (ages 70 and above)", label: "70 ans et plus" }
    ] as SelectOption[],
    pt: [
        { value: "Kindergarten (ages 3–6)", label: "Jardim de infância" },
        { value: "Children (ages 6–9)", label: "6 a 9 anos" },
        { value: "Children (ages 10–12)", label: "10 a 12 anos" },
        { value: "Young teens (ages 13–15)", label: "13 a 15 anos" },
        { value: "Older teens (ages 16–18)", label: "16 a 18 anos" },
        { value: "Adult (ages 20 and above)", label: "Adultos" },
        { value: "Young adults (ages 19–30)", label: "19 a 30 anos" },
        { value: "Adults (ages 30–50)", label: "30 a 50 anos" },
        { value: "Older adults (ages 50–70)", label: "50 a 70 anos" },
        { value: "Seniors (ages 70 and above)", label: "70 anos ou mais" }
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
    fr: [
        { value: "1-5", label: "1–5 participants" },
        { value: "5-10", label: "5–10 participants" },
        { value: "10-20", label: "10–20 participants" },
        { value: "20-30", label: "20–30 participants" },
        { value: "30-50", label: "30–50 participants" },
        { value: "60+", label: "60+ participants" }
    ] as SelectOption[],
    pt: [
        { value: "1-5", label: "1–5 participantes" },
        { value: "5-10", label: "5–10 participantes" },
        { value: "10-20", label: "10–20 participantes" },
        { value: "20-30", label: "20–30 participantes" },
        { value: "30-50", label: "30–50 participantes" },
        { value: "60+", label: "60+ participantes" }
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
    fr: [
        { value: "No location preference", label: "N'importe quel" },
        { value: "Indoor", label: "Intérieur" },
        { value: "Outdoor", label: "Extérieur" },
    ] as SelectOption[],
    pt: [
        { value: "No location preference", label: "Qualquer" },
        { value: "Indoor", label: "Ambiente fechado" },
        { value: "Outdoor", label: "Ao ar livre" },
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
    fr: [
        { value: "man", label: "Hommes" },
        { value: "woman", label: "Femmes" },
        { value: "mixed gender", label: "Groupe mixte" },
    ] as SelectOption[],
    pt: [
        { value: "man", label: "Homens" },
        { value: "woman", label: "Mulheres" },
        { value: "mixed gender", label: "Grupo misto" },
    ] as SelectOption[],
};


export const MaterialsOptions = {
    he: [
        { value: "any", label: "לא משנה" },
        { value: "no materials", label: "ללא ציוד עזר" },
    ] as SelectOption[],
    en: [
        { value: "any", label: "Any" },
        { value: "no materials", label: "No materials required" },
    ] as SelectOption[],
    es: [
        { value: "any", label: "Cualquiera" },
        { value: "no materials", label: "Sin materiales" },
    ] as SelectOption[],
    ar: [
        { value: "any", label: "أيًّا كان" },
        { value: "no materials", label: "بدون مواد" },
    ] as SelectOption[],
    fr: [
        { value: "any", label: "N'importe quel" },
        { value: "no materials", label: "Sans matériel" },
    ] as SelectOption[],
    pt: [
        { value: "any", label: "Qualquer" },
        { value: "no materials", label: "Sem materiais" },
    ] as SelectOption[],
};

export const CategoryOptions = (options: Category[]): SelectOption[] => {
    return options.map((option) => {
        return { value: option.name, label: option.title };
    });
};