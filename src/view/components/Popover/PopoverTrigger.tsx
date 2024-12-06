import * as RdxPopover from "@radix-ui/react-popover";

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}
