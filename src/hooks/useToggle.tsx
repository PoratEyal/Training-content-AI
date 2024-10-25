import { useState } from "react";

const useToggle = (initialValue: boolean | undefined): [boolean, () => void, () => void] => {
    const [isOpen, setIsOpen] = useState<boolean>(initialValue || false);

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    return [isOpen, toggle, close];
};

export default useToggle;
