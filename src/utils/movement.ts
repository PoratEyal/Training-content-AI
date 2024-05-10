import { Movments } from "../models/resources/movment";
import { Movement } from "../models/types/movement";

export const getMovementByTitle = (movementTitle: string) => {
    let movment: Movement | undefined = undefined;
    if (movementTitle === "צופים") movment = Movments["scout"];
    else if (movementTitle === "מכבי צעיר") movment = Movments["maccabi"];
    return movment;
};
