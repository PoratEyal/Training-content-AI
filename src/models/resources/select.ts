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
        // { value: Movements.krembo.name, label: Movements.krembo.title },
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
        { value: "בוגרים", label: "בוגרים" },
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
        { value: "Graduates", label: "Graduates" },
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
};

export const ActivityTimeOptions = {
    he: [
        { value: "20 דקות", label: "20 דקות" },
        { value: "חצי שעה", label: "חצי שעה" },
        // { value: "45 דקות", label: "45 דקות" },
        { value: "שעה", label: "שעה" },
        { value: "שעה וחצי", label: "שעה וחצי" },
        // { value: "שעתיים", label: "שעתיים" },
    ] as SelectOption[],
    en: [
        { value: "20 minutes", label: "20 minutes" },
        { value: "half hour", label: "Half hour" },
        { value: "hour", label: "Hour" },
        { value: "hour and a half", label: "Hour and a half" },
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
        { value: "without groups", label: "No teams" },
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

// export const BehaviorOptions: SelectOption[] = [//התנהגות
//   { value: "רגוע", label: "רגוע" },
//   { value: "רועש", label: "רועש" },
//   { value: "שקט", label: "שקט" },
//   { value: "מתפזר", label: "מתפזר" },
// ];
