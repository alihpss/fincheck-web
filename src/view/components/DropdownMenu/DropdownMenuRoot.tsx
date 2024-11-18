import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";

export function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}
