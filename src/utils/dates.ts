export const formatDate = (date: number) => {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
};
