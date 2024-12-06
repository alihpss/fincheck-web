import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      className="text-gray-800 text-[32px] font-bold tracking-[-1px] w-full outline-none"
      defaultValue="0"
    />
  );
}
