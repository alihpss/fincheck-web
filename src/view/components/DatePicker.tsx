import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        nav: "flex gap-2 absolute right-4",
        day: "text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full",
        today: "bg-gray-100 font-bold text-gray-900",
        selected: "!bg-teal-900 text-white font-medium",
        day_button: "w-full",
        chevron:
          "fill-teal-800 text-teal-800 flex items-center justify-center !bg-transparent",
        weekday: "uppercase text-xs text-gray-500 font-medium pt-1 pb-2",
        month_caption:
          "capitalize text-gray-900 tracking-[-0.408px] font-medium",
      }}
    />
  );
}
