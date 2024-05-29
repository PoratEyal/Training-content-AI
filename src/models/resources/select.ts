import { SelectOption } from "../types/common";
import { Movements } from "./movment";

export const MovmentsOptions: SelectOption[] = [
    { value: Movements.scout.name, label: Movements.scout.title },
    { value: Movements.oved.name, label: Movements.oved.title },
    { value: Movements.akiva.name, label: Movements.akiva.title },
    { value: Movements.maccabi.name, label: Movements.maccabi.title },
    { value: Movements.shomer.name, label: Movements.shomer.title },
    { value: Movements.medtchim.name, label: Movements.medtchim.title },
    { value: Movements.meshachim.name, label: Movements.meshachim.title },
    { value: Movements.sayarut.name, label: Movements.sayarut.title },
    { value: Movements.other.name, label: Movements.other.title },
];

export const GradeOptions: SelectOption[] = [
    { value: "1", label: "כיתה א" },
    { value: "2", label: "כיתה ב" },
    { value: "3", label: "כיתה ג" },
    { value: "4", label: "כיתה ד" },
    { value: "5", label: "כיתה ה" },
    { value: "6", label: "כיתה ו" },
    { value: "7", label: "כיתה ז" },
    { value: "8", label: "כיתה ח" },
    { value: "9", label: "כיתה ט" },
    { value: "10", label: "כיתה י" },
    { value: "11", label: "כיתה יא" },
    { value: "12", label: "כיתה יב" },
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
    { value: "open", label: "במקום סגור" },
    { value: "close", label: "במקום פתוח" },
    { value: "all", label: "לא משנה" },
];

export const GenderOptions: SelectOption[] = [
    { value: "man", label: "בנים" },
    { value: "woman", label: "בנות" },
    { value: "all", label: "מעורב" },
];

export const ActivityTimeOptions: SelectOption[] = [
    { value: "20", label: "20 דקות" },
    { value: "30", label: "חצי שעה" },
    { value: "45", label: "45 דקות" },
    { value: "60", label: "שעה" },
    { value: "90", label: "שעה וחצי" },
    { value: "180", label: "שעתיים" },
];
