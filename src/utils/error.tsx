import { Store } from "react-notifications-component";

export const notification = (
    title: string,
    message: any,
    type: "info" | "success" | "warning" | "danger",
    dismiss?: { duration: number; onScreen: boolean },
) => {
    return Store.addNotification({
        title,
        message: message,
        type,
        insert: "bottom",
        container: "bottom-full",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: dismiss || { duration: 3000, onScreen: true }
    })
};
