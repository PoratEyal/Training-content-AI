import { Store } from "react-notifications-component";

export type NotificationOptions = {
    duration?: number;
    onScreen?: boolean;
    dir?: 'rtl' | 'ltr';
    container?: 
      | 'top-left' 
      | 'top-right' 
      | 'top-center' 
      | 'bottom-left' 
      | 'bottom-right' 
      | 'bottom-center';
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
        container: options?.container || "bottom-center",
        animationIn: ["animate__animated", "animate__fadeInUp"],
        animationOut: ["animate__animated", "animate__fadeOutDown"],
        dismiss: {
            duration: options?.duration || 5000,
            onScreen: options?.onScreen ?? true
        }
    });
};
