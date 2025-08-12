export  interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | 'normal' ;
  size?: "sm" | "md" | "lg";  // Explicitly type size as one of the three keys
    disabled?: boolean;
    to?: string | null; // 'to' can be a string or null, or you could use undefined based on use case
    className?: string;
    isLoading?: boolean;
}
export interface DefaultLayoutProps {
  children: React.ReactNode;
}