import * as RdxPopover from "@radix-ui/react-popover";

export function PopoverRoot({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}
