import { SelectOption } from "../../types/common";
import { Category } from "../../types/movement";
import { Movements } from "./movment";

export const MovmentsOptions: SelectOption[] = [
    { value: Movements.movement.name, label: Movements.movement.title },
];

export const GradeOptions: SelectOption[] = [
    { value: "class A", label: "class A" },
    { value: "class B", label: "class B" },
    { value: "class C", label: "class C" },
    { value: "class D", label: "class D" },
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
    { value: "not specified", label: "not specified" },
    { value: "closed space", label: "closed space" },
    { value: "open space", label: "open space" },
];

export const GenderOptions: SelectOption[] = [
    { value: "boys", label: "boys" },
    { value: "girls", label: "girls" },
    { value: "mixed", label: "mixed" },
];

export const ActivityTimeOptions: SelectOption[] = [
    { value: "20 minutes", label: "20 minutes" },
    { value: "30 minutes", label: "30 minutes" },
    // { value: "45 minutes", label: "45 minutes" },
    { value: "1 hour", label: "1 hour" },
    { value: "1 hour and 30 minutes", label: "1 hour and 30 minutes" },
    // { value: "2 hours", label: "2 hours" },
];
  
// export const BehaviorOptions: SelectOption[] = [//התנהגות
//   { value: "רגוע", label: "רגוע" },
//   { value: "רועש", label: "רועש" },
//   { value: "שקט", label: "שקט" },
//   { value: "מתפזר", label: "מתפזר" },
// ];

export const ContestOptions: SelectOption[] = [//תחרות
    { value: "not specified", label: "not specified" },
    { value: "with group division", label: "with group division" },
    { value: "without group division", label: "without group division" },
];


export const ToolsOptions: SelectOption[] = [//ציוד
    { value: "not specified", label: "not specified" },
    { value: "without tools", label: "without tools" },
];

export const ReligionOptions: SelectOption[] = [//שומר שבת
    { value: "not specified", label: "not specified" },
    { value: "suitable for Sabbath observers", label: "suitable for Sabbath observers" },
];


export const CategoryOptions = (options: Category[]): SelectOption[] => {
    return options.map((option) => {
        return { value: option.name, label: option.title };
    });
};
