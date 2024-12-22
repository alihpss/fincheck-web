import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({
  className,
  error,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div className="">
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 placeholder-shown:pt-0 focus:border-gray-700 transition-all outline-none text-left relative pt-4",
              error && "!border-red-900",
              className
            )}
          >
            <span className="text-gray-700 text-xs left[-13px] absolute top-2 pointer-events-none">
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            onChange={(date) => {
              handleChangeDate(date);
            }}
            value={selectedDate}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
