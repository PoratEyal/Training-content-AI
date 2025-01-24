export const moreOptionsButtonVariants = {
    hidden: (index: number) => ({
        y: 0,
        opacity: 0,
        transition: {
            duration: 0.15,
            delay: 0.1 * index,
        },
    }),
    visible: (index: number) => ({
        y: -15 * (index + 1),
        opacity: 1,
        transition: {
            duration: 0.15,
            delay: 0.1 * index,
        },
    }),
};
