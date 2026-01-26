
export interface Column<T> {
    key: keyof T & string | null;
    label: string;

    // 👇 optional date support
    type?: "text" | "date" | "custom" | "action" | "currency" | "number";

    // 👇 custom date formatter
    formatDate?: (value: string | Date) => string;

    // 👇 full render override 
    render?: (item: T) => React.ReactNode;
};