import { Movement } from "../../types/movement";

/**
 * Dont forget to also update
 * ./models/types/movement.ts for the new Movement type and
 * ./models/resources/en/select.ts for MovmentsOptions
 */
export const Movements = {
    movement: {
        name: "movement",
        title: "movement",
        categories: [
            {
                name: "contant",
                title: "activité",
            },
            {
                name: "playTime",
                title: "משחק",
            },
            {
                name: "survival",
                title: "הישרדות",
            },
        ],
    } as Movement,
};
