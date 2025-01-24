export const moreOptionsButtonVariants = {
    hidden: (index: number) => ({
        y: 0,
        opacity: 0,
        transition: {
            duration: 0.09,
            delay: 0.05 * index,
        },
    }),
    visible: (index: number) => ({
        y: -15 * (index + 1),
        opacity: 1,
        transition: {
            duration: 0.09,
            delay: 0.05 * index,
        },
    }),
};
