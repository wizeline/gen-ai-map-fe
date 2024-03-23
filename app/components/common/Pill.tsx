import { FC } from "react";

interface PillProps {
  children: React.ReactNode;
}

const Pill: FC<PillProps> = ({ children }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-[#E93D44] text-white gap-2">
      {children}
    </span>
  );
};

export default Pill;
