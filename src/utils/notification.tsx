import { Store } from "react-notifications-component";

type NotificationOptions = {
    duration: number;
    onScreen: boolean;
    dir?: 'rtl' | 'ltr';
};

export const notification = (
    title: string,
    message: any,
    type: "info" | "success" | "warning" | "danger",
    options?: NotificationOptions,
) => {
    return Store.addNotification({
        title,
        message: (
            <div style={{ direction: options?.dir || 'ltr', textAlign: options?.dir === 'rtl' ? 'right' : 'left' }}>
                {message}
            </div>
        ),
        type,
        insert: "bottom",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeInUp"],
        animationOut: ["animate__animated", "animate__fadeOutDown"],
        dismiss: { duration: options?.duration || 3000, onScreen: options?.onScreen ?? true }
    })
};
