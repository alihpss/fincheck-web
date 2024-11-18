import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../../app/utils/cn";

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

export function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      className={cn(
        "min-h-10 outline-none flex items-center px-4 py-2 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors",
        className
      )}
      onSelect={onSelect}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}
