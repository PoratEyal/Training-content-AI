import { SelectOption } from "../types/common";

export const MovmentsOptions: SelectOption[] = [
    { value: "scout", label: "צופים" },
    { value: "maccabi", label: "מכבי צעיר" },
];

export const GradeOptions: SelectOption[] = [
    { value: "כיתה א", label: "כיתה א" },
    { value: "כיתה ב", label: "כיתה ב" },
    { value: "כיתה ג", label: "כיתה ג" },
    { value: "כיתה ה", label: "כיתה ה" },
    { value: "כיתה ו", label: "כיתה ו" },
    { value: "כיתה ז", label: "כיתה ז" },
    { value: "כיתה ח", label: "כיתה ח" },
    { value: "כיתה ט", label: "כיתה ט" },
    { value: "כיתה י", label: "כיתה י" },
    { value: "כיתה יא", label: "כיתה יא" },
    { value: "כיתה יב", label: "כיתה יב" },
];

export const AmountOptions: SelectOption[] = [
    { value: "1-5", label: "1-5" },
    { value: "5-10", label: "5-10" },
    { value: "10-20", label: "10-20" },
    { value: "20-30", label: "20-30" },
    { value: "30-50", label: "30-50" },
    { value: "60+", label: "60+" },
];

export const PlaceOptions: SelectOption[] = [
    { value: "במקום סגור", label: "במקום סגור" },
    { value: "במקום פתוח", label: "במקום פתוח" },
    { value: "לא משנה", label: "לא משנה" },
];

export const GenderOptions: SelectOption[] = [
    { value: "חניכים", label: "בנים" },
    { value: "חניכות", label: "בנות" },
    { value: "מעורב", label: "מעורב" },
];

export const ActivityTimeOptions: SelectOption[] = [
    { value: "20 דקות", label: "20 דקות" },
    { value: "חצי שעה", label: "חצי שעה" },
    { value: "45 דקות", label: "45 דקות" },
    { value: "שעה", label: "שעה" },
    { value: "שעה וחצי", label: "שעה וחצי" },
    { value: "שעתיים", label: "שעתיים" },
];
