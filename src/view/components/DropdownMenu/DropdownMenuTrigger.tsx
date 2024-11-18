import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";

export function DropdownMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}
