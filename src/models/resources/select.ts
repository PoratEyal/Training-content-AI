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
    { value: "4-5", label: "כיתה א" },  
    { value: "5-6", label: "כיתה ב" }, 
    { value: "6-7", label: "כיתה ג" },  
    { value: "7-8", label: "כיתה ד" },  
    { value: "8-9", label: "כיתה ה" }, 
    { value: "9-10", label: "כיתה ו" },
    { value: "10-11", label: "כיתה ז" },
    { value: "11-12", label: "כיתה ח" },
    { value: "12-13", label: "כיתה ט" }, 
    { value: "13-14", label: "כיתה י" }, 
    { value: "14-15", label: "כיתה יא" }, 
    { value: "15-16", label: "כיתה יב" }  
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
