import { Movements } from "../models/resources/movment";
import { Movement } from "../models/types/movement";

//TODO: not in use
export const getMovementByTitle = (movementTitle: string) => {
    let movment: Movement | undefined = undefined;
    if (movementTitle === "צופים") movment = Movements["scout"];
    else if (movementTitle === "מכבי צעיר") movment = Movements["maccabi"];
    return movment;
};
