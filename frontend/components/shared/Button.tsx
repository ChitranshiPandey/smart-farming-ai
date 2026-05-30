interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        bg-green-600
        hover:bg-green-700
        text-white
        px-6
        py-3
        rounded-2xl
        font-medium
        transition-all
        duration-300
        shadow-lg
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </button>
  );
}